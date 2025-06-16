// Script to seed the database with realistic test data
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Document types
const documentTypes = [
  'NATIONAL_ID',
  'PASSPORT',
  'DRIVING_LICENSE',
  'STUDENT_ID',
  'NHIF_CARD',
  'BIRTH_CERTIFICATE',
  'TITLE_DEED',
  'OTHER'
];

// Statuses
const documentStatuses = [
  'FOUND',
  'CLAIMED',
  'PENDING',
  'VERIFIED',
  'REJECTED'
];

// Locations
const locations = [
  'Nairobi CBD',
  'Westlands',
  'Mombasa Road',
  'Thika Road',
  'Ngong Road',
  'Kiambu Road',
  'Parklands',
  'Kilimani',
  'Lavington',
  'Karen'
];

// Generate a random string
function randomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate a random document number based on type
function generateDocumentNumber(type) {
  switch (type) {
    case 'NATIONAL_ID':
      return Math.floor(10000000 + Math.random() * 90000000).toString();
    case 'PASSPORT':
      return `A${Math.floor(1000000 + Math.random() * 9000000)}`;
    case 'DRIVING_LICENSE':
      return `DL${Math.floor(100000 + Math.random() * 900000)}`;
    case 'STUDENT_ID':
      return `STU${Math.floor(10000 + Math.random() * 90000)}`;
    case 'NHIF_CARD':
      return `NHIF${Math.floor(1000000 + Math.random() * 9000000)}`;
    case 'BIRTH_CERTIFICATE':
      return `B${Math.floor(100000 + Math.random() * 900000)}`;
    case 'TITLE_DEED':
      return `TD${randomString(6)}`;
    default:
      return randomString(10);
  }
}

// Generate a random name
function generateName() {
  const firstNames = [
    'John', 'Mary', 'James', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna',
    'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
    'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon',
    'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy',
    'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna',
    'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma',
    'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Gregory', 'Christine', 'Frank', 'Debra',
    'Alexander', 'Rachel', 'Raymond', 'Catherine', 'Patrick', 'Carolyn', 'Jack', 'Janet',
    'Dennis', 'Ruth', 'Jerry', 'Maria', 'Tyler', 'Heather', 'Aaron', 'Diane',
    'Jose', 'Virginia', 'Adam', 'Julie', 'Henry', 'Joyce', 'Nathan', 'Victoria',
    'Douglas', 'Olivia', 'Zachary', 'Kelly', 'Peter', 'Christina', 'Kyle', 'Lauren',
    'Walter', 'Joan', 'Ethan', 'Evelyn', 'Jeremy', 'Judith', 'Harold', 'Megan',
    'Keith', 'Cheryl', 'Christian', 'Andrea', 'Roger', 'Hannah', 'Noah', 'Martha'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson',
    'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
    'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee',
    'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez',
    'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter',
    'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans',
    'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook',
    'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox',
    'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson',
    'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross',
    'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes',
    'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander',
    'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford', 'Hamilton', 'Graham',
    'Sullivan', 'Wallace', 'Woods', 'Cole', 'West', 'Jordan', 'Owens', 'Reynolds',
    'Fisher', 'Ellis', 'Harrison', 'Gibson', 'McDonald', 'Cruz', 'Marshall', 'Ortiz',
    'Gomez', 'Murray', 'Freeman', 'Wells', 'Webb', 'Simpson', 'Stevens', 'Tucker',
    'Porter', 'Hunter', 'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Morales',
    'Kennedy', 'Warren', 'Dixon', 'Ramos', 'Reyes', 'Burns', 'Gordon', 'Shaw',
    'Holmes', 'Rice', 'Robertson', 'Hunt', 'Black', 'Daniels', 'Palmer', 'Mills',
    'Nichols', 'Grant', 'Knight', 'Ferguson', 'Rose', 'Stone', 'Hawkins', 'Dunn',
    'Perkins', 'Hudson', 'Spencer', 'Gardner', 'Stephens', 'Payne', 'Pierce', 'Berry',
    'Matthews', 'Arnold', 'Wagner', 'Willis', 'Ray', 'Watkins', 'Olson', 'Carroll',
    'Duncan', 'Snyder', 'Hart', 'Cunningham', 'Bradley', 'Lane', 'Andrews', 'Ruiz',
    'Harper', 'Fox', 'Riley', 'Armstrong', 'Carpenter', 'Weaver', 'Greene', 'Lawrence',
    'Elliott', 'Chavez', 'Sims', 'Austin', 'Peters', 'Kelley', 'Franklin', 'Lawson'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return { firstName, lastName };
}

// Generate a random phone number
function generatePhoneNumber() {
  const prefixes = ['070', '071', '072', '073', '074', '075', '076', '077', '078', '079'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(1000000 + Math.random() * 9000000).toString();
  return prefix + suffix.substring(0, 6);
}

// Generate a random email
function generateEmail(firstName, lastName) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

// Generate a random date within the last 30 days
function generateRecentDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now;
}

async function main() {
  console.log('Starting to seed test data...');

  try {
    // Get all users
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      console.error('No users found. Please run add-sample-accounts.js first.');
      return;
    }

    // Get all kiosks
    const kiosks = await prisma.kiosk.findMany();
    if (kiosks.length === 0) {
      console.error('No kiosks found. Please run add-sample-accounts.js first.');
      return;
    }

    // Create test documents
    const documentsToCreate = 20;
    console.log(`Creating ${documentsToCreate} test documents...`);

    for (let i = 0; i < documentsToCreate; i++) {
      const documentType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
      const documentNumber = generateDocumentNumber(documentType);
      const { firstName, lastName } = generateName();
      const status = documentStatuses[Math.floor(Math.random() * documentStatuses.length)];
      const foundLocation = locations[Math.floor(Math.random() * locations.length)];
      const kioskId = kiosks[Math.floor(Math.random() * kiosks.length)].id;
      
      // Randomly assign a user for claimed documents
      let userId = null;
      if (status === 'CLAIMED') {
        // Filter for regular users
        const regularUsers = users.filter(user => user.role === 'USER');
        if (regularUsers.length > 0) {
          userId = regularUsers[Math.floor(Math.random() * regularUsers.length)].id;
        }
      }

      // Create the document
      const document = await prisma.document.create({
        data: {
          documentNumber,
          documentType,
          firstName,
          lastName,
          status,
          foundLocation,
          kioskId,
          userId,
          foundDate: generateRecentDate(),
          claimedDate: status === 'CLAIMED' ? generateRecentDate() : null,
        },
      });

      console.log(`Created document: ${documentType} #${documentNumber} for ${firstName} ${lastName}`);

      // Create contact request for some documents
      if (Math.random() > 0.7) {
        const { firstName: contactFirstName, lastName: contactLastName } = generateName();
        const phone = generatePhoneNumber();
        const email = generateEmail(contactFirstName, contactLastName);

        const contactRequest = await prisma.contactRequest.create({
          data: {
            documentNumber,
            documentType,
            firstName: contactFirstName,
            lastName: contactLastName,
            phone,
            email,
            message: `I lost my ${documentType.toLowerCase().replace('_', ' ')} and would like to claim it.`,
          },
        });

        console.log(`Created contact request from ${contactFirstName} ${contactLastName} for document #${documentNumber}`);
      }

      // Create notification for some documents
      if (Math.random() > 0.6 && userId) {
        const notification = await prisma.notification.create({
          data: {
            userId,
            title: `Document ${status === 'CLAIMED' ? 'Claimed' : 'Found'}`,
            message: `Your ${documentType.toLowerCase().replace('_', ' ')} #${documentNumber} has been ${status === 'CLAIMED' ? 'claimed successfully' : 'found and is ready for collection'}.`,
            read: Math.random() > 0.5,
            documentId: document.id,
          },
        });

        console.log(`Created notification for user ${userId} about document #${documentNumber}`);
      }
    }

    console.log('Test data seeded successfully!');

  } catch (error) {
    console.error('Error seeding test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
