console.log('🧪 Iniciando teste de login...');

// Simular a requisição manualmente para debug
const testData1 = {
  identify: 'mariesimpsons',
  password: '100.000.000-22'
};

const testData2 = {
  identifier: 'mariesimpsons', 
  password: '100.000.000-22'
};

console.log('📝 Dados de teste 1 (identify):', JSON.stringify(testData1, null, 2));
console.log('📝 Dados de teste 2 (identifier):', JSON.stringify(testData2, null, 2));

// Vamos testar usando http nativo do Node.js
import http from 'http';

function makeRequest(data, label) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 9494,
      path: '/auth/sign-in',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log(`\n🚀 Fazendo requisição ${label}...`);
    
    const req = http.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        console.log(`📡 Status ${label}:`, res.statusCode);
        try {
          const parsedResponse = JSON.parse(responseBody);
          console.log(`📝 Resposta ${label}:`, JSON.stringify(parsedResponse, null, 2));
        } catch (e) {
          console.log(`📝 Resposta raw ${label}:`, responseBody);
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Erro ${label}:`, error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  try {
    await makeRequest(testData1, 'com identify');
    await makeRequest(testData2, 'com identifier');
    console.log('\n✅ Testes concluídos!');
  } catch (error) {
    console.error('❌ Erro nos testes:', error);
  }
}

runTests();