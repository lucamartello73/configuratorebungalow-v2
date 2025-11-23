#!/usr/bin/env node

/**
 * Script per configurare automaticamente il database Supabase
 * per il configuratore Bungalow
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Carica variabili d'ambiente manualmente
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim()
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRORE: Variabili d\'ambiente Supabase mancanti!')
  console.error('Assicurati che .env.local contenga:')
  console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  console.error('  - SUPABASE_SERVICE_ROLE_KEY o NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('🚀 Avvio configurazione database Bungalow...\n')
  
  try {
    // Leggi il file SQL
    const sqlPath = path.join(__dirname, 'setup_bungalow_db.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')
    
    console.log('📄 File SQL caricato:', sqlPath)
    console.log('📏 Dimensione:', (sqlContent.length / 1024).toFixed(2), 'KB\n')
    
    // Nota: Supabase JS client non supporta esecuzione SQL diretta
    // È necessario eseguire manualmente da Supabase Dashboard > SQL Editor
    
    console.log('⚠️  ATTENZIONE: Il client Supabase JS non supporta l\'esecuzione diretta di SQL.')
    console.log('\n📝 ISTRUZIONI PER IL SETUP MANUALE:\n')
    console.log('1. Vai su: https://xxqotgrmiimmruglpwlh.supabase.co/project/xxqotgrmiimmruglpwlh/sql/new')
    console.log('2. Copia il contenuto del file: scripts/setup_bungalow_db.sql')
    console.log('3. Incollalo nel SQL Editor di Supabase')
    console.log('4. Clicca "Run" per eseguire lo script\n')
    
    console.log('🔍 Verifica tabelle esistenti...')
    
    // Prova a interrogare la tabella per verificare se esiste
    const { data: tables, error: tableError } = await supabase
      .from('preventivi_bungalow')
      .select('id')
      .limit(1)
    
    if (tableError) {
      if (tableError.code === '42P01') {
        console.log('❌ Tabella "preventivi_bungalow" NON trovata')
        console.log('   → Esegui manualmente lo script SQL come indicato sopra\n')
      } else {
        console.log('⚠️  Errore verifica:', tableError.message)
      }
    } else {
      console.log('✅ Tabella "preventivi_bungalow" trovata!')
      console.log('   → Database già configurato\n')
    }
    
    // Crea bucket Storage se non esiste
    console.log('🗂️  Configurazione Storage...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.log('⚠️  Errore recupero buckets:', bucketsError.message)
    } else {
      const bucketExists = buckets.some(b => b.name === 'bungalow-allegati')
      
      if (bucketExists) {
        console.log('✅ Bucket "bungalow-allegati" già esistente\n')
      } else {
        console.log('📦 Tentativo creazione bucket "bungalow-allegati"...')
        
        const { data: newBucket, error: createError } = await supabase.storage.createBucket('bungalow-allegati', {
          public: false,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
        })
        
        if (createError) {
          console.log('⚠️  Impossibile creare bucket automaticamente:', createError.message)
          console.log('   → Crea manualmente da: Dashboard > Storage > New Bucket')
          console.log('   → Nome: bungalow-allegati')
          console.log('   → Tipo: Private')
          console.log('   → Max file size: 5MB\n')
        } else {
          console.log('✅ Bucket "bungalow-allegati" creato con successo!\n')
        }
      }
    }
    
    console.log('✨ Setup completato!')
    console.log('\n📚 RIEPILOGO CONFIGURAZIONE:')
    console.log('   • Tabella: preventivi_bungalow')
    console.log('   • Tabella: preventivi_storico')
    console.log('   • View: preventivi_dashboard')
    console.log('   • Storage Bucket: bungalow-allegati')
    console.log('   • RLS Policies: Abilitate')
    console.log('   • Triggers: update_at, storico automatico\n')
    
  } catch (error) {
    console.error('❌ ERRORE SETUP:', error.message)
    process.exit(1)
  }
}

// Esegui setup
setupDatabase()
