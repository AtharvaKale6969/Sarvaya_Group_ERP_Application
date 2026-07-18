const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) acc[key.trim()] = rest.join('=').trim().replace(/^['"`]|['"`]$/g, '');
  return acc;
}, {});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data: bde } = await supabase.from('rmt_bde_calls').select('id, company_name, status, is_trashed');
  const { data: clients } = await supabase.from('rmt_clients').select('id, original_lead_id, company_name, status');
  
  fs.writeFileSync('db_dump.json', JSON.stringify({ bde, clients }, null, 2));
  console.log('Dumped to db_dump.json');
}
run();
