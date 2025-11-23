# 🏡 Configuratore Bungalow MARTELLO1930

Configuratore interattivo per bungalow su misura - Progetto dedicato solo al Configuratore Bungalow.

---

## 🎯 Descrizione Progetto

Applicazione web Next.js 15 per la configurazione personalizzata di bungalow in legno. Permette ai clienti di:
- Definire dimensioni personalizzate (lunghezza/larghezza)
- Scegliere il numero di vani interni
- Aggiungere note e allegati fotografici
- Ricevere preventivo automatico via email

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Backend**: Supabase (database + storage)
- **Deployment**: Vercel

---

## 📁 Struttura Progetto

```
/app
  /bungalow         - Configuratore principale (5 step)
    /conferma       - Pagina conferma invio
  /admin            - Dashboard amministrazione
  /catalogo         - Catalogo prodotti (legacy)
  page.tsx          - Homepage dedicata Bungalow
  layout.tsx        - Layout globale

/components
  /layout
    header.tsx      - Header MARTELLO1930
    footer.tsx      - Footer 4 colonne
  /bungalow
    DimensioniStep.tsx      - Step 1: Dimensioni
    VaniStep.tsx            - Step 2: Numero vani
    PiantaDinamica.tsx      - Visualizzazione pianta SVG
    NoteUploadStep.tsx      - Step 3: Note e allegati
    DatiClienteStep.tsx     - Step 4: Dati cliente
    RiepilogoStep.tsx       - Step 5: Riepilogo finale

/lib
  bungalow-api.ts   - API Supabase per preventivi

/types
  bungalow.ts       - TypeScript types + Zod schema
```

---

## 🎨 Design System

### Colori
- **Verde Primary**: `#6AB52B`
- **Verde Hover**: `#5A9823`
- **Verde Highlight**: `#E8F5E0`
- **Grigio Background**: `#F8F8F8`
- **Bianco**: `#FFFFFF`

### Componenti
- Card con `rounded-2xl`, `shadow-md`, padding `p-6 md:p-8`
- Pulsanti primari verdi con hover transition
- Progress bar con step indicator verde
- Footer 4 colonne responsive

---

## 🔧 Setup Locale

### Prerequisiti
- Node.js 18+
- npm o yarn
- Account Supabase

### Installazione

```bash
# Clone repository
git clone https://github.com/lucamartello73/configuratorebungalow-v2.git
cd configuratorebungalow-v2

# Installa dipendenze
npm install

# Crea file .env.local
cp .env.example .env.local

# Configura variabili d'ambiente:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Avvia dev server
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Setup (Supabase)

### Tabella: `configurazioni_bungalow`

```sql
CREATE TABLE configurazioni_bungalow (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dimensioni
  lunghezza INTEGER NOT NULL,
  larghezza INTEGER NOT NULL,
  numero_vani INTEGER NOT NULL,
  
  -- Dati cliente
  cliente_nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  
  -- Extra
  note TEXT,
  allegati TEXT[], -- Array di URL immagini
  
  -- Status
  status TEXT DEFAULT 'pending' -- pending, processing, completed
);

-- Enable Row Level Security
ALTER TABLE configurazioni_bungalow ENABLE ROW LEVEL SECURITY;

-- Policy: Inserimento pubblico
CREATE POLICY "Allow public insert" ON configurazioni_bungalow
  FOR INSERT WITH CHECK (true);

-- Policy: Lettura solo admin
CREATE POLICY "Allow admin read" ON configurazioni_bungalow
  FOR SELECT USING (auth.role() = 'authenticated');
```

### Storage: `bungalow-allegati`

```sql
-- Crea bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('bungalow-allegati', 'bungalow-allegati', true);

-- Policy: Upload pubblico
CREATE POLICY "Allow public upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'bungalow-allegati');
```

---

## 🌐 Deploy su Vercel

### Setup Automatico

1. **Connetti GitHub**: Vai su [Vercel Dashboard](https://vercel.com)
2. **Import Project**: Seleziona `lucamartello73/configuratorebungalow-v2`
3. **Configura Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. **Deploy**: Vercel farà deploy automatico ad ogni push su `main`

### URL Production
- **Live**: https://configuratorebungalow.vercel.app
- **Admin**: https://configuratorebungalow.vercel.app/admin

---

## 📋 Funzionalità

### 🏡 Configuratore (5 Step)

**Step 1: Dimensioni**
- Slider lunghezza (4m - 12m)
- Slider larghezza (3m - 8m)
- Preview pianta dinamica SVG

**Step 2: Vani**
- Selezione numero vani (1-4)
- Visualizzazione pianta aggiornata

**Step 3: Note e Allegati**
- Campo note testuali
- Upload multiplo immagini (drag & drop)
- Preview immagini caricate

**Step 4: Dati Cliente**
- Nome completo
- Email (validazione)
- Telefono
- Validazione con Zod schema

**Step 5: Riepilogo**
- Visualizzazione completa configurazione
- Preview pianta finale
- Lista allegati
- Pulsante "Invia Preventivo"

### 📊 Admin Dashboard

- Login con Supabase Auth
- Lista richieste preventivi
- Filtri per status
- Dettaglio configurazione + download allegati

---

## 🔐 Variabili d'Ambiente

```env
# Supabase (obbligatorio)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Vercel (automatico in deploy)
VERCEL_URL=configuratorebungalow.vercel.app
VERCEL_ENV=production
```

---

## 🧪 Testing

```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit

# Build test
npm run build

# Start production
npm run start
```

---

## 📞 Contatti MARTELLO1930

- **Sede**: Via Traversaro, 13 — 16039 SESTRI LEVANTE (GE)
- **Telefono**: +39 0185 41793
- **WhatsApp**: +39 0185 167 656
- **Email**: info@martello1930.net
- **Orari**: lun-ven 8:00-12:00 / 14:00-18:00 — sab 08:00-12:00

---

## 📝 License

© 2025 Martello1930 - Tutti i diritti riservati

---

## 🚀 Changelog

### v2.0.0 (2025-11-23)
- ✅ Progetto dedicato SOLO a Configuratore Bungalow
- ✅ Rimossi configuratori Casette Giardino e Vacanza
- ✅ Nuova homepage dedicata con design MARTELLO1930
- ✅ Header e Footer unificati
- ✅ Palette colori verde brand (#6AB52B)
- ✅ Framer Motion animations
- ✅ TypeScript strict mode

### v1.0.0 (2025-11-16)
- ✅ Configuratore Bungalow 5 step
- ✅ Validazione Zod
- ✅ Upload immagini Supabase
- ✅ Admin dashboard
- ✅ Deploy Vercel
