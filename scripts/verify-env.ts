import fetch from 'node-fetch';

const environments = [
  {
    name: 'Production',
    url: 'https://www.nipeid.com',
    apiUrl: 'https://www.nipeid.com/api'
  },
  {
    name: 'Staging/PPE',
    url: 'https://ppe.nipeid.com',
    apiUrl: 'https://ppe.nipeid.com/api'
  },
  {
    name: 'Test',
    url: 'https://test.nipeid.com',
    apiUrl: 'https://test.nipeid.com/api'
  }
];

async function verifyEnvironment(env: typeof environments[0]) {
  console.log(`\nVerifying ${env.name} environment...`);
  
  try {
    // Check main URL
    console.log(`Checking ${env.url}...`);
    const mainRes = await fetch(env.url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log(`✓ Main URL (${env.url}): ${mainRes.status} ${mainRes.statusText}`);
    
    // Check API URL
    console.log(`Checking API health...`);
    const apiHealthCheck = `${env.apiUrl}/health`;
    const apiRes = await fetch(apiHealthCheck, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log(`✓ API URL (${apiHealthCheck}): ${apiRes.status} ${apiRes.statusText}`);
    
    // Check authentication endpoint
    console.log(`Checking auth providers...`);
    const authUrl = `${env.apiUrl}/auth/providers`;
    const authRes = await fetch(authUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log(`✓ Auth endpoint (${authUrl}): ${authRes.status} ${authRes.statusText}`);
    
  } catch (error: any) {
    console.error(`✗ Error checking ${env.name}:`, error?.message || 'Unknown error');
  }
}

async function main() {
  console.log('Starting environment verification...');
  
  for (const env of environments) {
    await verifyEnvironment(env);
  }
  
  console.log('\nVerification complete!');
}

main().catch((error: any) => {
  console.error('Fatal error:', error?.message || 'Unknown error');
  process.exit(1);
}); 