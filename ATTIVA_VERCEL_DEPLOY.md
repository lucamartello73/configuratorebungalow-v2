# 🚨 ATTIVARE DEPLOY AUTOMATICO VERCEL

## Il Problema
Il repository GitHub NON è collegato a Vercel, quindi i push non triggerano deploy.

## ✅ SOLUZIONE RAPIDA (2 minuti)

### STEP 1: Importa il Progetto su Vercel

1. **Vai su**: https://vercel.com/new/import

2. **Login** con il tuo account (GitHub/GitLab/Email)

3. **Importa Repository Git**:
   - Clicca su "Import Git Repository"
   - Se richiesto, autorizza Vercel ad accedere a GitHub
   - Cerca: `lucamartello73/configuratorebungalow`
   - Clicca "Import"

### STEP 2: Configura Variabili d'Ambiente

Prima di cliccare Deploy, aggiungi queste variabili:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://cebmwjipqqgnzwrvijlu.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlYm13amlwcXFnbnp3cnZpamx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxOTgxMjAsImV4cCI6MjA3ODc3NDEyMH0.qYxGvJ_3bRQXHRhKOxLCDxFH9TM8Uc9OLgwCZBP_mLI

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlYm13amlwcXFnbnp3cnZpamx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE5ODEyMCwiZXhwIjoyMDc4Nzc0MTIwfQ.vVVOARIJh0UMkEpoaxpVrrwyVxMhB0V-du1oyCzR0s4
```

⚠️ **IMPORTANTE**: Queste credenziali sono prese da `setup_database.js`

### STEP 3: Deploy!

1. Clicca "Deploy"
2. Attendi 2-3 minuti
3. ✅ Il sito sarà live!

### STEP 4: Verifica Deploy Automatici

Dopo il primo deploy:
- Ogni push su `main` triggerà automaticamente un nuovo deploy
- Vedrai i deploy in Dashboard → Deployments

## 🔗 Link Diretti

**Importa Progetto**: https://vercel.com/new/import
**Dashboard Vercel**: https://vercel.com/dashboard
**Repository GitHub**: https://github.com/lucamartello73/configuratorebungalow

## ✅ Fatto!

Una volta completato, l'app sarà su: `https://configuratorebungalow.vercel.app`
