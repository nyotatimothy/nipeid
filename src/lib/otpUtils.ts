import { prisma } from './prisma';
import { smsService } from './smsService';

export class OTPUtils {
  static generateOTP(): string {
    // Generate a 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async createOTP(phone: string, userId?: string): Promise<{ success: boolean; otpId?: string; error?: string }> {
    try {
      // Clean up expired OTPs
      await prisma.oTP.deleteMany({
        where: {
          expiresAt: {
            lt: new Date()
          }
        }
      });

      // Check if there's a recent OTP for this phone (within 1 minute)
      const recentOTP = await prisma.oTP.findFirst({
        where: {
          phone: phone,
          createdAt: {
            gte: new Date(Date.now() - 60000) // 1 minute ago
          }
        }
      });

      if (recentOTP) {
        return {
          success: false,
          error: 'Please wait at least 1 minute before requesting another code'
        };
      }

      const code = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Create OTP record
      const otp = await prisma.oTP.create({
        data: {
          phone: phone,
          code: code,
          expiresAt: expiresAt,
          userId: userId
        }
      });

      // Send SMS
      const smsResult = await smsService.sendOTP(phone, code);

      if (!smsResult.success) {
        // Delete the OTP if SMS failed
        await prisma.oTP.delete({
          where: { id: otp.id }
        });

        return {
          success: false,
          error: smsResult.error || 'Failed to send SMS'
        };
      }

      return {
        success: true,
        otpId: otp.id
      };
    } catch (error) {
      console.error('Error creating OTP:', error);
      return {
        success: false,
        error: 'Failed to create OTP'
      };
    }
  }

  static async verifyOTP(phone: string, code: string): Promise<{ success: boolean; userId?: string; error?: string }> {
    try {
      const otp = await prisma.oTP.findFirst({
        where: {
          phone: phone,
          code: code,
          used: false,
          expiresAt: {
            gt: new Date()
          }
        },
        include: {
          user: true
        }
      });

      if (!otp) {
        return {
          success: false,
          error: 'Invalid or expired code'
        };
      }

      // Mark OTP as used
      await prisma.oTP.update({
        where: { id: otp.id },
        data: { used: true }
      });

      return {
        success: true,
        userId: otp.userId || undefined
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        error: 'Failed to verify OTP'
      };
    }
  }

  static async findOrCreateUser(phone: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      // Try to find existing user by phone
      let user = await prisma.user.findFirst({
        where: { phone: phone }
      });

      if (!user) {
        // Create new user if not found
        user = await prisma.user.create({
          data: {
            phone: phone,
            role: 'USER',
            status: 'ACTIVE'
          }
        });
      }

      return {
        success: true,
        user: user
      };
    } catch (error) {
      console.error('Error finding/creating user:', error);
      return {
        success: false,
        error: 'Failed to find or create user'
      };
    }
  }

  static async updateUserEmail(userId: string, email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { email: email }
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating user email:', error);
      return {
        success: false,
        error: 'Failed to update email'
      };
    }
  }
} 