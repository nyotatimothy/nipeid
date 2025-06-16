const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_PHONE = '254700000000'; // Test phone number
const TEST_AMOUNT = 50;

// Test data
const testDocument = {
  id: 'test-doc-123',
  documentNumber: 'TEST123456',
  documentType: 'NATIONAL_ID',
  firstName: 'John',
  lastName: 'Doe'
};

async function testPaymentEndpoints() {
  console.log('🚀 Testing M-Pesa Payment Endpoints\n');

  try {
    // Test 1: Payment Initiation
    console.log('1. Testing Payment Initiation...');
    const initiateResponse = await axios.post(`${BASE_URL}/api/payments/initiate`, {
      documentId: testDocument.id,
      phoneNumber: TEST_PHONE,
      amount: TEST_AMOUNT
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Note: In a real test, you'd need to include authentication headers
      }
    });

    console.log('✅ Payment Initiation Response:', initiateResponse.data);

    if (initiateResponse.data.success) {
      const paymentId = initiateResponse.data.paymentId;
      const checkoutRequestId = initiateResponse.data.checkoutRequestId;

      // Test 2: Payment Status Check
      console.log('\n2. Testing Payment Status Check...');
      const statusResponse = await axios.post(`${BASE_URL}/api/payments/status`, {
        paymentId: paymentId
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('✅ Payment Status Response:', statusResponse.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Test M-Pesa service directly
async function testMpesaService() {
  console.log('\n🔧 Testing M-Pesa Service Directly...\n');

  try {
    // This would test the M-Pesa service without going through the API
    // You'd need to import the service and test it directly
    console.log('Note: Direct service testing requires proper M-Pesa credentials');
  } catch (error) {
    console.error('❌ M-Pesa service test failed:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🧪 M-Pesa Integration Test Suite\n');
  console.log('=====================================\n');

  await testPaymentEndpoints();
  await testMpesaService();

  console.log('\n=====================================');
  console.log('✅ Test suite completed!');
}

// Run the tests
runTests().catch(console.error); 