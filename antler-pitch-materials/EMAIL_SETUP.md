# Email Notification System Setup Guide

## Overview
The MyID app includes a comprehensive email notification system that automatically sends notifications to users when their lost documents are found and uploaded to the system.

## Features
- **Automatic Notifications**: When documents are uploaded, the system automatically checks for matching contact requests and sends email notifications
- **Professional Email Templates**: Beautiful, responsive HTML emails with MyID branding
- **Smart Matching**: Matches documents by exact document number, full name, or search query terms
- **Batch Processing**: Admin can manually trigger batch checks for all unnotified requests
- **Test Interface**: Built-in testing page to verify email configuration

## Environment Configuration

Create a `.env.local` file in the `myid` directory with the following variables:

```env
# Email Configuration for Notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="MyID Kenya <your-gmail@gmail.com>"
```

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password as EMAIL_PASS (not your regular Gmail password)

### Other Email Providers

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

**Custom SMTP:**
```env
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
```

## Testing the System

### 1. Test Email Functionality
Visit: `http://localhost:3000/test-notifications`

This page allows you to:
- Send test emails to verify configuration
- Run batch notification checks
- See configuration requirements

### 2. Test the Full Workflow

1. **Create a Contact Request:**
   - Go to homepage: `http://localhost:3000`
   - Search for a document that doesn't exist
   - Fill out the "Can't find your document?" form
   - Submit your contact request

2. **Upload a Matching Document:**
   - Login as a poster: `poster@myid.com` / `poster123`
   - Go to: `http://localhost:3000/poster`
   - Upload a document with matching details
   - Check your email for automatic notification

3. **Check Database:**
   - Use Prisma Studio: `npx prisma studio`
   - View `ContactRequest` table to see requests
   - View `Notification` table to see sent notifications

## API Endpoints

### Contact Requests
- `POST /api/contact-request` - Save contact request
- `POST /api/admin/check-notifications` - Manual batch check (admin only)
- `POST /api/test-email` - Send test email

## Database Tables

### ContactRequest
- Stores notification requests from users
- Tracks if notification has been sent
- Includes search terms for better matching

### Notification
- Records all sent notifications
- Includes type `DOCUMENT_FOUND` for our system
- Links to documents and users

## How It Works

1. **User Requests Notification:**
   - User searches for document on homepage
   - If not found, fills contact form
   - System saves request with search terms

2. **Document Upload Triggers Check:**
   - When poster uploads new document
   - System automatically runs `checkAndNotifyDocumentMatches()`
   - Finds matching contact requests
   - Sends professional email notifications
   - Marks requests as notified

3. **Email Content:**
   - Document details (name, number, location)
   - Collection kiosk information
   - Required documents for collection
   - Professional MyID branding
   - Call-to-action links

## Matching Logic

The system matches documents to contact requests using:
- **Exact document number match** (highest priority)
- **Full name match** (first + last name)
- **Search query contains document details**

Strong matches trigger notifications, ensuring accuracy.

## Manual Administration

Admins can trigger batch checks via:
- Test page: `http://localhost:3000/test-notifications`
- API endpoint: `POST /api/admin/check-notifications`
- Console: View logs for notification activity

## Troubleshooting

### Email Not Sending
1. Check environment variables are set correctly
2. Verify SMTP credentials and app passwords
3. Check server logs for detailed error messages
4. Test with the test email page first

### No Notifications Received
1. Check spam/junk folders
2. Verify contact request was saved in database
3. Ensure document details match contact request
4. Check notification table in Prisma Studio

### Environment Variables Not Loading
1. Ensure `.env.local` is in the `myid` directory
2. Restart the development server after changes
3. Check file is not in `.gitignore`

## Development Notes

The notification system is integrated into:
- Document upload workflow (`/api/upload`)
- Homepage contact form (`/api/contact-request`)
- Email service (`/lib/emailService.ts`)
- Notification service (`/lib/documentNotificationService.ts`)

All components are production-ready and include proper error handling and logging. 