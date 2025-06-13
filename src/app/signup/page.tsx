'use client';
import { useState } from 'react';
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
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import WebNavigation from '@/components/WebNavigation';

// Form validation schema
const signupSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email is too short')
    .max(50, 'Email is too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<SignupForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    try {
      signupSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<SignupForm> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof SignupForm] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create account');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setErrors({
        email: error instanceof Error ? error.message : 'Failed to create account',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof SignupForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Box sx={{ pb: { xs: 7, sm: 0 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Navigation Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image 
                  src="/nipeID.png" 
                  alt="Nipe ID Logo" 
                  width={80} 
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
                <Typography variant="h4" sx={{ color: '#059669', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                  Nipe ID
                </Typography>
              </Box>
            </Link>
            <WebNavigation />
          </Box>

          {/* Signup Form */}
          <Container maxWidth="sm">
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#059669', fontWeight: 700 }}>
                  Create Account
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      label="Full Name"
                      value={form.name}
                      onChange={handleChange('name')}
                      error={!!errors.name}
                      helperText={errors.name}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: '#059669' }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      error={!!errors.email}
                      helperText={errors.email}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: '#059669' }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange('password')}
                      error={!!errors.password}
                      helperText={errors.password}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: '#059669' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: '#059669' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {submitStatus === 'success' && (
                      <Alert severity="success">
                        Account created successfully! Redirecting to login...
                      </Alert>
                    )}

                    {submitStatus === 'error' && (
                      <Alert severity="error">
                        {errors.email || 'Failed to create account. Please try again.'}
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        py: 1.5,
                        bgcolor: '#059669',
                        '&:hover': { bgcolor: '#047857' },
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      Already have an account?{' '}
                      <Link href="/login" style={{ color: '#059669', textDecoration: 'none' }}>
                        Sign in
                      </Link>
                    </Typography>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Container>
      </Box>
    </Box>
  );
} 