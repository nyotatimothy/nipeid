import { PrismaClient, Role, DocumentType, DocumentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  // Create 5 admin users
  const adminUsers = [];
  for (let i = 1; i <= 5; i++) {
    const email = `admin${i}@nipeid.com`;
  const admin = await prisma.user.upsert({
      where: { email },
    update: {},
    create: {
        email,
        name: `Admin User ${i}`,
        password: await bcrypt.hash(`admin${i}@pass`, 10),
      role: Role.ADMIN,
        status: 'ACTIVE',
    },
  });
    adminUsers.push(admin);
  }

  // Create 5 poster users
  const posterUsers = [];
  for (let i = 1; i <= 5; i++) {
    const email = `poster${i}@nipeid.com`;
    const poster = await prisma.user.upsert({
      where: { email },
    update: {},
    create: {
        email,
        name: `Poster User ${i}`,
        password: await bcrypt.hash(`poster${i}@pass`, 10),
        role: Role.POSTER,
      status: 'ACTIVE',
    },
  });
    posterUsers.push(poster);
  }

  // Create 5 kiosk managers
  const kioskManagers = [];
  for (let i = 1; i <= 5; i++) {
    const email = `kioskmanager${i}@nipeid.com`;
    const manager = await prisma.user.upsert({
      where: { email },
    update: {},
    create: {
        email,
        name: `Kiosk Manager ${i}`,
        password: await bcrypt.hash(`kioskmanager${i}@pass`, 10),
        role: Role.KIOSK_MANAGER,
        status: 'ACTIVE',
    },
  });
    kioskManagers.push(manager);
  }

  // Create 10 regular users
  const regularUsers = [];
  for (let i = 1; i <= 10; i++) {
    const email = `user${i}@nipeid.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: `User ${i}`,
        password: await bcrypt.hash(`user${i}@pass`, 10),
        role: Role.USER,
        status: 'ACTIVE',
      },
    });
    regularUsers.push(user);
  }

  // Create 10 kiosks
  const kioskLocations = [
    'Nairobi CBD', 'Westlands', 'Kasarani', 'Karen', 'Eastleigh',
    'Mombasa Island', 'Kisumu Center', 'Eldoret Town', 'Thika Road', 'Machakos Bus Park'
  ];
  const kiosks = [];
  for (let i = 0; i < 10; i++) {
    const kiosk = await prisma.kiosk.upsert({
      where: { id: `kiosk-id-${i + 1}` },
      update: {},
      create: {
        id: `kiosk-id-${i + 1}`,
        name: `Kiosk ${i + 1}`,
        location: kioskLocations[i],
      },
    });
    kiosks.push(kiosk);
  }

  // Create 20 documents with various statuses
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Chris', 'Anna', 'Brian', 'Linda', 'Peter', 'Grace', 'Paul', 'Diana', 'Kevin', 'Alice', 'George', 'Ruth', 'Victor', 'Mary'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez'];
  const docTypes = [DocumentType.NATIONAL_ID, DocumentType.PASSPORT, DocumentType.DRIVING_LICENSE, DocumentType.BIRTH_CERTIFICATE, DocumentType.OTHER];
  const statuses = [
    DocumentStatus.UPLOADED,
    DocumentStatus.AWAITING_KIOSK_ACK,
    DocumentStatus.KIOSK_CONFIRMED,
    DocumentStatus.CLAIMED,
    DocumentStatus.DISPATCHED,
    DocumentStatus.ARCHIVED
  ];

  for (let i = 0; i < 20; i++) {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const documentType = randomFrom(docTypes);
    const status = randomFrom(statuses);
    const kiosk = randomFrom(kiosks);
    const poster = randomFrom(posterUsers);
    const documentNumber = `${documentType.substring(0,2).toUpperCase()}${Math.floor(100000 + Math.random() * 900000)}`;
    await prisma.document.create({
      data: {
        firstName,
        lastName,
        documentNumber,
        documentType,
        status,
        kioskId: kiosk.id,
        posterId: poster.id,
      },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 