// Script to set up the test environment by running all setup scripts
const { execSync } = require('child_process');
const path = require('path');

console.log('Setting up test environment...');

try {
  // Run database migrations
  console.log('\n1. Running database migrations...');
  execSync('npx prisma migrate dev', { stdio: 'inherit' });
  
  // Add sample accounts
  console.log('\n2. Adding sample accounts...');
  execSync('node scripts/add-sample-accounts.js', { stdio: 'inherit' });
  
  // Seed test data
  console.log('\n3. Seeding test data...');
  execSync('node scripts/seed-test-data.js', { stdio: 'inherit' });
  
  console.log('\nTest environment setup complete!');
  console.log('\nYou can now log in with the following accounts:');
  console.log('------------------');
  console.log('Admin:');
  console.log('  Email: admin@myidapp.com');
  console.log('  Password: Admin@123');
  console.log('\nRegular User:');
  console.log('  Email: user@myidapp.com');
  console.log('  Password: User@123');
  console.log('\nKiosk Manager:');
  console.log('  Email: kiosk@myidapp.com');
  console.log('  Password: Kiosk@123');
  console.log('\nDocument Poster:');
  console.log('  Email: poster@myidapp.com');
  console.log('  Password: Poster@123');
  
} catch (error) {
  console.error('Error setting up test environment:', error);
  process.exit(1);
}
