# 🗄️ Setup Database Bungalow - Istruzioni

## ⚡ Quick Setup (3 minuti)

### 1️⃣ Esegui Schema SQL

Vai al SQL Editor di Supabase:
👉 **[Apri SQL Editor](https://xxqotgrmiimmruglpwlh.supabase.co/project/xxqotgrmiimmruglpwlh/sql/new)**

Copia **TUTTO** il contenuto del file:
```
scripts/setup_bungalow_db.sql
```

Incolla nel SQL Editor e clicca **"Run"** o **"F5"**

---

### 2️⃣ Crea Storage Bucket

Vai alla sezione Storage:
👉 **[Apri Storage](https://xxqotgrmiimmruglpwlh.supabase.co/project/xxqotgrmiimmruglpwlh/storage/buckets)**

Clicca **"New bucket"**:
- **Nome**: `bungalow-allegati`
- **Visibilità**: `Private` (non pubblico)
- **File size limit**: `5 MB`
- **Allowed MIME types**: `image/jpeg, image/png, image/webp, application/pdf`

---

### 3️⃣ Configura Storage Policies

Vai alle Policy del bucket appena creato:
👉 **Storage > bungalow-allegati > Policies**

#### Policy 1: Upload pubblico
```sql
-- INSERT Policy (permetti upload da form pubblico)
CREATE POLICY "Chiunque può caricare allegati"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'bungalow-allegati');
```

#### Policy 2: Lettura solo admin
```sql
-- SELECT Policy (solo admin autenticati vedono file)
CREATE POLICY "Solo admin leggono allegati"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'bungalow-allegati');
```

---

## ✅ Verifica Setup

Esegui questa query per controllare che tutto funzioni:

```sql
-- Conta tabelle create
SELECT 
  'preventivi_bungalow' AS tabella,
  COUNT(*) AS record
FROM preventivi_bungalow
UNION ALL
SELECT 
  'preventivi_storico' AS tabella,
  COUNT(*) AS record
FROM preventivi_storico;

-- Verifica bucket storage
SELECT name, public 
FROM storage.buckets 
WHERE name = 'bungalow-allegati';
```

Risultato atteso:
- `preventivi_bungalow`: 0 record (se nuovo)
- `preventivi_storico`: 0 record (se nuovo)
- Bucket: `bungalow-allegati`, public: `false`

---

## 📊 Struttura Database Creata

### Tabella: `preventivi_bungalow`
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | UUID | ID univoco preventivo |
| `created_at` | TIMESTAMP | Data creazione |
| `updated_at` | TIMESTAMP | Data ultima modifica (auto) |
| `lunghezza` | DECIMAL(5,2) | Lunghezza in metri |
| `larghezza` | DECIMAL(5,2) | Larghezza in metri |
| `numero_vani` | INTEGER | Numero vani (1-4) |
| `note` | TEXT | Note cliente |
| `cliente_nome` | VARCHAR(255) | Nome cliente |
| `email` | VARCHAR(255) | Email cliente |
| `telefono` | VARCHAR(50) | Telefono cliente |
| `configurazione` | JSONB | Config completa JSON |
| `allegati` | TEXT[] | Array URL immagini |
| `stato` | VARCHAR(50) | nuovo/in_elaborazione/confermato/annullato |
| `mq_totali` | DECIMAL(8,2) | Metri quadri (calcolato auto) |

### Tabella: `preventivi_storico`
Traccia ogni cambio di stato automaticamente.

### View: `preventivi_dashboard`
Vista ottimizzata per dashboard admin con contatori.

---

## 🔐 Security (RLS)

- ✅ **INSERT pubblico**: chiunque può inviare richiesta
- 🔒 **SELECT/UPDATE/DELETE**: solo utenti autenticati (admin)
- 📦 **Storage Upload**: pubblico
- 🔒 **Storage Download**: solo admin autenticati

---

## 🧪 Dati di Test (Opzionale)

Per popolare con dati di esempio, esegui:

```sql
INSERT INTO preventivi_bungalow (lunghezza, larghezza, numero_vani, note, cliente_nome, email, telefono, stato)
VALUES 
  (6.00, 4.00, 2, 'Bungalow per giardino, con porta finestra', 'Mario Rossi', 'mario.rossi@example.com', '+39 333 1234567', 'nuovo'),
  (8.00, 5.00, 3, 'Servono infissi rinforzati', 'Laura Bianchi', 'laura.b@example.com', '+39 348 7654321', 'in_elaborazione'),
  (5.00, 3.50, 1, 'Monolocale per attrezzi', 'Giovanni Verdi', 'g.verdi@example.com', '+39 320 9876543', 'confermato');
```

---

## 🆘 Troubleshooting

### Errore "permission denied"
→ Controlla le RLS Policies siano state create correttamente

### Bucket non trovato
→ Verifica il nome esatto: `bungalow-allegati` (con trattino, non underscore)

### Upload fallisce
→ Controlla le Policy del Storage bucket

---

## 📞 Support

Per problemi, consulta:
- [Supabase Docs - Database](https://supabase.com/docs/guides/database)
- [Supabase Docs - Storage](https://supabase.com/docs/guides/storage)

---

**Creato per**: Configuratore Bungalow Martello1930  
**Versione**: 1.0  
**Data**: 2025-01-23
