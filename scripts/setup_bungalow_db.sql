-- ===================================
-- CONFIGURATORE BUNGALOW - SCHEMA DATABASE
-- ===================================

-- Abilita estensione UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- TABELLA PRINCIPALE: preventivi_bungalow
-- ===================================
CREATE TABLE IF NOT EXISTS preventivi_bungalow (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dati configurazione bungalow
  lunghezza DECIMAL(5,2) NOT NULL CHECK (lunghezza >= 1.0 AND lunghezza <= 99.99),
  larghezza DECIMAL(5,2) NOT NULL CHECK (larghezza >= 1.0 AND larghezza <= 99.99),
  numero_vani INTEGER NOT NULL CHECK (numero_vani BETWEEN 1 AND 4),
  note TEXT,
  
  -- Dati contatto cliente
  cliente_nome VARCHAR(255),
  email VARCHAR(255),
  telefono VARCHAR(50),
  
  -- Configurazione completa salvata come JSON
  configurazione JSONB,
  
  -- Array di URL allegati (Supabase Storage)
  allegati TEXT[] DEFAULT '{}',
  
  -- Stato workflow
  stato VARCHAR(50) DEFAULT 'nuovo' CHECK (stato IN ('nuovo', 'in_elaborazione', 'confermato', 'annullato', 'archiviato')),
  
  -- Metadata tecnico
  ip_address INET,
  user_agent TEXT,
  
  -- Calcolo metri quadrati automatico
  mq_totali DECIMAL(8,2) GENERATED ALWAYS AS (lunghezza * larghezza) STORED
);

-- ===================================
-- TABELLA STORICO STATI
-- ===================================
CREATE TABLE IF NOT EXISTS preventivi_storico (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  preventivo_id UUID NOT NULL REFERENCES preventivi_bungalow(id) ON DELETE CASCADE,
  stato_precedente VARCHAR(50),
  stato_nuovo VARCHAR(50) NOT NULL,
  note_admin TEXT,
  admin_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- INDICI PER PERFORMANCE
-- ===================================
CREATE INDEX IF NOT EXISTS idx_preventivi_stato ON preventivi_bungalow(stato);
CREATE INDEX IF NOT EXISTS idx_preventivi_created ON preventivi_bungalow(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_preventivi_email ON preventivi_bungalow(email);
CREATE INDEX IF NOT EXISTS idx_storico_preventivo ON preventivi_storico(preventivo_id, created_at DESC);

-- ===================================
-- TRIGGER PER updated_at
-- ===================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_preventivi_bungalow_updated_at 
  BEFORE UPDATE ON preventivi_bungalow 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- TRIGGER PER STORICO AUTOMATICO
-- ===================================
CREATE OR REPLACE FUNCTION log_stato_change()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE' AND OLD.stato IS DISTINCT FROM NEW.stato) THEN
        INSERT INTO preventivi_storico (preventivo_id, stato_precedente, stato_nuovo)
        VALUES (NEW.id, OLD.stato, NEW.stato);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_log_stato_change
  AFTER UPDATE ON preventivi_bungalow
  FOR EACH ROW
  EXECUTE FUNCTION log_stato_change();

-- ===================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================
ALTER TABLE preventivi_bungalow ENABLE ROW LEVEL SECURITY;
ALTER TABLE preventivi_storico ENABLE ROW LEVEL SECURITY;

-- Policy: INSERT pubblico (chiunque può creare richiesta preventivo)
DROP POLICY IF EXISTS "Chiunque può creare preventivi" ON preventivi_bungalow;
CREATE POLICY "Chiunque può creare preventivi"
  ON preventivi_bungalow FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: SELECT solo utenti autenticati (admin)
DROP POLICY IF EXISTS "Solo admin possono leggere" ON preventivi_bungalow;
CREATE POLICY "Solo admin possono leggere"
  ON preventivi_bungalow FOR SELECT
  TO authenticated
  USING (true);

-- Policy: UPDATE solo utenti autenticati (admin)
DROP POLICY IF EXISTS "Solo admin possono aggiornare" ON preventivi_bungalow;
CREATE POLICY "Solo admin possono aggiornare"
  ON preventivi_bungalow FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: DELETE solo utenti autenticati (admin)
DROP POLICY IF EXISTS "Solo admin possono eliminare" ON preventivi_bungalow;
CREATE POLICY "Solo admin possono eliminare"
  ON preventivi_bungalow FOR DELETE
  TO authenticated
  USING (true);

-- Policy storico: solo admin autenticati
DROP POLICY IF EXISTS "Solo admin leggono storico" ON preventivi_storico;
CREATE POLICY "Solo admin leggono storico"
  ON preventivi_storico FOR SELECT
  TO authenticated
  USING (true);

-- ===================================
-- STORAGE BUCKET PER ALLEGATI
-- ===================================
-- Eseguire manualmente da Supabase Dashboard > Storage:
-- 1. Creare bucket "bungalow-allegati" (PRIVATO)
-- 2. Configurare policy:
--    - INSERT: anon, authenticated (per upload pubblico)
--    - SELECT: authenticated (solo admin vedono allegati)

-- ===================================
-- VISTA RIEPILOGATIVA PER ADMIN
-- ===================================
CREATE OR REPLACE VIEW preventivi_dashboard AS
SELECT 
  p.*,
  array_length(p.allegati, 1) AS num_allegati,
  (SELECT COUNT(*) FROM preventivi_storico WHERE preventivo_id = p.id) AS num_cambi_stato,
  (SELECT stato_nuovo FROM preventivi_storico WHERE preventivo_id = p.id ORDER BY created_at DESC LIMIT 1) AS ultimo_cambio_stato
FROM preventivi_bungalow p
ORDER BY p.created_at DESC;

-- ===================================
-- FUNZIONI UTILITY
-- ===================================

-- Funzione per contare preventivi per stato
CREATE OR REPLACE FUNCTION count_by_stato()
RETURNS TABLE(stato VARCHAR, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT p.stato, COUNT(*)::BIGINT
  FROM preventivi_bungalow p
  GROUP BY p.stato
  ORDER BY p.stato;
END;
$$ LANGUAGE plpgsql;

-- Funzione per statistiche mensili
CREATE OR REPLACE FUNCTION stats_by_month()
RETURNS TABLE(mese TEXT, totale BIGINT, nuovo BIGINT, in_elaborazione BIGINT, confermato BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(created_at, 'YYYY-MM') AS mese,
    COUNT(*)::BIGINT AS totale,
    COUNT(*) FILTER (WHERE stato = 'nuovo')::BIGINT AS nuovo,
    COUNT(*) FILTER (WHERE stato = 'in_elaborazione')::BIGINT AS in_elaborazione,
    COUNT(*) FILTER (WHERE stato = 'confermato')::BIGINT AS confermato
  FROM preventivi_bungalow
  GROUP BY TO_CHAR(created_at, 'YYYY-MM')
  ORDER BY mese DESC;
END;
$$ LANGUAGE plpgsql;

-- ===================================
-- DATI DI TEST (OPZIONALE)
-- ===================================
-- Decommentare per inserire dati di esempio:
/*
INSERT INTO preventivi_bungalow (lunghezza, larghezza, numero_vani, note, cliente_nome, email, telefono, stato)
VALUES 
  (6.00, 4.00, 2, 'Bungalow per giardino, con porta finestra', 'Mario Rossi', 'mario.rossi@example.com', '+39 333 1234567', 'nuovo'),
  (8.00, 5.00, 3, 'Servono infissi rinforzati', 'Laura Bianchi', 'laura.b@example.com', '+39 348 7654321', 'in_elaborazione'),
  (5.00, 3.50, 1, 'Monolocale per attrezzi', 'Giovanni Verdi', 'g.verdi@example.com', '+39 320 9876543', 'confermato');
*/

-- ===================================
-- COMPLETAMENTO
-- ===================================
COMMENT ON TABLE preventivi_bungalow IS 'Tabella principale per richieste preventivo bungalow su misura';
COMMENT ON TABLE preventivi_storico IS 'Storico modifiche stato preventivi per tracking admin';
COMMENT ON VIEW preventivi_dashboard IS 'Vista ottimizzata per dashboard amministrativa';
