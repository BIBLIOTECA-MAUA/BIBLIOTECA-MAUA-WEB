import { db } from './config/knex.js';

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuários no banco...');
    
    const users = await db('Pessoa').select('*');
    console.log(`📊 Total de usuários: ${users.length}`);
    
    if (users.length > 0) {
      console.log('\n👤 Usuários encontrados:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.username} - ${user.email_institucional}`);
      });
      
      console.log('\n📝 Primeiro usuário completo:');
      console.log(JSON.stringify(users[0], null, 2));
    } else {
      console.log('⚠️ Nenhum usuário encontrado no banco');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar usuários:', error);
  } finally {
    process.exit(0);
  }
}

checkUsers();