#!/bin/bash

# Script per il deployment automatico su Vercel
# Configuratore Casette Legno - Martello1930

set -e

echo "🚀 DEPLOYMENT CONFIGURATORE CASETTE LEGNO SU VERCEL"
echo "=================================================="
echo ""

# Verifica che siamo nella directory corretta
if [ ! -f "package.json" ]; then
    echo "❌ Errore: package.json non trovato"
    echo "   Esegui questo script dalla root del progetto"
    exit 1
fi

echo "✅ Directory corretta"
echo ""

# Verifica che git sia aggiornato
echo "📡 Verifico stato repository Git..."
git fetch origin main

if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Ci sono modifiche non committate"
    read -p "Vuoi commitarle ora? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Messaggio commit: " commit_msg
        git commit -m "$commit_msg"
        git push origin main
        echo "✅ Modifiche committate e pushate"
    else
        echo "❌ Deployment annullato - committa prima le modifiche"
        exit 1
    fi
else
    echo "✅ Repository aggiornato"
fi

echo ""
echo "🔐 CONFIGURAZIONE VARIABILI D'AMBIENTE"
echo "======================================"
echo ""
echo "Per il deployment su Vercel sono necessarie 3 variabili d'ambiente da Supabase:"
echo ""
echo "1. NEXT_PUBLIC_SUPABASE_URL"
echo "2. NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "3. SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "📌 Le trovi su: https://supabase.com/dashboard → tuo progetto → Settings → API"
echo ""

# Chiedi se l'utente vuole procedere con CLI o Dashboard
echo "Scegli il metodo di deployment:"
echo ""
echo "1) 🌐 Dashboard Vercel (CONSIGLIATO - apre browser)"
echo "2) 💻 CLI Vercel (richiede login)"
echo "3) 📋 Mostra solo istruzioni"
echo ""
read -p "Scelta (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Apertura Dashboard Vercel..."
        echo ""
        echo "Segui questi passaggi:"
        echo "1. Fai login su Vercel"
        echo "2. Clicca 'Import Project'"
        echo "3. Seleziona: lucamartello73/configuratorebungalow"
        echo "4. Aggiungi le 3 variabili d'ambiente"
        echo "5. Clicca Deploy"
        echo ""
        
        # Prova ad aprire il browser
        if command -v xdg-open &> /dev/null; then
            xdg-open "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flucamartello73%2Fconfiguratorbungalow&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY"
        elif command -v open &> /dev/null; then
            open "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flucamartello73%2Fconfiguratorbungalow&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY"
        else
            echo "Apri questo URL nel browser:"
            echo "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flucamartello73%2Fconfiguratorbungalow&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY"
        fi
        ;;
    2)
        echo ""
        echo "💻 Deployment via CLI..."
        echo ""
        
        # Verifica che vercel sia installato
        if ! command -v npx &> /dev/null; then
            echo "❌ npx non trovato - installa Node.js"
            exit 1
        fi
        
        echo "📦 Avvio Vercel CLI..."
        npx vercel --prod
        
        echo ""
        echo "✅ Deployment completato!"
        echo ""
        echo "📝 Ricordati di configurare le variabili d'ambiente su:"
        echo "   https://vercel.com/dashboard → tuo progetto → Settings → Environment Variables"
        ;;
    3)
        echo ""
        echo "📋 ISTRUZIONI DEPLOYMENT"
        echo "======================="
        echo ""
        echo "METODO 1: Dashboard Vercel"
        echo ""
        echo "1. Vai su: https://vercel.com/new/import"
        echo "2. Importa: lucamartello73/configuratorebungalow"
        echo "3. Aggiungi Environment Variables:"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_ROLE_KEY"
        echo "4. Deploy"
        echo ""
        echo "METODO 2: Vercel CLI"
        echo ""
        echo "$ npx vercel login"
        echo "$ npx vercel --prod"
        echo ""
        echo "Poi configura le variabili d'ambiente su Vercel Dashboard"
        echo ""
        echo "📖 Vedi DEPLOY_NOW.md per la guida completa"
        ;;
    *)
        echo "❌ Scelta non valida"
        exit 1
        ;;
esac

echo ""
echo "✨ Fatto! Il tuo sito sarà disponibile su Vercel tra pochi minuti."
echo ""
echo "📊 Monitora il deployment su: https://vercel.com/dashboard"
echo ""
