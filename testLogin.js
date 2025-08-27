import fetch from 'node-fetch';

async function testLogin() {
  try {
    console.log('🧪 Testando login com "identify"...');
    
    let response = await fetch('http://localhost:9494/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identify: 'mariesimpsons',
        password: '100.000.000-22'
      })
    });
    
    let result = await response.json();
    
    console.log('📡 Status (identify):', response.status);
    console.log('📝 Resposta (identify):', JSON.stringify(result, null, 2));
    
    console.log('\n🧪 Testando login com "identifier"...');
    
    response = await fetch('http://localhost:9494/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: 'mariesimpsons',
        password: '100.000.000-22'
      })
    });
    
    result = await response.json();
    
    console.log('📡 Status (identifier):', response.status);
    console.log('📝 Resposta (identifier):', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Erro no teste de login:', error);
  }
}

testLogin();