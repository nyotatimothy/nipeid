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
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import WebNavigation from '@/components/WebNavigation';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    try {
      loginSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<LoginForm> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginForm] = err.message;
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
    setSubmitError(null);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      
      if (result?.error) {
        setSubmitError('Invalid email or password');
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      setSubmitError('Failed to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  const handleChange = (field: keyof LoginForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setSubmitError(null);
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

          {/* Login Form */}
          <Container maxWidth="sm">
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#059669', fontWeight: 700 }}>
                  Sign In
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
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

                    {submitError && (
                      <Alert severity="error">
                        {submitError}
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
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
            </Button>

                    <Box sx={{ position: 'relative', my: 3 }}>
                      <Divider>
                        <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
                          OR
                        </Typography>
                      </Divider>
          </Box>

                    <Button
                      variant="outlined"
                      onClick={handleGoogleSignIn}
                      startIcon={<GoogleIcon />}
                      sx={{
                        py: 1.5,
                        color: '#059669',
                        borderColor: '#059669',
                        '&:hover': {
                          borderColor: '#047857',
                          bgcolor: 'rgba(5, 150, 105, 0.04)',
                        },
                      }}
                    >
                      Continue with Google
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      Don't have an account?{' '}
                      <Link href="/signup" style={{ color: '#059669', textDecoration: 'none' }}>
                        Sign up
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