import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Create transporter only if configuration is available
let transporter: nodemailer.Transporter | null = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport(emailConfig);
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Check if transporter is available
    if (!transporter) {
      console.warn('Email service is not configured');
      return false;
    }

    // Verify transporter configuration
    await transporter.verify();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'MyID Kenya <noreply@myid.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export async function sendDocumentFoundEmail(
  recipientEmail: string,
  recipientName: string,
  documentDetails: {
    firstName: string;
    lastName: string;
    documentNumber: string;
    foundLocation: string;
    kioskName: string;
    kioskLocation: string;
    kioskPhone: string;
  }
): Promise<boolean> {
  const subject = `🎉 Great News! Your Document Has Been Found - ${documentDetails.documentNumber}`;
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document Found</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #007bff;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                margin-bottom: 10px;
            }
            .success-icon {
                font-size: 48px;
                margin: 20px 0;
            }
            .document-details {
                background: #e3f2fd;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #2196f3;
            }
            .kiosk-info {
                background: #f3e5f5;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #9c27b0;
            }
            .action-button {
                display: inline-block;
                background: #007bff;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                margin: 20px 0;
                text-align: center;
            }
            .requirements {
                background: #fff3cd;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #ffc107;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">MyID Kenya</div>
                <div class="success-icon">🎉</div>
                <h1 style="color: #28a745; margin: 0;">Document Found!</h1>
            </div>
            
            <p>Dear <strong>${recipientName}</strong>,</p>
            
            <p>We have <strong>great news</strong>! The document you were looking for has been found and is now available for collection.</p>
            
            <div class="document-details">
                <h3 style="margin-top: 0; color: #1565c0;">📄 Document Details</h3>
                <p><strong>Name:</strong> ${documentDetails.firstName} ${documentDetails.lastName}</p>
                <p><strong>Document Number:</strong> ${documentDetails.documentNumber}</p>
                <p><strong>Found Location:</strong> ${documentDetails.foundLocation}</p>
            </div>
            
            <div class="kiosk-info">
                <h3 style="margin-top: 0; color: #7b1fa2;">📍 Collection Point</h3>
                <p><strong>Kiosk:</strong> ${documentDetails.kioskName}</p>
                <p><strong>Location:</strong> ${documentDetails.kioskLocation}</p>
                <p><strong>Contact:</strong> ${documentDetails.kioskPhone}</p>
            </div>
            
            <div class="requirements">
                <h3 style="margin-top: 0; color: #856404;">⚠️ What to Bring</h3>
                <ul style="margin: 10px 0;">
                    <li>Valid national ID or passport for verification</li>
                    <li>Any supporting documents that prove ownership</li>
                    <li>Collection fee (if applicable)</li>
                </ul>
            </div>
            
            <div style="text-align: center;">
                <a href="http://localhost:3000" class="action-button">Visit MyID Portal</a>
            </div>
            
            <p style="margin-top: 30px;">
                <strong>Next Steps:</strong><br>
                1. Contact the kiosk to confirm collection hours<br>
                2. Prepare the required documents mentioned above<br>
                3. Visit the kiosk during operating hours<br>
                4. Complete the verification process
            </p>
            
            <p style="color: #dc3545; font-weight: bold;">
                ⏰ Important: Please collect your document within 30 days to avoid additional storage fees.
            </p>
            
            <div class="footer">
                <p>This is an automated message from MyID Kenya.<br>
                For support, contact us at support@myid.com</p>
                <p>&copy; 2024 MyID Kenya. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const text = `
    Document Found - Nipe ID Kenya
    
    Dear ${recipientName},
    
    Great news! Your document has been found and is available for collection.
    
    Document Details:
    - Name: ${documentDetails.firstName} ${documentDetails.lastName}
    - Document Number: ${documentDetails.documentNumber}
    - Found Location: ${documentDetails.foundLocation}
    
    Collection Point:
    - Kiosk: ${documentDetails.kioskName}
    - Location: ${documentDetails.kioskLocation}
    - Contact: ${documentDetails.kioskPhone}
    
    What to Bring:
    - Valid national ID or passport for verification
    - Any supporting documents that prove ownership
    - Collection fee (if applicable)
    
    Please collect your document within 30 days.
    
    Visit: http://localhost:3000
    Support: support@nipeid.com
    
    © 2024 Nipe ID Kenya
  `;

  return await sendEmail({
    to: recipientEmail,
    subject,
    html,
    text,
  });
} 