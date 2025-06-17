'use client';
import { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import WebNavigation from '@/components/WebNavigation';

// Form validation schemas
const phoneSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
});

const otpSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
});

type PhoneForm = z.infer<typeof phoneSchema>;
type OTPForm = z.infer<typeof otpSchema>;

function PhoneLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const { data: session } = useAuth();

  // Note: We're not redirecting for existing sessions to allow testing
  // In production, you might want to add a check here

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneForm, setPhoneForm] = useState<PhoneForm>({ phone: '' });
  const [otpForm, setOtpForm] = useState<OTPForm>({ code: '' });
  
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validatePhone = () => {
    try {
      phoneSchema.parse(phoneForm);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: any = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateOTP = () => {
    try {
      otpSchema.parse(otpForm);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: any = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Use the simple test endpoint
      const response = await fetch('/api/test-phone-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneForm.phone }),
      });

      const data = await response.json();

      if (!data.success) {
        setSubmitError(data.error || 'Failed to send OTP');
        return;
      }

      // Store the test code for verification
      setUserData({ testCode: data.code });
      setStep('otp');
      setCountdown(60); // 1 minute countdown
    } catch (error) {
      setSubmitError('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOTP()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Check if we have a test code (from test endpoint)
      if (userData?.testCode) {
        if (otpForm.code === userData.testCode) {
          // Test code verified successfully - create session
          const response = await fetch('/api/auth/phone-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              phone: phoneForm.phone,
              code: otpForm.code,
              isTest: true
            }),
          });

          const data = await response.json();
          if (!data.success) {
            setSubmitError(data.error || 'Authentication failed');
            return;
          }

          // Successfully authenticated, redirect to callback
          window.location.href = callbackUrl;
        } else {
          setSubmitError('Invalid verification code');
        }
      } else {
        // Regular OTP verification (when SMS is working)
        const response = await fetch('/api/auth/phone-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            phone: phoneForm.phone,
            code: otpForm.code,
            isTest: false
          }),
        });

        const data = await response.json();
        if (!data.success) {
          setSubmitError(data.error || 'Authentication failed');
          return;
        }

        // Successfully authenticated, redirect to callback
        window.location.href = callbackUrl;
      }
    } catch (error) {
      setSubmitError('Failed to verify OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Use the simple test endpoint
      const response = await fetch('/api/test-phone-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneForm.phone }),
      });

      const data = await response.json();

      if (!data.success) {
        setSubmitError(data.error || 'Failed to resend OTP');
        return;
      }

      // Update the test code
      setUserData({ testCode: data.code });
      setCountdown(60);
    } catch (error) {
      setSubmitError('Failed to resend OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (step === 'phone') {
      setPhoneForm(prev => ({ ...prev, [field]: value }));
    } else if (step === 'otp') {
      setOtpForm(prev => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
    setSubmitError(null);
  };

  const getStepTitle = () => {
    switch (step) {
      case 'phone':
        return 'Enter Phone Number';
      case 'otp':
        return 'Enter Verification Code';
      default:
        return 'Phone Login';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'phone':
        return 'Enter your phone number to receive a verification code';
      case 'otp':
        return `Enter the 6-digit code sent to ${phoneForm.phone}`;
      default:
        return '';
    }
  };

  return (
    <>
      <WebNavigation />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Image
            src="/nipeID.png"
            alt="MyIDApp Logo"
            width={120}
            height={120}
            style={{ margin: '0 auto' }}
          />
          <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 'bold', color: 'success.main' }}>
            MyIDApp
          </Typography>
        </Box>

        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 1, textAlign: 'center' }}>
              {getStepTitle()}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              {getStepDescription()}
            </Typography>

            {session && (
              <Alert severity="info" sx={{ mb: 3 }}>
                You are currently logged in with email. This phone login will create a separate session.
              </Alert>
            )}

            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {submitError}
              </Alert>
            )}

            {step === 'phone' && (
              <form onSubmit={handleSendOTP}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    value={phoneForm.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="e.g., 0712345678 or +254712345678"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: 'success.main',
                      '&:hover': { backgroundColor: 'success.dark' },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Send Code'}
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Or{' '}
                      <Link href="/login" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        login with email
                      </Link>
                    </Typography>
                  </Box>
                </Stack>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerifyOTP}>
                <Stack spacing={3}>
                  {userData?.testCode && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <strong>Test Mode:</strong> Use code <strong>{userData.testCode}</strong>
                    </Alert>
                  )}
                  
                  <TextField
                    fullWidth
                    label="Verification Code"
                    type={showCode ? 'text' : 'password'}
                    value={otpForm.code}
                    onChange={(e) => handleChange('code', e.target.value)}
                    error={!!errors.code}
                    helperText={errors.code}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowCode(!showCode)}
                            edge="end"
                          >
                            {showCode ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter 6-digit code"
                    inputProps={{ maxLength: 6 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: 'success.main',
                      '&:hover': { backgroundColor: 'success.dark' },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Verify Code'}
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Didn't receive the code?
                    </Typography>
                    <Button
                      variant="text"
                      onClick={handleResendOTP}
                      disabled={countdown > 0 || isSubmitting}
                      sx={{ color: 'success.main' }}
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                    </Button>
                  </Box>

                  <Button
                    variant="text"
                    onClick={() => setStep('phone')}
                    sx={{ color: 'text.secondary' }}
                  >
                    ← Back to Phone Number
                  </Button>
                </Stack>
              </form>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default function PhoneLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhoneLoginContent />
    </Suspense>
  );
} 