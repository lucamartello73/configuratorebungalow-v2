# 🚀 Setup Vercel per configuratorebungalow-v2

Guida completa per configurare il deploy su Vercel del nuovo repository.

---

## 📋 STEP 1: Importa Progetto su Vercel

### 1.1 Accedi a Vercel

Vai su: **https://vercel.com/new/import**

### 1.2 Importa Repository

1. Clicca su **"Import Git Repository"**
2. Se richiesto, autorizza Vercel ad accedere a GitHub
3. Cerca e seleziona: **`lucamartello73/configuratorebungalow-v2`**
4. Clicca **"Import"**

---

## 🔧 STEP 2: Configura Variabili d'Ambiente

Prima di fare il deploy, configura queste 3 variabili d'ambiente:

### Environment Variables

Clicca su **"Environment Variables"** e aggiungi:

#### Variabile 1: NEXT_PUBLIC_SUPABASE_URL

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://cebmwjipqqgnzwrvijlu.supabase.co
```

#### Variabile 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlYm13amlwcXFnbnp3cnZpamx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxOTgxMjAsImV4cCI6MjA3ODc3NDEyMH0.qYxGvJ_3bRQXHRhKOxLCDxFH9TM8Uc9OLgwCZBP_mLI
```

#### Variabile 3: SUPABASE_SERVICE_ROLE_KEY

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlYm13amlwcXFnbnp3cnZpamx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE5ODEyMCwiZXhwIjoyMDc4Nzc0MTIwfQ.vVVOARIJh0UMkEpoaxpVrrwyVxMhB0V-du1oyCzR0s4
```

---

## 🎯 STEP 3: Deploy!

1. Dopo aver configurato le variabili, clicca **"Deploy"**
2. Attendi 2-3 minuti per il build
3. ✅ Il sito sarà live su: `https://configuratorebungalow-v2.vercel.app`

---

## 🔔 STEP 4: Crea Deploy Hook (Essenziale!)

Per abilitare i deploy automatici:

### 4.1 Vai nelle Settings

1. **Vercel Dashboard** → Progetto `configuratorebungalow-v2`
2. Tab **"Settings"**
3. Sezione **"Git"** → **"Deploy Hooks"**

### 4.2 Crea Nuovo Hook

1. Clicca **"Create Hook"**
2. **Hook Name**: `GitHub Auto Deploy`
3. **Branch**: `main`
4. Clicca **"Create Hook"**

### 4.3 Copia URL Deploy Hook

Vercel ti mostrerà un URL tipo:

```
https://api.vercel.com/v1/integrations/deploy/prj_xxxxx/yyyyy
```

**COPIA QUESTO URL** - ti servirà per lo step successivo.

---

## 🔧 STEP 5: Configura Script Deploy Automatico

### 5.1 Apri file deploy-with-hook.sh

Nel repository locale, apri: `deploy-with-hook.sh`

### 5.2 Sostituisci URL Deploy Hook

Trova questa riga:

```bash
DEPLOY_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/prj_gD6g83GccjB0gtxzKEwoqtY746yW/IneDOIMarS"
```

Sostituiscila con il TUO URL Deploy Hook copiato allo step 4.3:

```bash
DEPLOY_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/prj_XXXXX/YYYYY"
```

### 5.3 Commit e Push

```bash
git add deploy-with-hook.sh
git commit -m "fix: aggiorna Deploy Hook URL per v2"
./deploy-with-hook.sh
```

---

## ✅ STEP 6: Verifica Deployment

### 6.1 Controlla Vercel Dashboard

1. Vai su **Vercel Dashboard** → `configuratorebungalow-v2`
2. Tab **"Deployments"**
3. Dovresti vedere un nuovo deployment con:
   - ✅ Commit: "fix: aggiorna Deploy Hook URL per v2"
   - ✅ Status: Building → Ready
   - ✅ Branch: main

### 6.2 Testa il Sito

Apri: **https://configuratorebungalow-v2.vercel.app**

Verifica che funzioni:
- ✅ Homepage con logo Martello1930
- ✅ Badge "✅ Deploy Verificato - Nov 2025"
- ✅ Pulsante "📦 Sfoglia il Catalogo ✨ NUOVO"
- ✅ Pulsante "🛠️ Configura Su Misura 🔥 AGGIORNATO"
- ✅ Footer con contatti

---

## 🔄 STEP 7: Test Deploy Automatico

Fai un piccolo commit di test per verificare che tutto funzioni:

```bash
# Modifica un file
echo "# Test deploy automatico" >> README_V2.md

# Commit
git add README_V2.md
git commit -m "test: verifica deploy automatico v2"

# Deploy automatico (push + trigger Vercel)
./deploy-with-hook.sh
```

Dopo 2-3 minuti, verifica su Vercel Dashboard che il nuovo deployment sia apparso.

---

## 🎯 Workflow Completo Deployment

Da ora in poi, per ogni modifica:

```bash
# 1. Fai modifiche al codice
nano app/page.tsx

# 2. Commit
git add .
git commit -m "feat: nuova funzionalità"

# 3. Deploy automatico
./deploy-with-hook.sh
```

Questo comando:
1. ✅ Pusha su GitHub
2. ✅ Triggera automaticamente il deploy su Vercel
3. ✅ Mostra Job ID del deployment
4. ✅ Deploy completo in 2-3 minuti

---

## 🔍 Verifica Integrazione GitHub

Per assicurarti che GitHub sia correttamente collegato:

### Verifica Webhook

1. **Vercel Dashboard** → Settings → Git
2. Verifica che "**GitHub**" sia **"Connected"**
3. Repository: `lucamartello73/configuratorebungalow-v2`

### Se non è connesso:

1. Clicca **"Connect Git Repository"**
2. Autorizza GitHub
3. Seleziona `configuratorebungalow-v2`

---

## 📊 Monitoraggio

### Vercel Analytics (Opzionale)

1. **Vercel Dashboard** → Analytics
2. Clicca **"Enable Analytics"**
3. Monitora: visite, performance, errori

### Build Logs

Per debug errori:
1. **Vercel Dashboard** → Deployments
2. Clicca su deployment specifico
3. Tab **"Logs"** per vedere log completo

---

## 🆘 Troubleshooting

### Build fallisce con errori Supabase?

✅ Verifica variabili d'ambiente in Settings → Environment Variables  
✅ Assicurati che non ci siano spazi extra  
✅ URL Supabase deve essere senza slash finale

### Deploy Hook non triggera build?

✅ Verifica URL Deploy Hook in `deploy-with-hook.sh`  
✅ Controlla che il webhook sia attivo su Vercel  
✅ Verifica che il branch sia "main"

### Immagini non visibili?

✅ Controlla `next.config.js` per domini immagini  
✅ Verifica che URL immagini siano accessibili  
✅ Controlla permessi Supabase Storage

---

## 🎉 Setup Completato!

Dopo aver seguito tutti gli step:

- ✅ Progetto importato su Vercel
- ✅ Variabili d'ambiente configurate
- ✅ Deploy Hook creato e configurato
- ✅ Script deploy automatico funzionante
- ✅ GitHub integrato correttamente
- ✅ Sito live e accessibile

---

## 🔗 Link Utili

**Repository**: https://github.com/lucamartello73/configuratorebungalow-v2  
**Vercel Dashboard**: https://vercel.com/dashboard  
**Sito Live**: https://configuratorebungalow-v2.vercel.app  
**Supabase Dashboard**: https://supabase.com/dashboard

---

**Versione Guida**: 1.0  
**Data**: 2025-11-16  
**Status**: ✅ Complete
