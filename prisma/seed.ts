import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Kiosks
  const kiosk1 = await prisma.kiosk.upsert({
    where: { name: 'Central Kiosk' },
    update: {},
    create: {
      name: 'Central Kiosk',
      location: 'Nairobi CBD',
      phone: '+254700000001',
      hours: '8am-6pm',
    },
  });
  const kiosk2 = await prisma.kiosk.upsert({
    where: { name: 'Westlands Kiosk' },
    update: {},
    create: {
      name: 'Westlands Kiosk',
      location: 'Westlands',
      phone: '+254700000002',
      hours: '9am-5pm',
    },
  });

  // Create Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@myid.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@myid.com',
      role: 'ADMIN',
    },
  });
  const manager = await prisma.user.upsert({
    where: { email: 'manager@myid.com' },
    update: {},
    create: {
      name: 'Kiosk Manager',
      email: 'manager@myid.com',
      role: 'KIOSK_MANAGER',
      managedKiosks: { connect: { id: kiosk1.id } },
    },
  });
  const poster = await prisma.user.upsert({
    where: { email: 'poster@myid.com' },
    update: {},
    create: {
      name: 'Poster User',
      email: 'poster@myid.com',
      role: 'POSTER',
    },
  });
  const user = await prisma.user.upsert({
    where: { email: 'user@myid.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@myid.com',
      role: 'USER',
    },
  });

  // Create Documents
  await prisma.document.createMany({
    data: [
      {
        firstName: 'Timothy',
        middleName: 'Chege',
        lastName: 'Nyottah',
        dateOfBirth: new Date('1990-01-01'),
        documentNumber: '24112039',
        foundLocation: 'Nairobi CBD',
        foundDistrict: 'Nairobi',
        foundDivision: 'Central',
        foundSubLocation: 'Moi Avenue',
        dateFound: new Date('2024-05-01'),
        condition: 'GOOD',
        kioskId: kiosk1.id,
        posterId: poster.id,
        status: 'UPLOADED',
      },
      {
        firstName: 'Mary',
        middleName: 'Kinya',
        lastName: 'Kimani',
        dateOfBirth: new Date('1985-06-15'),
        documentNumber: '12007878',
        foundLocation: 'Westlands',
        foundDistrict: 'Nairobi',
        foundDivision: 'Westlands',
        foundSubLocation: 'Sarit Centre',
        dateFound: new Date('2024-04-20'),
        condition: 'MEDIUM',
        kioskId: kiosk2.id,
        posterId: poster.id,
        status: 'AWAITING_KIOSK_ACK',
      },
      {
        firstName: 'John',
        middleName: 'Mwangi',
        lastName: 'Otieno',
        dateOfBirth: new Date('1992-11-11'),
        documentNumber: '99887766',
        foundLocation: 'Nairobi CBD',
        foundDistrict: 'Nairobi',
        foundDivision: 'Central',
        foundSubLocation: 'Tom Mboya',
        dateFound: new Date('2024-03-10'),
        condition: 'BAD',
        kioskId: kiosk1.id,
        posterId: poster.id,
        status: 'KIOSK_CONFIRMED',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeded users, kiosks, and documents!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect()); 