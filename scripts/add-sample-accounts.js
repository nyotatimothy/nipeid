// Script to add sample accounts to the database
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to add sample accounts...');

  try {
    // Hash passwords
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const userPassword = await bcrypt.hash('User@123', 10);
    const kioskPassword = await bcrypt.hash('Kiosk@123', 10);
    const posterPassword = await bcrypt.hash('Poster@123', 10);

    // Create Admin Account
    const admin = await prisma.user.upsert({
      where: { email: 'admin@myidapp.com' },
      update: {
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
      create: {
        email: 'admin@myidapp.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log(`Admin account created: ${admin.email}`);

    // Create Regular User Account
    const user = await prisma.user.upsert({
      where: { email: 'user@myidapp.com' },
      update: {
        name: 'Regular User',
        password: userPassword,
        role: 'USER',
      },
      create: {
        email: 'user@myidapp.com',
        name: 'Regular User',
        password: userPassword,
        role: 'USER',
      },
    });
    console.log(`User account created: ${user.email}`);

    // Create Kiosk Manager Account
    const kioskManager = await prisma.user.upsert({
      where: { email: 'kiosk@myidapp.com' },
      update: {
        name: 'Kiosk Manager',
        password: kioskPassword,
        role: 'KIOSK_MANAGER',
      },
      create: {
        email: 'kiosk@myidapp.com',
        name: 'Kiosk Manager',
        password: kioskPassword,
        role: 'KIOSK_MANAGER',
      },
    });
    console.log(`Kiosk Manager account created: ${kioskManager.email}`);

    // Create a kiosk for the kiosk manager
    const kiosk = await prisma.kiosk.upsert({
      where: { name: 'Central Kiosk' },
      update: {
        location: 'Nairobi CBD',
        address: 'Kenyatta Avenue, Nairobi',
        contactPhone: '+254712345678',
        managerId: kioskManager.id,
      },
      create: {
        name: 'Central Kiosk',
        location: 'Nairobi CBD',
        address: 'Kenyatta Avenue, Nairobi',
        contactPhone: '+254712345678',
        managerId: kioskManager.id,
      },
    });
    console.log(`Kiosk created: ${kiosk.name}`);

    // Create Document Poster Account
    const poster = await prisma.user.upsert({
      where: { email: 'poster@myidapp.com' },
      update: {
        name: 'Document Poster',
        password: posterPassword,
        role: 'POSTER',
      },
      create: {
        email: 'poster@myidapp.com',
        name: 'Document Poster',
        password: posterPassword,
        role: 'POSTER',
      },
    });
    console.log(`Document Poster account created: ${poster.email}`);

    console.log('Sample accounts added successfully!');
    console.log('\nLogin Credentials:');
    console.log('------------------');
    console.log('Admin:');
    console.log('  Email: admin@myidapp.com');
    console.log('  Password: Admin@123');
    console.log('  Role: Admin');
    console.log('\nRegular User:');
    console.log('  Email: user@myidapp.com');
    console.log('  Password: User@123');
    console.log('  Role: User');
    console.log('\nKiosk Manager:');
    console.log('  Email: kiosk@myidapp.com');
    console.log('  Password: Kiosk@123');
    console.log('  Role: Kiosk Manager');
    console.log('\nDocument Poster:');
    console.log('  Email: poster@myidapp.com');
    console.log('  Password: Poster@123');
    console.log('  Role: Poster');

  } catch (error) {
    console.error('Error adding sample accounts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
