import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.document.deleteMany();
  await prisma.kiosk.deleteMany();
  await prisma.user.deleteMany();

  // Create users with different roles
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@myid.com',
      name: 'Admin User',
      password: await hash('admin123', 12),
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const kioskManager = await prisma.user.create({
    data: {
      email: 'kiosk@myid.com',
      name: 'Kiosk Manager',
      password: await hash('kiosk123', 12),
      role: 'KIOSK_MANAGER',
      status: 'ACTIVE',
    },
  });

  const posterUser = await prisma.user.create({
    data: {
      email: 'poster@myid.com',
      name: 'Document Poster',
      password: await hash('poster123', 12),
      role: 'POSTER',
      status: 'ACTIVE',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@myid.com',
      name: 'Regular User',
      password: await hash('user123', 12),
      role: 'USER',
      status: 'ACTIVE',
    },
  });

  // Create kiosks in different locations
  const kiosks = await Promise.all([
    prisma.kiosk.create({
        data: {
        name: 'CBD Central Kiosk',
        location: 'Tom Mboya Street, Opposite Kencom House',
        phone: '+254700123456',
        email: 'cbd@myid.com',
        status: 'ACTIVE',
        contactPerson: 'John Doe',
        managers: {
          connect: { id: kioskManager.id }
        }
      },
    }),
    prisma.kiosk.create({
      data: {
        name: 'Westlands Kiosk',
        location: 'The Mall, Westlands',
        phone: '+254700123457',
        email: 'westlands@myid.com',
        status: 'ACTIVE',
        contactPerson: 'Jane Smith',
        managers: {
          connect: { id: kioskManager.id }
        }
      },
    }),
    prisma.kiosk.create({
        data: {
        name: 'Eastleigh Kiosk',
        location: 'Eastleigh Mall, First Avenue',
        phone: '+254700123458',
        email: 'eastleigh@myid.com',
        status: 'ACTIVE',
        contactPerson: 'Mohammed Ali',
          managers: {
          connect: { id: kioskManager.id }
          }
      },
    }),
  ]);

  // Create documents with various statuses
  const documents = await Promise.all([
    // National IDs
    prisma.document.create({
      data: {
        firstName: 'John',
        lastName: 'Kamau',
        documentNumber: '12345678',
        documentType: 'NATIONAL_ID',
        dateFound: new Date('2024-01-15'),
        dateOfBirth: new Date('1990-01-01'),
        foundLocation: 'Tom Mboya Street, Opposite Kencom House',
        foundDistrict: 'Nairobi CBD',
        foundDivision: 'Central',
        foundSubLocation: 'City Center',
        kioskId: kiosks[0].id,
        posterId: posterUser.id,
        status: 'UPLOADED',
        condition: 'GOOD',
      },
    }),
    prisma.document.create({
      data: {
        firstName: 'Mary',
        lastName: 'Wanjiku',
        documentNumber: '23456789',
        documentType: 'NATIONAL_ID',
        dateFound: new Date('2024-01-16'),
        dateOfBirth: new Date('1992-05-15'),
        foundLocation: 'The Mall, Westlands',
        foundDistrict: 'Westlands',
        foundDivision: 'West',
        foundSubLocation: 'Westlands',
        kioskId: kiosks[1].id,
        posterId: posterUser.id,
        status: 'KIOSK_CONFIRMED',
        condition: 'MEDIUM',
      },
    }),

    // Passports
    prisma.document.create({
      data: {
        firstName: 'James',
        lastName: 'Omondi',
        documentNumber: 'A12345678',
        documentType: 'PASSPORT',
        dateFound: new Date('2024-01-17'),
        dateOfBirth: new Date('1988-12-10'),
        foundLocation: 'Eastleigh Mall, First Avenue',
        foundDistrict: 'Eastleigh',
        foundDivision: 'East',
        foundSubLocation: 'Section 3',
        kioskId: kiosks[2].id,
        posterId: posterUser.id,
        status: 'UPLOADED',
        condition: 'GOOD',
      },
    }),

    // Driving Licenses
    prisma.document.create({
      data: {
        firstName: 'Peter',
        lastName: 'Kipchoge',
        documentNumber: 'DL123456',
        documentType: 'DRIVING_LICENSE',
        dateFound: new Date('2024-01-18'),
        dateOfBirth: new Date('1995-08-20'),
        foundLocation: 'Tom Mboya Street, Opposite Kencom House',
        foundDistrict: 'Nairobi CBD',
        foundDivision: 'Central',
        foundSubLocation: 'City Center',
        kioskId: kiosks[0].id,
        posterId: posterUser.id,
        status: 'CLAIMED',
        condition: 'GOOD',
        claimedById: regularUser.id,
      },
    }),

    // Birth Certificates
    prisma.document.create({
      data: {
        firstName: 'Sarah',
        lastName: 'Adhiambo',
        documentNumber: 'BC123456',
        documentType: 'BIRTH_CERTIFICATE',
        dateFound: new Date('2024-01-19'),
        dateOfBirth: new Date('2020-03-15'),
        foundLocation: 'The Mall, Westlands',
        foundDistrict: 'Westlands',
        foundDivision: 'West',
        foundSubLocation: 'Westlands',
        kioskId: kiosks[1].id,
        posterId: posterUser.id,
        status: 'UPLOADED',
        condition: 'GOOD',
      },
    }),
  ]);

  console.log('Seed data created successfully!');
  console.log('Sample user credentials:');
  console.log('Admin:', { email: 'admin@myid.com', password: 'admin123' });
  console.log('Kiosk Manager:', { email: 'kiosk@myid.com', password: 'kiosk123' });
  console.log('Poster:', { email: 'poster@myid.com', password: 'poster123' });
  console.log('Regular User:', { email: 'user@myid.com', password: 'user123' });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 