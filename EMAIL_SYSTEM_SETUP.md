# 📧 Sistema Email Gmail SMTP - Setup Guide

Sistema completo di invio email per preventivi e conferme clienti MARTELLO1930.

---

## 🎯 Funzionalità

### Email Cliente (HTML Responsive)
- ✅ Conferma ricezione richiesta
- ✅ Riepilogo dati inviati
- ✅ Prezzo stimato (se presente)
- ✅ Timeline "Cosa succede ora?" (3 step)
- ✅ Contatti aziendali nel footer
- ✅ Design verde MARTELLO1930

### Email Admin (Plain-text con Emoji)
- ✅ Notifica immediata al team
- ✅ Dati cliente formattati
- ✅ Reply-to diretto al cliente
- ✅ Checklist azioni da fare
- ✅ Timestamp italiano

---

## 🔧 Setup Gmail App Password

### Prerequisiti
1. Account Gmail aziendale: `preventivi@martello1930.net`
2. Autenticazione a 2 fattori (2FA) attivata sull'account

### Generazione App Password

**Step 1: Vai su Google Account**
```
https://myaccount.google.com/apppasswords
```

**Step 2: Crea nuova App Password**
- Seleziona "App: Mail"
- Seleziona "Device: Other (custom name)"
- Nome: "MARTELLO1930 Preventivi Vercel"
- Clicca "Genera"

**Step 3: Copia la password**
- Google mostrerà una password di 16 caratteri (es: `abcd efgh ijkl mnop`)
- **IMPORTANTE**: Rimuovi gli spazi → `abcdefghijklmnop`
- Copia questa password

**Step 4: Salva in Vercel**
```
Vercel Dashboard → Progetto → Settings → Environment Variables
Nome: GMAIL_APP_PASSWORD
Valore: abcdefghijklmnop (16 caratteri senza spazi)
Environment: Production, Preview, Development
```

---

## ⚙️ Configurazione Vercel

### Variabili d'Ambiente Richieste

```env
# Gmail Account
GMAIL_USER=preventivi@martello1930.net

# Gmail App Password (16 caratteri)
GMAIL_APP_PASSWORD=your_16_char_app_password
```

### Come Configurare su Vercel

1. **Dashboard**: https://vercel.com/lucamartello73-4767s-projects/configuratorebungalow-v2
2. **Settings** → **Environment Variables**
3. Aggiungi le 2 variabili sopra:
   - Nome: `GMAIL_USER`
   - Valore: `preventivi@martello1930.net`
   - Environments: ✅ Production ✅ Preview ✅ Development
4. Aggiungi seconda variabile:
   - Nome: `GMAIL_APP_PASSWORD`
   - Valore: (la password a 16 caratteri copiata)
   - Environments: ✅ Production ✅ Preview ✅ Development
5. **Save** e **Redeploy** il progetto

---

## 📁 Struttura File

```
/types
  cliente.ts                  # Interfaces TypeScript

/lib/email
  gmail-transport.ts          # Configurazione SMTP
  templates.ts                # Template HTML e plain-text

/app/api/send-quote
  route.ts                    # API endpoint POST
```

---

## 🚀 Utilizzo API

### Endpoint
```
POST /api/send-quote
```

### Request Body (JSON)

**Campi Obbligatori**:
```json
{
  "nome": "Mario Rossi",
  "email": "mario.rossi@example.com",
  "telefono": "+39 333 1234567",
  "privacyAccettata": true,
  "tipoRichiesta": "preventivo"
}
```

**Campi Opzionali**:
```json
{
  "note": "Vorrei un sopralluogo urgente",
  "prezzoTotale": 15000,
  "indirizzo": "Via Roma 1",
  "citta": "Sestri Levante",
  "provincia": "GE",
  "cap": "16039",
  "dettagliProgetto": {
    "tipologia": "Bungalow 6x4",
    "dimensioni": "6m x 4m",
    "materiale": "Legno lamellare",
    "accessori": ["Porta doppia", "Finestra panoramica"]
  }
}
```

### Response (Success)

```json
{
  "success": true,
  "clientMessageId": "<abc123@gmail.com>",
  "adminMessageId": "<def456@gmail.com>"
}
```

### Response (Error)

```json
{
  "success": false,
  "error": "Descrizione errore"
}
```

---

## 🧪 Test Locale

### 1. Crea .env.local

```bash
cp .env.example .env.local
```

Compila:
```env
GMAIL_USER=preventivi@martello1930.net
GMAIL_APP_PASSWORD=your_16_char_password
```

### 2. Avvia Dev Server

```bash
npm run dev
```

### 3. Test con cURL

```bash
curl -X POST http://localhost:3000/api/send-quote \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Test Cliente",
    "email": "test@example.com",
    "telefono": "+39 333 1234567",
    "privacyAccettata": true,
    "tipoRichiesta": "preventivo",
    "note": "Questo è un test",
    "prezzoTotale": 10000
  }'
```

### 4. Verifica Endpoint (GET - solo dev)

```bash
curl http://localhost:3000/api/send-quote
```

Response:
```json
{
  "status": "API send-quote attiva",
  "method": "POST",
  "gmailConfigured": true
}
```

---

## 📧 Template Email

### Cliente (HTML Responsive)

**Caratteristiche**:
- Header gradient verde (#6AB52B → #5A9823)
- Success badge
- Info box con riepilogo dati
- Price box (se presente)
- Timeline "Cosa succede ora?" (3 step)
- CTA "Chiama Ora"
- Footer contatti completo
- Responsive mobile-first

### Admin (Plain-text)

**Caratteristiche**:
- Emoji per leggibilità
- Separatori ASCII
- Dati cliente formattati
- Dettagli progetto (se presenti)
- Note aggiuntive
- Checklist azioni
- Reply-to diretto al cliente

---

## 🐛 Troubleshooting

### Errore: "GMAIL_USER o GMAIL_APP_PASSWORD non configurate"

**Causa**: Variabili d'ambiente mancanti su Vercel

**Soluzione**:
1. Verifica su Vercel Dashboard → Settings → Environment Variables
2. Assicurati che entrambe le variabili siano configurate
3. Redeploy il progetto

---

### Errore: "Invalid login credentials"

**Causa**: Password Gmail sbagliata o 2FA non attivo

**Soluzione**:
1. Verifica che l'account `preventivi@martello1930.net` abbia 2FA attivo
2. Genera una nuova App Password
3. Aggiorna `GMAIL_APP_PASSWORD` su Vercel (rimuovi spazi!)
4. Redeploy

---

### Email non arrivano

**Causa 1**: Finiscono in spam

**Soluzione**:
- Controlla cartella spam/junk
- Aggiungi `preventivi@martello1930.net` ai contatti
- Verifica SPF/DKIM del dominio Gmail

**Causa 2**: Rate limit Gmail

**Soluzione**:
- Gmail ha limite ~500 email/giorno
- Implementato sistema retry (3 tentativi)
- Per volumi alti, considera servizi professionali (SendGrid, AWS SES)

---

### Test fallisce in locale

**Causa**: .env.local non configurato

**Soluzione**:
```bash
# Verifica che le variabili siano presenti
cat .env.local

# Riavvia dev server
npm run dev
```

---

## 📊 Monitoring

### Log Server (Vercel)

```bash
# Dashboard Vercel → Tab "Logs"
# Cerca:
- "📧 Invio email conferma a:"
- "✅ Email cliente inviata:"
- "✅ Email admin inviata:"
- "❌ Errore invio email:"
```

### Log Gmail

- Vai su Gmail → Inviati
- Verifica che le email siano presenti
- Controlla bounce/errori

---

## 🔒 Sicurezza

### Best Practices

✅ **App Password invece di password reale**
✅ **Variabili d'ambiente su Vercel (non in codice)**
✅ **Validazione input lato server**
✅ **Rate limiting (TODO: implementare)**
✅ **HTTPS only (Vercel automatico)**
✅ **No email esposte nel frontend**

### NON Fare Mai:

❌ Committare .env.local su Git
❌ Usare password Gmail reale
❌ Esporre GMAIL_APP_PASSWORD nel frontend
❌ Loggare password nei logs

---

## 📝 Changelog

### v1.0.0 (2025-11-29)
- ✅ Sistema email Gmail SMTP completo
- ✅ Template HTML responsive cliente
- ✅ Template plain-text admin
- ✅ API endpoint `/api/send-quote`
- ✅ Validazione input robusta
- ✅ Sistema retry automatico
- ✅ Logging dettagliato
- ✅ Error handling completo
- ✅ Documentazione setup

---

## 🆘 Supporto

In caso di problemi:

1. **Verifica variabili Vercel**: https://vercel.com/lucamartello73-4767s-projects/configuratorebungalow-v2/settings/environment-variables
2. **Controlla logs Vercel**: Tab "Logs" nella dashboard
3. **Test endpoint**: `GET /api/send-quote` (solo dev)
4. **Contatta amministratore**: preventivi@martello1930.net

---

© 2025 Martello 1930 - Sistema Preventivi Email
