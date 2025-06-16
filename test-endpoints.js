// Simple test script for M-Pesa endpoints
const BASE_URL = 'http://localhost:3000';

async function testEndpoint(url, data, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log(`📍 URL: ${url}`);
  console.log(`📤 Data:`, JSON.stringify(data, null, 2));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    console.log(`📊 Status: ${response.status}`);
    console.log(`📥 Response:`, JSON.stringify(result, null, 2));
    
    return { success: response.ok, data: result, status: response.status };
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 M-Pesa Payment Endpoints Test Suite');
  console.log('=====================================\n');

  // Test 1: Payment Initiation (Test Mode)
  const testPaymentData = {
    documentId: 'test-doc-001',
    phoneNumber: '254700000000',
    amount: 50,
    testMode: true
  };

  const paymentResult = await testEndpoint(
    `${BASE_URL}/api/test-payment`,
    testPaymentData,
    'Payment Initiation (Test Mode)'
  );

  if (paymentResult.success && paymentResult.data.paymentId) {
    // Test 2: Payment Status Check
    await testEndpoint(
      `${BASE_URL}/api/payments/status`,
      { paymentId: paymentResult.data.paymentId },
      'Payment Status Check'
    );

    // Test 3: Test with different phone number formats
    const phoneFormats = [
      '0700000000',
      '+254700000000',
      '254700000000'
    ];

    for (const phone of phoneFormats) {
      await testEndpoint(
        `${BASE_URL}/api/test-payment`,
        {
          documentId: `test-doc-${phone}`,
          phoneNumber: phone,
          amount: 50,
          testMode: true
        },
        `Payment Initiation with phone format: ${phone}`
      );
    }

    // Test 4: Test error cases
    await testEndpoint(
      `${BASE_URL}/api/test-payment`,
      { documentId: 'test-doc-001' }, // Missing phone number
      'Payment Initiation - Missing Phone Number (Should Fail)'
    );

    await testEndpoint(
      `${BASE_URL}/api/test-payment`,
      { 
        documentId: 'test-doc-001',
        phoneNumber: 'invalid-phone' // Invalid phone number
      },
      'Payment Initiation - Invalid Phone Number (Should Fail)'
    );
  }

  console.log('\n=====================================');
  console.log('✅ Test suite completed!');
}

// Run the tests
runTests().catch(console.error); 