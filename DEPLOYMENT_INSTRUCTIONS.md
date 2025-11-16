# 🚀 Istruzioni per il Deployment su Vercel

## Metodo 1: Deploy tramite Dashboard Vercel (CONSIGLIATO)

### Passo 1: Accedi a Vercel
1. Vai su [vercel.com](https://vercel.com)
2. Accedi con il tuo account GitHub

### Passo 2: Importa il Repository
1. Clicca su "Add New..." → "Project"
2. Seleziona il repository: `lucamartello73/configuratorebungalow`
3. Clicca su "Import"

### Passo 3: Configura le Variabili d'Ambiente
Prima del deploy, aggiungi queste variabili d'ambiente:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Come trovarle su Supabase:**
1. Vai su [supabase.com](https://supabase.com)
2. Apri il tuo progetto
3. Vai in "Settings" → "API"
4. Copia:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### Passo 4: Deploy
1. Clicca su "Deploy"
2. Attendi che il build si completi (2-3 minuti)
3. Il tuo sito sarà disponibile su: `https://configuratorebungalow.vercel.app`

---

## Metodo 2: Deploy tramite CLI (Alternativo)

### Prerequisiti
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy Production
```bash
cd /home/user/webapp
vercel --prod
```

Durante il processo, vercel chiederà:
- Project Name: `configuratorebungalow`
- Framework: `Next.js` (auto-detected)
- Build Settings: conferma i default

### Aggiungi Variabili d'Ambiente
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### Re-deploy con le Variabili
```bash
vercel --prod
```

---

## Verifica Post-Deploy

Dopo il deployment, verifica che tutto funzioni:

### ✅ Checklist
- [ ] Homepage carica correttamente
- [ ] Logo Martello1930 visibile (ridimensionato)
- [ ] Link "Sfoglia il Catalogo" funzionante
- [ ] Link "Configura Su Misura" funzionante
- [ ] Footer con contatti visualizzato
- [ ] Responsive su mobile

### 🔧 Se qualcosa non funziona

**Errore: "Supabase connection failed"**
- Verifica le variabili d'ambiente su Vercel Dashboard
- Controlla che non ci siano spazi extra nelle chiavi
- Assicurati che l'URL Supabase non abbia slash finale

**Immagini non caricate**
- Verifica `next.config.js` abbia i domini configurati
- Controlla che le URL delle immagini siano accessibili

---

## Aggiornamenti Futuri

Ogni volta che fai push su GitHub, Vercel:
1. ✅ Rileva automaticamente le modifiche
2. ✅ Esegue il build
3. ✅ Deploya automaticamente la nuova versione

---

## Domini Personalizzati

Per aggiungere un dominio custom (es. `casette.martello1930.net`):

1. Vai su Vercel Dashboard → Settings → Domains
2. Clicca "Add Domain"
3. Inserisci il dominio
4. Configura i DNS come indicato da Vercel

---

## Monitoraggio

### Analytics
Abilita Vercel Analytics per monitorare:
- Visite e traffico
- Performance (Web Vitals)
- Errori in produzione

### Logs
Accedi ai logs in tempo reale:
- Dashboard Vercel → tuo progetto → Logs

---

## Supporto

- **Repository GitHub**: [github.com/lucamartello73/configuratorebungalow](https://github.com/lucamartello73/configuratorebungalow)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Email**: soluzioni@martello1930.net

---

## Note Importanti

⚠️ **Non committare mai** il file `.env.local` su Git  
✅ **Usa sempre** le variabili d'ambiente di Vercel per le credenziali  
🔄 **Deploy automatico** attivo su ogni push al branch `main`
