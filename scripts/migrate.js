require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration(filePath) {
  try {
    const sql = await fs.readFile(filePath, 'utf8');
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error(`Error running migration ${filePath}:`, error);
      throw error;
    }
    
    console.log(`Successfully ran migration: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Failed to run migration ${filePath}:`, error);
    throw error;
  }
}

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, '../supabase/migrations');
    const files = await fs.readdir(migrationsDir);
    
    // Sort files to ensure they run in order
    const migrationFiles = files
      .filter(f => f.endsWith('.sql'))
      .sort();
    
    console.log('Running migrations...');
    
    for (const file of migrationFiles) {
      await runMigration(path.join(migrationsDir, file));
    }
    
    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 