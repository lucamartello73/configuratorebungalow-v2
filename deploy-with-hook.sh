#!/bin/bash
# Script per deploy automatico su Vercel tramite Deploy Hook

set -e

echo "🚀 Deploy Automatico - Vercel + GitHub"
echo "======================================"
echo ""

# 1. Push su GitHub
echo "📤 Push su GitHub..."
git push origin main
echo "✅ Push completato!"
echo ""

# 2. Triggera Deploy Hook Vercel
echo "🔔 Triggero deploy su Vercel..."
DEPLOY_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/prj_gD6g83GccjB0gtxzKEwoqtY746yW/IneDOIMarS"

RESPONSE=$(curl -s -X POST "$DEPLOY_HOOK_URL")
echo "📊 Risposta Vercel:"
echo "$RESPONSE" | python3 -m json.tool || echo "$RESPONSE"
echo ""

# 3. Estrai Job ID
JOB_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$JOB_ID" ]; then
    echo "✅ Deploy triggerato con successo!"
    echo "🆔 Job ID: $JOB_ID"
    echo ""
    echo "🔍 Monitora il deploy su:"
    echo "   https://vercel.com/dashboard"
    echo ""
    echo "⏱️  Tempo stimato: 2-3 minuti"
else
    echo "⚠️  Errore: non è stato possibile triggerare il deploy"
    exit 1
fi

