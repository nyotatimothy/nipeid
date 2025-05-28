import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create test users for all roles
  const testUsers = [
    {
      name: 'Admin User',
      email: 'admin@myid.com',
      password: 'admin123',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
    {
      name: 'John Poster',
      email: 'poster@myid.com',
      password: 'poster123',
      role: 'POSTER',
      status: 'ACTIVE',
    },
    {
      name: 'Jane User',
      email: 'user@myid.com',
      password: 'user123',
      role: 'USER',
      status: 'ACTIVE',
    },
    {
      name: 'Kiosk Manager',
      email: 'kiosk@myid.com',
      password: 'kiosk123',
      role: 'KIOSK_MANAGER',
      status: 'ACTIVE',
    },
  ];

  let kioskManagerId: string | null = null;

  for (const userData of testUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role as any,
          status: userData.status as any,
        },
      });
      console.log(`✅ Created ${userData.role} user: ${userData.email}`);
      
      // Store kiosk manager ID for linking
      if (userData.role === 'KIOSK_MANAGER') {
        kioskManagerId = user.id;
      }
    } else {
      console.log(`⚠️ User already exists: ${userData.email}`);
      
      // Get existing kiosk manager ID
      if (userData.role === 'KIOSK_MANAGER') {
        kioskManagerId = existingUser.id;
      }
    }
  }

  // Create a test kiosk for the kiosk manager
  const existingKiosk = await prisma.kiosk.findFirst({
    where: { 
      OR: [
        { name: 'Test Kiosk CBD' }
      ]
    },
    include: { managers: true }
  });

  if (!existingKiosk) {
    await prisma.kiosk.create({
      data: {
        name: 'Test Kiosk CBD',
        location: 'Nairobi CBD',
        contactPerson: 'Kiosk Manager',
        phone: '+254700000001',
        email: 'kiosk@myid.com',
        status: 'ACTIVE',
        managers: {
          connect: kioskManagerId ? { id: kioskManagerId } : undefined
        }
      },
    });
    console.log('✅ Created test kiosk');
  } else {
    console.log('⚠️ Test kiosk already exists');
    
    // Check if kiosk manager is connected, if not connect them
    const isManagerConnected = existingKiosk.managers.some(manager => manager.id === kioskManagerId);
    
    if (!isManagerConnected && kioskManagerId) {
      await prisma.kiosk.update({
        where: { id: existingKiosk.id },
        data: {
          managers: {
            connect: { id: kioskManagerId }
          }
        }
      });
      console.log('✅ Connected kiosk manager to existing kiosk');
    }
  }

  console.log('🎉 Seeding completed!');
  console.log('\n📋 Test Credentials:');
  console.log('Admin: admin@myid.com / admin123');
  console.log('Poster: poster@myid.com / poster123');
  console.log('User: user@myid.com / user123');
  console.log('Kiosk: kiosk@myid.com / kiosk123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 