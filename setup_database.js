const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Credenziali Supabase
const supabaseUrl = 'https://cebmwjipqqgnzwrvijlu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlYm13amlwcXFnbnp3cnZpamx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE5ODEyMCwiZXhwIjoyMDc4Nzc0MTIwfQ.vVVOARIJh0UMkEpoaxpVrrwyVxMhB0V-du1oyCzR0s4';

const supabase = createClient(supabaseUrl, supabaseKey);

const sql = fs.readFileSync('/tmp/setup_db.sql', 'utf8');

// Dividi in statement separati
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

async function setupDatabase() {
  console.log('🚀 Inizio setup database...\n');
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    if (stmt.length < 10) continue;
    
    console.log(`Executing statement ${i + 1}/${statements.length}...`);
    
    try {
      const { data, error } = await supabase.rpc('exec', { query: stmt });
      if (error) {
        console.log(`⚠️  Statement ${i + 1}: ${error.message.substring(0, 100)}`);
      } else {
        console.log(`✅ Statement ${i + 1}: OK`);
      }
    } catch (e) {
      console.log(`⚠️  Statement ${i + 1}: ${e.message.substring(0, 100)}`);
    }
  }
  
  // Verifica tabelle create
  console.log('\n📊 Verifica tabelle...');
  const { data: modelli, error: err1 } = await supabase
    .from('modelli_standard')
    .select('count');
  
  const { data: config, error: err2 } = await supabase
    .from('configurazioni_custom')
    .select('count');
  
  if (!err1) console.log(`✅ modelli_standard: ${modelli.length || 0} righe`);
  if (!err2) console.log(`✅ configurazioni_custom: ${config.length || 0} righe`);
  
  console.log('\n✅ Setup completato!');
}

setupDatabase().catch(console.error);
