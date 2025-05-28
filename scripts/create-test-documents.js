const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestDocuments() {
  try {
    console.log('🔍 Creating test documents for kiosk managers...');
    
    // Get kiosks with managers
    const kiosks = await prisma.kiosk.findMany({
      include: {
        managers: true
      }
    });
    
    // Get poster users
    const posters = await prisma.user.findMany({
      where: { role: 'POSTER' }
    });
    
    if (posters.length === 0) {
      console.log('❌ No poster users found. Please create some poster users first.');
      return;
    }
    
    const testDocuments = [
      {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        dateOfBirth: new Date('1990-05-15'),
        documentNumber: 'ID123456789',
        foundLocation: 'Nairobi CBD',
        foundDistrict: 'Nairobi',
        foundDivision: 'Central',
        foundSubLocation: 'City Center',
        dateFound: new Date('2024-01-15'),
        condition: 'GOOD',
        status: 'UPLOADED'
      },
      {
        firstName: 'Jane',
        middleName: 'Mary',
        lastName: 'Johnson',
        dateOfBirth: new Date('1985-08-22'),
        documentNumber: 'ID987654321',
        foundLocation: 'Westlands',
        foundDistrict: 'Nairobi',
        foundDivision: 'Westlands',
        foundSubLocation: 'Sarit Center',
        dateFound: new Date('2024-01-16'),
        condition: 'MEDIUM',
        status: 'AWAITING_KIOSK_ACK'
      },
      {
        firstName: 'Michael',
        middleName: null,
        lastName: 'Brown',
        dateOfBirth: new Date('1992-12-03'),
        documentNumber: 'ID456789123',
        foundLocation: 'Jarry',
        foundDistrict: 'Nairobi',
        foundDivision: 'Jarry',
        foundSubLocation: 'Market Area',
        dateFound: new Date('2024-01-17'),
        condition: 'GOOD',
        status: 'KIOSK_CONFIRMED'
      },
      {
        firstName: 'Sarah',
        middleName: 'Grace',
        lastName: 'Wilson',
        dateOfBirth: new Date('1988-03-10'),
        documentNumber: 'ID789123456',
        foundLocation: 'Nairobi CBD',
        foundDistrict: 'Nairobi',
        foundDivision: 'Central',
        foundSubLocation: 'Tom Mboya Street',
        dateFound: new Date('2024-01-18'),
        condition: 'BAD',
        status: 'DISPATCHED'
      }
    ];
    
    let documentIndex = 0;
    
    for (const kiosk of kiosks) {
      if (kiosk.managers.length > 0) {
        console.log(`\n📄 Creating documents for ${kiosk.name}...`);
        
        // Create 2-3 documents per kiosk
        const documentsForKiosk = testDocuments.slice(documentIndex, documentIndex + 2);
        documentIndex += 2;
        
        for (const docData of documentsForKiosk) {
          const randomPoster = posters[Math.floor(Math.random() * posters.length)];
          
          const document = await prisma.document.create({
            data: {
              ...docData,
              kioskId: kiosk.id,
              posterId: randomPoster.id
            }
          });
          
          // Create status history
          await prisma.documentStatusHistory.create({
            data: {
              documentId: document.id,
              status: document.status,
              createdAt: new Date()
            }
          });
          
          // Create notification
          await prisma.notification.create({
            data: {
              userId: randomPoster.id,
              documentId: document.id,
              type: 'UPLOAD',
              channel: 'EMAIL',
              message: `Your document ${document.documentNumber} has been uploaded to ${kiosk.name}`,
              createdAt: new Date()
            }
          });
          
          console.log(`✅ Created document ${document.documentNumber} for ${document.firstName} ${document.lastName}`);
        }
      }
    }
    
    // Show final summary
    console.log('\n📊 Document Summary by Kiosk:');
    for (const kiosk of kiosks) {
      const documentCount = await prisma.document.count({
        where: { kioskId: kiosk.id }
      });
      
      const documents = await prisma.document.findMany({
        where: { kioskId: kiosk.id },
        select: {
          documentNumber: true,
          status: true,
          firstName: true,
          lastName: true
        }
      });
      
      console.log(`\n🏢 ${kiosk.name} (${documentCount} documents):`);
      documents.forEach(doc => {
        console.log(`  - ${doc.documentNumber}: ${doc.firstName} ${doc.lastName} (${doc.status})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestDocuments(); 