import { PrismaClient } from '@prisma/client';
import { sendDocumentFoundEmail } from './emailService';

const prisma = new PrismaClient();

export interface DocumentMatch {
  contactRequestId: string;
  documentId: string;
  recipientEmail: string;
  recipientName: string;
  documentDetails: {
    firstName: string;
    lastName: string;
    documentNumber: string;
    foundLocation: string;
    kioskName: string;
    kioskLocation: string;
    kioskPhone: string;
  };
}

/**
 * Enhanced document matching function
 * Checks for exact document number, full name matches, and document type compatibility
 */
function isDocumentMatch(
  document: any,
  contactRequest: any
): { isMatch: boolean; matchScore: number; matchReasons: string[] } {
  let matchScore = 0;
  const matchReasons: string[] = [];

  // Exact document number match (highest priority - score: 100)
  if (contactRequest.documentNumber && document.documentNumber) {
    if (contactRequest.documentNumber.toUpperCase() === document.documentNumber.toUpperCase()) {
      matchScore += 100;
      matchReasons.push('Exact document number match');
    }
  }

  // Full name match (high priority - score: 80)
  if (contactRequest.firstName && contactRequest.lastName && 
      document.firstName && document.lastName) {
    const requestFirstName = contactRequest.firstName.toLowerCase().trim();
    const requestLastName = contactRequest.lastName.toLowerCase().trim();
    const docFirstName = document.firstName.toLowerCase().trim();
    const docLastName = document.lastName.toLowerCase().trim();
    
    if (requestFirstName === docFirstName && requestLastName === docLastName) {
      matchScore += 80;
      matchReasons.push('Exact first and last name match');
    } else if (requestFirstName === docFirstName || requestLastName === docLastName) {
      matchScore += 40;
      matchReasons.push('Partial name match');
    }
  }

  // Document type compatibility (medium priority - score: 30)
  if (contactRequest.documentType && contactRequest.documentType !== 'OTHER') {
    // For now, we assume all uploaded documents could be any type
    // This can be enhanced when document type is added to the Document model
    matchScore += 30;
    matchReasons.push(`Document type specified: ${contactRequest.documentType}`);
  }

  // Search query contains document details (low priority - score: 20)
  if (contactRequest.searchQuery) {
    const searchQuery = contactRequest.searchQuery.toLowerCase();
    const docName = `${document.firstName} ${document.lastName}`.toLowerCase();
    const docNumber = document.documentNumber.toLowerCase();
    
    if (searchQuery.includes(docName) || searchQuery.includes(docNumber) ||
        docName.includes(searchQuery) || docNumber.includes(searchQuery)) {
      matchScore += 20;
      matchReasons.push('Search query matches document details');
    }
  }

  // Name in search query (low priority - score: 10)
  if (contactRequest.name && !contactRequest.firstName && !contactRequest.lastName) {
    const requestName = contactRequest.name.toLowerCase().trim();
    const docName = `${document.firstName} ${document.lastName}`.toLowerCase();
    
    if (docName.includes(requestName) || requestName.includes(docName)) {
      matchScore += 10;
      matchReasons.push('Contact name matches document name');
    }
  }

  // Consider it a match if score is 50 or higher (requires at least strong evidence)
  const isMatch = matchScore >= 50;
  
  return { isMatch, matchScore, matchReasons };
}

/**
 * Check for matching contact requests when a new document is uploaded
 * This function is called automatically during document upload
 */
export async function checkAndNotifyDocumentMatches(documentId: string): Promise<number> {
  try {
    console.log(`Checking for contact request matches for document: ${documentId}`);

    // Get the uploaded document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        kiosk: true,
      },
    });

    if (!document) {
      console.log('Document not found');
      return 0;
    }

    // Get all unnotified contact requests
    const contactRequests = await prisma.contactRequest.findMany({
      where: { notified: false },
    });

    console.log(`Found ${contactRequests.length} unnotified contact requests to check`);

    let notificationsSent = 0;
    const matchedRequests: string[] = [];

    for (const request of contactRequests) {
      const matchResult = isDocumentMatch(document, request);
      
      if (matchResult.isMatch) {
        console.log(`Match found for contact request ${request.id}:`, {
          score: matchResult.matchScore,
          reasons: matchResult.matchReasons,
          email: request.email,
          documentNumber: document.documentNumber
        });

        try {
          // Send email notification
          const emailSent = await sendDocumentFoundEmail(
            request.email,
            request.name,
            {
              firstName: document.firstName,
              lastName: document.lastName,
              documentNumber: document.documentNumber,
              foundLocation: document.foundLocation,
              kioskName: document.kiosk.name,
              kioskLocation: document.kiosk.location,
              kioskPhone: document.kiosk.phone,
            }
          );

          if (emailSent) {
            // Mark as notified
            await prisma.contactRequest.update({
              where: { id: request.id },
              data: { notified: true },
            });

            notificationsSent++;
            matchedRequests.push(request.id);
            console.log(`Email notification sent to ${request.email} for document ${document.documentNumber}`);
          } else {
            console.error(`Failed to send email to ${request.email}`);
          }
        } catch (emailError) {
          console.error(`Error sending email to ${request.email}:`, emailError);
        }
      } else if (matchResult.matchScore > 0) {
        console.log(`Partial match for contact request ${request.id} (score: ${matchResult.matchScore}):`, matchResult.matchReasons);
      }
    }

    console.log(`Document notification check completed. Sent ${notificationsSent} notifications.`);
    if (matchedRequests.length > 0) {
      console.log('Notified contact requests:', matchedRequests);
    }

    return notificationsSent;
  } catch (error) {
    console.error('Error checking document matches:', error);
    return 0;
  }
}

/**
 * Batch check all unnotified contact requests against existing documents
 * This can be run manually by admins or as a periodic job
 */
export async function checkAllContactRequestsForMatches(): Promise<number> {
  try {
    console.log('Starting batch check of all contact requests...');

    // Get all unnotified contact requests
    const contactRequests = await prisma.contactRequest.findMany({
      where: { notified: false },
    });

    if (contactRequests.length === 0) {
      console.log('No unnotified contact requests found');
      return 0;
    }

    // Get all available documents (those that can be claimed)
    const documents = await prisma.document.findMany({
      where: {
        status: {
          in: ['UPLOADED', 'AWAITING_KIOSK_ACK', 'KIOSK_CONFIRMED'],
        },
      },
      include: {
        kiosk: true,
      },
    });

    console.log(`Checking ${contactRequests.length} requests against ${documents.length} documents`);

    let totalNotificationsSent = 0;
    const matchedRequests: string[] = [];

    for (const request of contactRequests) {
      let bestMatch: { document: any; score: number; reasons: string[] } | null = null;

      // Find the best matching document for this request
      for (const document of documents) {
        const matchResult = isDocumentMatch(document, request);
        
        if (matchResult.isMatch && (!bestMatch || matchResult.matchScore > bestMatch.score)) {
          bestMatch = {
            document,
            score: matchResult.matchScore,
            reasons: matchResult.matchReasons,
          };
        }
      }

      if (bestMatch) {
        console.log(`Best match found for contact request ${request.id}:`, {
          documentId: bestMatch.document.id,
          score: bestMatch.score,
          reasons: bestMatch.reasons,
        });

        try {
          // Send email notification
          const emailSent = await sendDocumentFoundEmail(
            request.email,
            request.name,
            {
              firstName: bestMatch.document.firstName,
              lastName: bestMatch.document.lastName,
              documentNumber: bestMatch.document.documentNumber,
              foundLocation: bestMatch.document.foundLocation,
              kioskName: bestMatch.document.kiosk.name,
              kioskLocation: bestMatch.document.kiosk.location,
              kioskPhone: bestMatch.document.kiosk.phone,
            }
          );

          if (emailSent) {
            // Mark as notified
            await prisma.contactRequest.update({
              where: { id: request.id },
              data: { notified: true },
            });

            totalNotificationsSent++;
            matchedRequests.push(request.id);
            console.log(`Batch notification sent to ${request.email} for document ${bestMatch.document.documentNumber}`);
          }
        } catch (emailError) {
          console.error(`Error sending batch email to ${request.email}:`, emailError);
        }
      }
    }

    console.log(`Batch check completed. Sent ${totalNotificationsSent} notifications.`);
    if (matchedRequests.length > 0) {
      console.log('Batch notified contact requests:', matchedRequests);
    }

    return totalNotificationsSent;
  } catch (error) {
    console.error('Error in batch notification check:', error);
    return 0;
  }
} 