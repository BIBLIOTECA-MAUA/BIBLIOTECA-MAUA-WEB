import { Pessoa } from '../src/models/Pessoa.js';
import { db } from '../config/knex.js';
import { DatabaseSetup } from '../src/utils/databaseSetup.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Script de teste para o sistema de usuários
 */
class UserSystemTest {
  
  static async testDatabaseConnection() {
    try {
      console.log('🔌 Testando conexão com MySQL...');
      await db.raw('SELECT 1 as test');
      console.log('✅ MySQL conectado com sucesso!');
      
      return true;
    } catch (error) {
      console.error('❌ Erro na conexão MySQL:', error.message);
      return false;
    }
  }

  static async testDatabaseSetup() {
    try {
      console.log('\n🏗️ Testando setup do banco...');
      await DatabaseSetup.setupDatabase();
      console.log('✅ Setup do banco concluído!');
      
      return true;
    } catch (error) {
      console.error('❌ Erro no setup:', error.message);
      return false;
    }
  }

  static async testUserCreation() {
    try {
      console.log('\n👤 Testando criação de usuário...');
      
      const testData = {
        nomeReferencial: 'Teste Usuario',
        username: 'test_user_' + Date.now(),
        emailInstitucional: 'teste' + Date.now() + '@maua.br',
        documentoOficial: 'DOC123456',
        role: 'user',
        tipo: 'PF'
      };

      console.log('📝 Dados do teste:', testData);

      const pessoa = new Pessoa(
        testData.nomeReferencial,
        testData.username,
        testData.emailInstitucional,
        testData.documentoOficial, // Este será hasheado automaticamente
        testData.role,
        testData.tipo
      );

      console.log('🚀 Criando pessoa com profile...');
      const result = await pessoa.insertPessoaWithProfile();
      
      console.log('✅ Usuário criado com sucesso!');
      console.log('📊 Resultado:', {
        mysql_pessoa_id: result.sqlite.pessoa.idPessoa,
        mysql_account_id: result.sqlite.account?.idAccount || 'N/A',
        mongodb_profile_id: result.mongodb.profile._id.toString(),
        mongodb_user_id: result.mongodb.user._id.toString()
      });

      return result;
    } catch (error) {
      console.error('❌ Erro na criação do usuário:', error.message);
      return false;
    }
  }

  static async testUserLogin() {
    try {
      console.log('\n🔐 Testando busca de usuário para login...');
      
      // Buscar um usuário criado
      const users = await db('Pessoa')
        .select('*')
        .limit(1);

      if (users.length === 0) {
        console.log('⚠️ Nenhum usuário encontrado para testar login');
        return false;
      }

      const user = users[0];
      console.log('👤 Usuário encontrado:', {
        id: user.idPessoa,
        username: user.username,
        email: user.email_institucional,
        role: user.role
      });

      console.log('✅ Busca de usuário funcional!');
      return user;
    } catch (error) {
      console.error('❌ Erro na busca de usuário:', error.message);
      return false;
    }
  }

  static async testSyncToMongoDB() {
    try {
      console.log('\n🔄 Testando sincronização MySQL → MongoDB...');
      
      // Pegar um usuário do MySQL
      const mysqlUser = await db('Pessoa').select('*').first();
      
      if (!mysqlUser) {
        console.log('⚠️ Nenhum usuário MySQL encontrado para sincronizar');
        return false;
      }

      console.log('📤 Sincronizando usuário:', mysqlUser.email_institucional);
      
      const result = await Pessoa.syncSQLiteToMongoDB(mysqlUser.email_institucional);
      
      console.log('✅ Sincronização concluída!');
      console.log('📊 Status:', result.status);
      
      return result;
    } catch (error) {
      console.error('❌ Erro na sincronização:', error.message);
      return false;
    }
  }

  static async cleanupTestData() {
    try {
      console.log('\n🧹 Limpando dados de teste...');
      
      // Remover usuários de teste (que contêm 'test_user_' no username)
      const deletedCount = await db('Pessoa')
        .where('username', 'like', '%test_user_%')
        .del();
        
      if (deletedCount > 0) {
        console.log(`🗑️ ${deletedCount} usuário(s) de teste removido(s)`);
      } else {
        console.log('ℹ️ Nenhum usuário de teste encontrado para remoção');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erro na limpeza:', error.message);
      return false;
    }
  }

  static async runFullTest() {
    console.log('🧪 INICIANDO TESTES DO SISTEMA DE USUÁRIOS\n');
    console.log('=' .repeat(60));

    let testResults = [];

    // 1. Testar conexão
    const connectionOk = await this.testDatabaseConnection();
    testResults.push({ test: 'Database Connection', success: connectionOk });

    if (!connectionOk) {
      console.log('❌ Parando testes devido ao erro de conexão');
      return testResults;
    }

    // 2. Testar setup do banco
    const setupOk = await this.testDatabaseSetup();
    testResults.push({ test: 'Database Setup', success: setupOk });

    // 3. Testar criação de usuário
    const userCreated = await this.testUserCreation();
    testResults.push({ test: 'User Creation', success: !!userCreated });

    // 4. Testar busca de usuário
    const userFound = await this.testUserLogin();
    testResults.push({ test: 'User Search', success: !!userFound });

    // 5. Testar sincronização
    const syncOk = await this.testSyncToMongoDB();
    testResults.push({ test: 'MongoDB Sync', success: !!syncOk });

    // 6. Limpar dados de teste
    const cleanupOk = await this.cleanupTestData();
    testResults.push({ test: 'Cleanup', success: cleanupOk });

    // Resumo
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO DOS TESTES:');
    console.log('='.repeat(60));
    
    testResults.forEach(result => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.success ? 'PASSOU' : 'FALHOU'}`);
    });

    const successCount = testResults.filter(r => r.success).length;
    const totalTests = testResults.length;
    
    console.log('\n📈 Resultado geral:');
    console.log(`   ${successCount}/${totalTests} testes passaram`);
    
    if (successCount === totalTests) {
      console.log('🎉 TODOS OS TESTES PASSARAM! Sistema funcionando corretamente.');
    } else {
      console.log('⚠️ Alguns testes falharam. Verifique os erros acima.');
    }

    return testResults;
  }
}

// Executar se chamado diretamente
if (process.argv[1] === new URL(import.meta.url).pathname) {
  (async () => {
    try {
      await UserSystemTest.runFullTest();
      process.exit(0);
    } catch (error) {
      console.error('💥 Erro fatal nos testes:', error);
      process.exit(1);
    }
  })();
}

export { UserSystemTest };