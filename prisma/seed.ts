import { PrismaClient, Role, DocumentType, DocumentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const locations = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', 'Thika',
  'Machakos', 'Nakuru', 'Naivasha', 'Kitale', 'Garissa'
];
const districts = [
  'Central', 'Eastern', 'Western', 'Nyanza', 'Rift Valley',
  'Coast', 'Nairobi', 'North Eastern', 'Upper Eastern', 'Lower Eastern'
];
const divisions = [
  'Division A', 'Division B', 'Division C', 'Division D', 'Division E'
];
const subLocations = [
  'SubLoc 1', 'SubLoc 2', 'SubLoc 3', 'SubLoc 4', 'SubLoc 5'
];
const conditions = ['GOOD', 'MEDIUM', 'BAD'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateOfBirth() {
  const start = new Date(1970, 0, 1).getTime();
  const end = new Date(2005, 0, 1).getTime();
  return new Date(start + Math.random() * (end - start));
}

function randomDateFound() {
  const start = new Date(2020, 0, 1).getTime();
  const end = Date.now();
  return new Date(start + Math.random() * (end - start));
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
        phone: `0700${String(100000 + i).slice(0,6)}`
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
        dateOfBirth: randomDateOfBirth(),
      },
    });
  }

  // Add 10 more lost documents for testing
  for (let i = 0; i < 10; i++) {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const documentType = randomFrom(docTypes);
    const status = DocumentStatus.UPLOADED;
    const kiosk = randomFrom(kiosks);
    const poster = randomFrom(posterUsers);
    const documentNumber = `${documentType.substring(0,2).toUpperCase()}${Math.floor(200000 + Math.random() * 800000)}`;
    await prisma.document.create({
      data: {
        firstName,
        lastName,
        documentNumber,
        documentType,
        status,
        kioskId: kiosk.id,
        posterId: poster.id,
        dateOfBirth: randomDateOfBirth(),
      },
    });
  }

  // Assign claimed and reported documents to at least 2 users
  const testUser1 = regularUsers[0];
  const testUser2 = regularUsers[1];
  // Create 2 documents claimed by testUser1
  for (let i = 0; i < 2; i++) {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const documentType = randomFrom(docTypes);
    const kiosk = randomFrom(kiosks);
    const poster = randomFrom(posterUsers);
    const documentNumber = `${documentType.substring(0,2).toUpperCase()}${Math.floor(300000 + Math.random() * 700000)}`;
    const doc = await prisma.document.create({
      data: {
        firstName,
        lastName,
        documentNumber,
        documentType,
        status: DocumentStatus.CLAIMED,
        kioskId: kiosk.id,
        posterId: poster.id,
        dateOfBirth: randomDateOfBirth(),
      },
    });
    await prisma.documentStatusHistory.create({
      data: {
        document: { connect: { id: doc.id } },
        user: { connect: { id: testUser1.id } },
        status: 'CLAIMED',
      },
    });
  }
  // Create 2 documents reported by testUser2
  for (let i = 0; i < 2; i++) {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const documentType = randomFrom(docTypes);
    const kiosk = randomFrom(kiosks);
    const documentNumber = `${documentType.substring(0,2).toUpperCase()}${Math.floor(400000 + Math.random() * 600000)}`;
    await prisma.document.create({
      data: {
        firstName,
        lastName,
        documentNumber,
        documentType,
        status: DocumentStatus.UPLOADED,
        kioskId: kiosk.id,
        posterId: testUser2.id,
        dateOfBirth: randomDateOfBirth(),
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