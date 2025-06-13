const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupKioskManager() {
  try {
    console.log('🔍 Checking database state...');
    
    // Check existing users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        managedKiosks: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      }
    });
    
    console.log('\n📋 Current Users:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
      if (user.managedKiosks.length > 0) {
        console.log(`  Manages: ${user.managedKiosks.map(k => k.name).join(', ')}`);
      }
    });
    
    // Check existing kiosks
    const kiosks = await prisma.kiosk.findMany({
      include: {
        managers: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    console.log('\n🏢 Current Kiosks:');
    kiosks.forEach(kiosk => {
      console.log(`- ${kiosk.name} (${kiosk.location})`);
      if (kiosk.managers.length > 0) {
        console.log(`  Managers: ${kiosk.managers.map(m => m.name).join(', ')}`);
      } else {
        console.log(`  No managers assigned`);
      }
    });
    
    // Find kiosk manager users without kiosks
    const kioskManagersWithoutKiosks = users.filter(
      user => user.role === 'KIOSK_MANAGER' && user.managedKiosks.length === 0
    );
    
    // Find kiosks without managers
    const kiosksWithoutManagers = kiosks.filter(kiosk => kiosk.managers.length === 0);
    
    if (kioskManagersWithoutKiosks.length > 0 && kiosksWithoutManagers.length > 0) {
      console.log('\n🔧 Setting up kiosk manager relationships...');
      
      for (let i = 0; i < Math.min(kioskManagersWithoutKiosks.length, kiosksWithoutManagers.length); i++) {
        const manager = kioskManagersWithoutKiosks[i];
        const kiosk = kiosksWithoutManagers[i];
        
        await prisma.kiosk.update({
          where: { id: kiosk.id },
          data: {
            managers: {
              connect: { id: manager.id }
            }
          }
        });
        
        console.log(`✅ Assigned ${manager.name} to manage ${kiosk.name}`);
      }
    } else if (kioskManagersWithoutKiosks.length > 0) {
      console.log('\n🏗️ Creating kiosk for manager...');
      
      const manager = kioskManagersWithoutKiosks[0];
      const newKiosk = await prisma.kiosk.create({
        data: {
          name: `${manager.name}'s Kiosk`,
          location: 'Main Street, Downtown',
          phone: '+254-700-000-000',
          hours: '8:00 AM - 6:00 PM',
          isActive: true,
          managers: {
            connect: { id: manager.id }
          }
        }
      });
      
      console.log(`✅ Created kiosk "${newKiosk.name}" and assigned to ${manager.name}`);
    } else if (kiosksWithoutManagers.length > 0) {
      console.log('\n👤 Creating kiosk manager for existing kiosk...');
      
      const kiosk = kiosksWithoutManagers[0];
      const newManager = await prisma.user.create({
        data: {
          name: `${kiosk.name} Manager`,
          email: `manager@${kiosk.name.toLowerCase().replace(/\s+/g, '')}.com`,
          role: 'KIOSK_MANAGER',
          managedKiosks: {
            connect: { id: kiosk.id }
          }
        }
      });
      
      console.log(`✅ Created manager "${newManager.name}" for kiosk "${kiosk.name}"`);
      console.log(`📧 Login email: ${newManager.email}`);
    } else {
      console.log('\n✅ All kiosk managers are properly assigned to kiosks!');
    }
    
    // Final state check
    console.log('\n📊 Final Database State:');
    const finalUsers = await prisma.user.findMany({
      where: { role: 'KIOSK_MANAGER' },
      include: {
        managedKiosks: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      }
    });
    
    finalUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
      user.managedKiosks.forEach(kiosk => {
        console.log(`  ✓ Manages: ${kiosk.name} at ${kiosk.location}`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupKioskManager(); 