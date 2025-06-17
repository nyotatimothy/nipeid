import axios from 'axios';

interface SMSResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class SMSService {
  private apiKey: string;
  private username: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.AFRICAS_TALKING_API_KEY || '';
    this.username = process.env.AFRICAS_TALKING_USERNAME || '';
    this.baseUrl = 'https://api.sandbox.africastalking.com/version1/messaging';
  }

  private normalizePhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle Kenyan numbers
    if (cleaned.startsWith('0')) {
      // Convert 07xxxxxxxx to +2547xxxxxxxx
      cleaned = '+254' + cleaned.substring(1);
    } else if (cleaned.startsWith('254')) {
      // Convert 254xxxxxxxx to +254xxxxxxxx
      cleaned = '+' + cleaned;
    } else if (!cleaned.startsWith('+')) {
      // If it doesn't start with +, assume it's a Kenyan number
      cleaned = '+254' + cleaned;
    }
    
    return cleaned;
  }

  async sendOTP(phone: string, code: string): Promise<SMSResponse> {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phone);
      
      const message = `Your MyIDApp verification code is: ${code}. This code expires in 10 minutes. Do not share this code with anyone.`;
      
      const response = await axios.post(
        this.baseUrl,
        {
          username: this.username,
          to: normalizedPhone,
          message: message,
          from: 'MyIDApp'
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'apiKey': this.apiKey
          }
        }
      );

      if (response.data.SMSMessageData) {
        return {
          success: true,
          message: 'SMS sent successfully'
        };
      } else {
        return {
          success: false,
          error: 'Failed to send SMS'
        };
      }
    } catch (error: any) {
      console.error('SMS sending error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.SMSMessageData?.Message || 'Failed to send SMS'
      };
    }
  }

  async sendNotification(phone: string, message: string): Promise<SMSResponse> {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phone);
      
      const response = await axios.post(
        this.baseUrl,
        {
          username: this.username,
          to: normalizedPhone,
          message: message,
          from: 'MyIDApp'
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'apiKey': this.apiKey
          }
        }
      );

      if (response.data.SMSMessageData) {
        return {
          success: true,
          message: 'SMS sent successfully'
        };
      } else {
        return {
          success: false,
          error: 'Failed to send SMS'
        };
      }
    } catch (error: any) {
      console.error('SMS sending error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.SMSMessageData?.Message || 'Failed to send SMS'
      };
    }
  }
}

export const smsService = new SMSService();
export default smsService; 