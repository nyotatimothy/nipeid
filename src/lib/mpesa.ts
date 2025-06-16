import axios from 'axios';
import CryptoJS from 'crypto-js';

export interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  passkey: string;
  shortcode: string;
  environment: 'sandbox' | 'production';
  callbackUrl: string;
}

export interface STKPushRequest {
  phoneNumber: string;
  amount: number;
  reference: string;
  description: string;
}

export interface STKPushResponse {
  success: boolean;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  status?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'CANCELLED';
  errorCode?: string;
  errorMessage?: string;
  metadata?: any;
}

class MpesaService {
  private config: MpesaConfig;
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: MpesaConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'production' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    
    // Check if we have a valid token
    if (this.accessToken && now < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString('base64');
      
      const response = await axios.post(
        `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        {},
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = now + (response.data.expires_in * 1000) - 60000; // Expire 1 minute early
      
      return this.accessToken || '';
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  private generateTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hour}${minute}${second}`;
  }

  private generatePassword(): string {
    const timestamp = this.generateTimestamp();
    const password = `${this.config.shortcode}${this.config.passkey}${timestamp}`;
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
  }

  async initiateSTKPush(request: STKPushRequest): Promise<STKPushResponse> {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword();

      // Format phone number (remove + and add 254 if needed)
      let phoneNumber = request.phoneNumber.replace(/\+/g, '');
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '254' + phoneNumber.substring(1);
      } else if (!phoneNumber.startsWith('254')) {
        phoneNumber = '254' + phoneNumber;
      }

      const payload = {
        BusinessShortCode: this.config.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(request.amount),
        PartyA: phoneNumber,
        PartyB: this.config.shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: this.config.callbackUrl,
        AccountReference: request.reference,
        TransactionDesc: request.description
      };

      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = response.data;
      
      if (result.ResultCode === '0') {
        return {
          success: true,
          checkoutRequestId: result.CheckoutRequestID,
          merchantRequestId: result.MerchantRequestID
        };
      } else {
        return {
          success: false,
          errorCode: result.ResultCode,
          errorMessage: result.ResultDesc
        };
      }
    } catch (error: any) {
      console.error('STK Push error:', error);
      return {
        success: false,
        errorCode: 'ERROR',
        errorMessage: error.response?.data?.errorMessage || error.message || 'STK Push failed'
      };
    }
  }

  async checkPaymentStatus(checkoutRequestId: string): Promise<PaymentStatusResponse> {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword();

      const payload = {
        BusinessShortCode: this.config.shortcode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      };

      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = response.data;
      
      if (result.ResultCode === '0') {
        return {
          success: true,
          status: 'SUCCESS',
          metadata: result
        };
      } else if (result.ResultCode === '1032') {
        return {
          success: true,
          status: 'CANCELLED',
          metadata: result
        };
      } else if (result.ResultCode === '1037') {
        return {
          success: true,
          status: 'TIMEOUT',
          metadata: result
        };
      } else {
        return {
          success: false,
          status: 'FAILED',
          errorCode: result.ResultCode,
          errorMessage: result.ResultDesc,
          metadata: result
        };
      }
    } catch (error: any) {
      console.error('Payment status check error:', error);
      return {
        success: false,
        status: 'FAILED',
        errorCode: 'ERROR',
        errorMessage: error.response?.data?.errorMessage || error.message || 'Status check failed'
      };
    }
  }

  validateWebhookSignature(signature: string, timestamp: string, nonce: string, body: string): boolean {
    try {
      const expectedSignature = CryptoJS.HmacSHA256(
        `${this.config.consumerKey}${timestamp}${nonce}${body}`,
        this.config.consumerSecret
      ).toString(CryptoJS.enc.Base64);
      
      return signature === expectedSignature;
    } catch (error) {
      console.error('Signature validation error:', error);
      return false;
    }
  }

  parseWebhookData(body: any): any {
    try {
      const result = body.Body?.stkCallback;
      if (!result) {
        throw new Error('Invalid webhook data structure');
      }

      return {
        resultCode: result.ResultCode,
        resultDesc: result.ResultDesc,
        checkoutRequestId: result.CheckoutRequestID,
        merchantRequestId: result.MerchantRequestID,
        amount: result.CallbackMetadata?.Item?.find((item: any) => item.Name === 'Amount')?.Value,
        mpesaReceiptNumber: result.CallbackMetadata?.Item?.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value,
        transactionDate: result.CallbackMetadata?.Item?.find((item: any) => item.Name === 'TransactionDate')?.Value,
        phoneNumber: result.CallbackMetadata?.Item?.find((item: any) => item.Name === 'PhoneNumber')?.Value
      };
    } catch (error) {
      console.error('Webhook data parsing error:', error);
      throw error;
    }
  }
}

// Create and export the M-Pesa service instance
const mpesaConfig: MpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || '',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
  passkey: process.env.MPESA_PASSKEY || '',
  shortcode: process.env.MPESA_SHORTCODE || '',
  environment: (process.env.MPESA_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  callbackUrl: process.env.MPESA_CALLBACK_URL || ''
};

export const mpesaService = new MpesaService(mpesaConfig); 