import { PrismaClient, Role, DocumentType, Condition, DocumentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin@nipeid.com', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nipeid.com' },
    update: {},
    create: {
      email: 'admin@nipeid.com',
      name: 'System Admin',
      password: hashedPassword,
      role: Role.ADMIN,
      status: 'ACTIVE'
    },
  });

  // Create a test kiosk
  const kiosk = await prisma.kiosk.upsert({
    where: { name: 'Central Kiosk' },
    update: {},
    create: {
      name: 'Central Kiosk',
      location: 'Nairobi CBD',
      phone: '+254700000000',
      email: 'central@nipeid.com',
      status: 'ACTIVE',
      address: 'Moi Avenue',
      city: 'Nairobi',
      county: 'Nairobi',
      latitude: -1.2921,
      longitude: 36.8219,
    },
  });

  // Create a test poster user
  const poster = await prisma.user.upsert({
    where: { email: 'poster@nipeid.com' },
    update: {},
    create: {
      email: 'poster@nipeid.com',
      name: 'Test Poster',
      password: await bcrypt.hash('poster@123', 10),
      role: Role.POSTER,
      status: 'ACTIVE'
    },
  });

  // Create test documents
  const documents = [
    {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      documentNumber: 'ID123456',
      documentType: DocumentType.NATIONAL_ID,
      foundLocation: 'Bus Station',
      foundDistrict: 'Central',
      foundDivision: 'CBD',
      foundSubLocation: 'Bus Terminal',
      dateFound: new Date('2024-03-01'),
      condition: Condition.GOOD,
      status: DocumentStatus.UPLOADED,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1985-05-15'),
      documentNumber: 'PP789012',
      documentType: DocumentType.PASSPORT,
      foundLocation: 'Shopping Mall',
      foundDistrict: 'Westlands',
      foundDivision: 'Mall Area',
      foundSubLocation: 'Food Court',
      dateFound: new Date('2024-03-05'),
      condition: Condition.MEDIUM,
      status: DocumentStatus.KIOSK_CONFIRMED,
    },
    {
      firstName: 'Michael',
      lastName: 'Johnson',
      dateOfBirth: new Date('1995-08-20'),
      documentNumber: 'DL345678',
      documentType: DocumentType.DRIVING_LICENSE,
      foundLocation: 'Parking Lot',
      foundDistrict: 'Karen',
      foundDivision: 'Shopping Center',
      foundSubLocation: 'Basement Parking',
      dateFound: new Date('2024-03-10'),
      condition: Condition.GOOD,
      status: DocumentStatus.UPLOADED,
    },
  ];

  for (const doc of documents) {
    await prisma.document.create({
      data: {
        ...doc,
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