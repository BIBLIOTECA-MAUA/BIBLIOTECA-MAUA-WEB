import { db } from './config/knex.js';

async function checkTables() {
  try {
    console.log('🔍 Verificando tabelas existentes...');
    const tables = await db.raw("SHOW TABLES");
    console.log('📊 Tabelas encontradas:', tables[0]);
    
    // Verificar estrutura da tabela que existe
    for (const table of tables[0]) {
      const tableName = Object.values(table)[0];
      console.log(`\n📋 Estrutura da tabela ${tableName}:`);
      const structure = await db.raw(`DESCRIBE ${tableName}`);
      console.table(structure[0]);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

checkTables();