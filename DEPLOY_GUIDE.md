# 🚀 GUIDA DEPLOY CONFIGURATORE CASETTE LEGNO

## ✅ CHECKLIST PRE-DEPLOY

### 1. Setup Supabase
- [ ] Crea progetto su [supabase.com](https://supabase.com)
- [ ] Esegui SQL schema dal README
- [ ] Crea utente admin (Settings → Auth → Users)
- [ ] Configura Storage bucket `modelli-immagini` (pubblico)
- [ ] Copia URL e API Keys

### 2. Configurazione Locale
- [ ] Crea `.env.local` da `.env.local.example`
- [ ] Inserisci credenziali Supabase
- [ ] Test locale: `pnpm dev`
- [ ] Verifica connessione database

### 3. Deploy Vercel

#### A. Push su GitHub
```bash
git init
git add .
git commit -m "Initial commit - Configuratore Casette Legno"
git branch -M main
git remote add origin https://github.com/lucamartello73/configuratorebungalow.git
git push -u origin main
```

#### B. Connetti Vercel
1. Vai su [vercel.com](https://vercel.com)
2. Import repository GitHub
3. Configura variabili d'ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

## 🔧 POST-DEPLOY

### Popolamento Dati Iniziali

Inserisci modelli da listini tramite SQL:

```sql
-- Esempio: Carport RIMINI 350x350
INSERT INTO modelli_standard (nome, materiale, descrizione, dimensioni, prezzo, fonte)
VALUES (
  'Carport RIMINI 350x350',
  'lamellare',
  'Carport lamellare, due falde, perline 20mm + telo; h sotto trave 210cm',
  '350x350',
  1900.00,
  'Listino_Carport_Pergole.pdf'
);

-- Esempio: Casetta PENT 180x120
INSERT INTO modelli_standard (nome, materiale, descrizione, dimensioni, spessore_tavole, prezzo, fonte)
VALUES (
  'Casetta PENT 180x120',
  'abete',
  'Casetta porta attrezzi: porta singola 75cm, finestra apribile, h gronda 172cm',
  '180x120',
  '20mm',
  900.00,
  'Listino_Casette_Tradizionali.pdf'
);
```

### Test Produzione

- [ ] Homepage carica correttamente
- [ ] Modelli visualizzati (se inseriti)
- [ ] Configuratore funzionante
- [ ] Form invio richiesta OK
- [ ] Footer contatti cliccabili
- [ ] Responsive mobile OK
- [ ] Login admin funzionante

## 📊 MONITORAGGIO

### Vercel Analytics
Abilita da dashboard Vercel per monitorare:
- Visite
- Performance
- Errori

### Supabase Dashboard
Monitora:
- Richieste database
- Storage utilizzato
- Autenticazioni

## 🔒 SICUREZZA

### Row Level Security (RLS)
✅ Già configurato nel setup SQL

### Variabili Ambiente
❌ **MAI** committare `.env.local` su Git
✅ Usa solo variabili d'ambiente Vercel

## 📱 DOMINIO CUSTOM (Opzionale)

1. Acquista dominio (es. casette.martello1930.net)
2. Vercel → Settings → Domains
3. Aggiungi dominio e configura DNS

## 🆘 TROUBLESHOOTING

### Errore "Supabase connection failed"
- Verifica variabili ambiente Vercel
- Controlla URL Supabase (no slash finale)

### Logo non appare
- Verifica `next.config.js` domini immagini
- Controlla URL immagine accessibile

### Form non invia
- Controlla RLS policies Supabase
- Verifica logs Vercel

## 📞 SUPPORTO

- Repository: [github.com/lucamartello73/configuratorebungalow](https://github.com/lucamartello73/configuratorebungalow)
- Email: soluzioni@martello1930.net
