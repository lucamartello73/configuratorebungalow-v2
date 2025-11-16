# 🏡 Configuratore Casette Legno - Martello1930

Sistema di configurazione online per casette in legno da giardino, carport, pergole e strutture su misura.

## 🚀 Deploy Rapido

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flucamartello73%2Fconfiguratorbungalow&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&envDescription=Credenziali%20Supabase%20necessarie%20per%20il%20funzionamento&envLink=https%3A%2F%2Fsupabase.com%2Fdashboard%2Fproject%2F_%2Fsettings%2Fapi&project-name=configuratore-casette-legno&repository-name=configuratore-casette-legno)

📖 **Guida completa**: Vedi [DEPLOY_NOW.md](DEPLOY_NOW.md) per istruzioni dettagliate

## 🎯 Funzionalità

### 👥 Lato Cliente
- ✅ Visualizzazione modelli standard da catalogo
- ✅ Configuratore interattivo su misura (dimensioni, materiale, accessori)
- ✅ Calcolo prezzo stimato in tempo reale
- ✅ Invio richiesta preventivo con dati cliente
- ✅ Filtri per materiale e tipologia

### 🔐 Lato Admin
- ✅ Pannello amministrazione protetto (Supabase Auth)
- ✅ Gestione modelli standard (CRUD)
- ✅ Visualizzazione richieste clienti
- ✅ Upload immagini su Supabase Storage
- ✅ Gestione stato richieste

## 🛠 Stack Tecnologico

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Backend**: Supabase (Database + Auth + Storage)
- **Form**: React Hook Form + Yup
- **Icons**: Lucide React
- **Deploy**: Vercel

## 📋 Setup Progetto

### 1. Installazione Dipendenze

```bash
pnpm install
```

### 2. Configurazione Supabase

Crea un progetto su [Supabase](https://supabase.com) e configura le variabili d'ambiente:

```bash
cp .env.local.example .env.local
```

Compila `.env.local` con le tue credenziali Supabase.

### 3. Schema Database

Esegui nel SQL Editor di Supabase:

```sql
-- Tabella modelli standard
CREATE TABLE modelli_standard (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  materiale VARCHAR(100),
  descrizione TEXT,
  dimensioni VARCHAR(100),
  spessore_tavole VARCHAR(50),
  prezzo NUMERIC(10,2),
  fonte VARCHAR(100),
  immagine_url TEXT,
  creato_il TIMESTAMP DEFAULT NOW()
);

-- Tabella configurazioni custom
CREATE TABLE configurazioni_custom (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  larghezza NUMERIC(10,2),
  profondita NUMERIC(10,2),
  materiale VARCHAR(100),
  accessori TEXT[],
  prezzo_stimato NUMERIC(10,2),
  cliente_nome VARCHAR(255),
  telefono VARCHAR(50),
  email VARCHAR(255),
  zona VARCHAR(100),
  stato VARCHAR(50) DEFAULT 'nuova',
  creato_il TIMESTAMP DEFAULT NOW()
);

-- Abilita Row Level Security
ALTER TABLE modelli_standard ENABLE ROW LEVEL SECURITY;
ALTER TABLE configurazioni_custom ENABLE ROW LEVEL SECURITY;

-- Policy lettura pubblica modelli
CREATE POLICY "Lettura pubblica modelli" ON modelli_standard FOR SELECT USING (true);

-- Policy inserimento configurazioni pubblico
CREATE POLICY "Inserimento configurazioni pubblico" ON configurazioni_custom FOR INSERT WITH CHECK (true);

-- Policy admin completo
CREATE POLICY "Admin completo modelli" ON modelli_standard FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin completo configurazioni" ON configurazioni_custom FOR ALL USING (auth.role() = 'authenticated');
```

### 4. Avvio Sviluppo

```bash
pnpm dev
```

Apri [http://localhost:3000](http://localhost:3000)

## 📁 Struttura Progetto

```
configuratorebungalow/
├── app/
│   ├── layout.tsx              # Layout globale con footer
│   ├── page.tsx                # Homepage
│   ├── modelli/
│   │   └── page.tsx            # Catalogo modelli
│   ├── configura/
│   │   └── page.tsx            # Configuratore su misura
│   └── admin/
│       ├── login/
│       │   └── page.tsx        # Login admin
│       └── page.tsx            # Dashboard admin
├── components/
│   ├── layout/
│   │   ├── footer-martello1930.tsx   # Footer aziendale
│   │   └── header-configuratore.tsx  # Header navigazione
│   └── CasettaCard.tsx         # Card prodotto
├── lib/
│   └── supabase.ts             # Client Supabase
└── public/
```

## 🚀 Deploy su Vercel

### Deploy con 1 Click
Clicca sul bottone "Deploy with Vercel" in alto per un deploy immediato.

### Deploy Manuale
1. Push su GitHub
2. Connetti repository su [Vercel](https://vercel.com)
3. Configura variabili d'ambiente da `.env.local`
4. Deploy automatico

📖 **Guida dettagliata**: [DEPLOY_NOW.md](DEPLOY_NOW.md) | [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)

## 📞 Contatti Aziendali

- **Sede**: Via Aurelia, Sestri Levante (GE)
- **Telefono**: +39 0185 167 656
- **WhatsApp**: [wa.me/390185167656](https://wa.me/390185167656)
- **Email**: soluzioni@martello1930.net
- **Sito**: [www.martello1930.net](https://www.martello1930.net)

## 📄 Licenza

© 2025 Martello1930. Tutti i diritti riservati.
