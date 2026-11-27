// Teste de integração usando as APIs REST oficiais do Firebase.
// Não exige instalar SDK adicional nem salvar credenciais no código.

const required = [
  'FIREBASE_API_KEY',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_TEST_EMAIL',
  'FIREBASE_TEST_PASSWORD'
]; 

const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Secrets ausentes: ${missing.join(', ')}`);
  process.exit(1);
}

async function main() {
  const apiKey = process.env.FIREBASE_API_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const email = process.env.FIREBASE_TEST_EMAIL;
  const password = process.env.FIREBASE_TEST_PASSWORD;

  // 1) Autentica a conta de teste pelo Firebase Authentication.
  const loginResponse = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    }
  );
  const loginData = await loginResponse.json();
  if (!loginResponse.ok) {
    throw new Error(`Falha no Firebase Authentication: ${loginData.error?.message || loginResponse.status}`);
  }
  console.log('OK: usuário autenticado no Firebase Authentication.');

  // 2) Grava um campo de verificação no documento do próprio usuário.
  // As regras recomendadas permitem acesso somente a users/{uid} do usuário autenticado.
  const documentUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${loginData.localId}?updateMask.fieldPaths=ciCdTest`;
  const writeResponse = await fetch(documentUrl, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${loginData.idToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields: { ciCdTest: { stringValue: 'GitHub Actions OK' } } })
  });
  const writeData = await writeResponse.json();
  if (!writeResponse.ok) {
    throw new Error(`Falha ao gravar no Cloud Firestore: ${writeData.error?.message || writeResponse.status}`);
  }
  console.log('OK: dado gravado no Cloud Firestore.');

  // 3) Lê o documento e confirma o valor gravado.
  const readResponse = await fetch(documentUrl, {
    headers: { 'Authorization': `Bearer ${loginData.idToken}` }
  });
  const readData = await readResponse.json();
  if (!readResponse.ok) {
    throw new Error(`Falha ao ler do Cloud Firestore: ${readData.error?.message || readResponse.status}`);
  }
  const value = readData.fields?.ciCdTest?.stringValue;
  if (value !== 'GitHub Actions OK') {
    throw new Error('O valor retornado pelo Firestore não corresponde ao esperado.');
  }
  console.log('OK: dado lido e validado no Cloud Firestore.');
  console.log('Integração Firebase concluída com sucesso!');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
