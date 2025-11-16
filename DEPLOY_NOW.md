# 🚀 DEPLOY IMMEDIATO - Configuratore Casette Legno

## ⚡ Deploy Rapido (5 minuti)

### 📋 STEP 1: Prepara le Credenziali Supabase

Prima di iniziare, hai bisogno di 3 chiavi da Supabase:

1. Vai su https://supabase.com
2. Apri il tuo progetto
3. Vai in **Settings** → **API**
4. Copia questi valori:

```
Project URL: ___________________________________
anon/public key: ___________________________________
service_role key: ___________________________________
```

---

### 🌐 STEP 2: Deploy su Vercel

#### Opzione A: Deploy Automatico da GitHub (CONSIGLIATO - 3 click)

1. **Clicca qui**: https://vercel.com/new/import

2. **Importa Repository**:
   - Seleziona: `lucamartello73/configuratorebungalow`
   - Clicca "Import"

3. **Configura Environment Variables** (prima del deploy):
   
   Clicca "Environment Variables" e aggiungi:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (incolla Project URL da Supabase) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (incolla anon key da Supabase) |
   | `SUPABASE_SERVICE_ROLE_KEY` | (incolla service_role key da Supabase) |

4. **Deploy**:
   - Clicca "Deploy"
   - Attendi 2-3 minuti
   - ✅ FATTO! Il sito sarà online su: `https://configuratorebungalow.vercel.app`

---

#### Opzione B: Deploy da CLI (per utenti avanzati)

```bash
# 1. Login a Vercel
npx vercel login

# 2. Deploy
cd /home/user/webapp
npx vercel --prod

# 3. Segui le istruzioni interattive:
# - Set up and deploy? Yes
# - Which scope? (seleziona il tuo account)
# - Link to existing project? No
# - Project name? configuratorebungalow
# - Directory? ./
# - Override settings? No

# 4. Aggiungi variabili d'ambiente
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
# (inserisci il valore quando richiesto)

npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# (inserisci il valore quando richiesto)

npx vercel env add SUPABASE_SERVICE_ROLE_KEY production
# (inserisci il valore quando richiesto)

# 5. Re-deploy con le variabili
npx vercel --prod
```

---

### ✅ STEP 3: Verifica il Deploy

Una volta completato il deploy, visita il tuo sito:

🌐 **URL**: `https://configuratorebungalow.vercel.app` (o l'URL fornito da Vercel)

**Controlla**:
- ✅ Homepage con logo Martello1930
- ✅ Pulsante "Sfoglia il Catalogo" funzionante
- ✅ Pulsante "Configura Su Misura" funzionante
- ✅ Footer con contatti

---

## 🔄 Aggiornamenti Automatici

Da ora in poi, **ogni push su GitHub** farà scattare automaticamente:
1. Build del progetto
2. Deploy della nuova versione
3. Pubblicazione live

**Non serve fare nulla manualmente!**

---

## 🎯 Accesso Admin

Per accedere alla dashboard admin:

1. Vai su: `https://configuratorebungalow.vercel.app/admin/login`
2. Usa le credenziali dell'utente creato su Supabase

---

## 📱 Domini Personalizzati (Opzionale)

Se vuoi usare un dominio tipo `casette.martello1930.net`:

1. Vercel Dashboard → tuo progetto → **Settings** → **Domains**
2. Clicca "Add"
3. Inserisci il dominio
4. Configura i DNS come indicato

---

## 🆘 Problemi?

**Build fallisce con errori Supabase?**
- Verifica di aver inserito correttamente le 3 variabili d'ambiente
- Controlla che non ci siano spazi extra
- URL Supabase deve essere senza slash finale

**Pagine bianche?**
- Apri Developer Console (F12)
- Controlla errori JavaScript
- Verifica connessione Supabase

**Immagini non visibili?**
- Verifica che le URL delle immagini siano accessibili
- Controlla `next.config.js`

---

## 📊 Monitoraggio

Dopo il deploy, abilita Vercel Analytics:
1. Dashboard Vercel → tuo progetto → **Analytics**
2. Enable Analytics
3. Monitora visite, performance, errori

---

## 🎉 Fatto!

Il tuo Configuratore Casette Legno è ora LIVE su internet!

Condividi l'URL con i tuoi clienti e inizia a raccogliere richieste di preventivo.

---

**Repository**: https://github.com/lucamartello73/configuratorebungalow  
**Supporto**: soluzioni@martello1930.net
