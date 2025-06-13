'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { Google as GoogleIcon, Facebook as FacebookIcon, Apple as AppleIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import Image from 'next/image';
import MobileNavigation from '@/components/MobileNavigation';
import WebNavigation from '@/components/WebNavigation';
import { useTranslation } from '@/utils/translations';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const validRoles = ['ADMIN', 'POSTER', 'USER', 'KIOSK_MANAGER'];

  // Handle redirects when user is already logged in
  useEffect(() => {
    if (session?.user && !redirecting) {
      const role = (session.user as any)?.role;
      if (validRoles.includes(role)) {
        setRedirecting(true);
        let redirectPath = '/user';
        if (role === 'ADMIN') redirectPath = '/admin';
        else if (role === 'POSTER') redirectPath = '/poster';
        else if (role === 'KIOSK_MANAGER') redirectPath = '/kiosk';
        router.replace(redirectPath);
      }
    }
  }, [session, router, redirecting]);

  if (status === 'loading' || redirecting) {
    return (
      <Box 
        minHeight="100vh" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        sx={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
        <Typography color="white" sx={{ mt: 2 }}>
          {status === 'loading' ? 'Loading...' : 'Redirecting...'}
        </Typography>
      </Box>
    );
  }

  // If user is logged in but has invalid role, show appropriate message
  if (session?.user) {
    const role = (session.user as any)?.role;
    if (!validRoles.includes(role)) {
      return (
        <Box 
          minHeight="100vh" 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          sx={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            p: 2
          }}
        >
          <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 6, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>Access Restricted</Typography>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Your account ({session.user?.email}) with role "{role || 'VISITOR'}" does not have access to dashboard features. 
                Please contact an administrator if you believe this is an error.
              </Alert>
              <Button
                onClick={() => signOut()}
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }}
                aria-label="Sign out"
              >
                Sign out
              </Button>
            </CardContent>
          </Card>
        </Box>
      );
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f0fdf4',
      position: 'relative',
      pb: { xs: 7, sm: 0 }
    }}>
      {/* Logo Section */}
      <Box sx={{ 
        position: 'absolute',
        top: { xs: 16, sm: 32 },
        left: 32,
        width: 'auto',
        zIndex: 2
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2
          }}>
            <Image 
              src="/nipeID.png" 
              alt={t('common.appName')} 
              width={80} 
              height={80}
              style={{ objectFit: 'contain' }}
            />
            <Typography variant="h4" sx={{ color: '#059669', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
              {t('common.appName')}
            </Typography>
          </Box>
        </Link>
      </Box>

      {/* Web Navigation */}
      <WebNavigation />

      {/* Main Content */}
      <Box sx={{ 
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 12, sm: 0 },
        px: 2
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            maxWidth: 400,
            borderRadius: 2,
            bgcolor: 'white',
            position: 'relative'
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom align="center">
            {t('login.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            {t('login.subtitle')}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2.5}>
            <TextField
              label={t('login.form.email')}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label={t('login.form.password')}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <Link 
              href="/forgot-password"
              style={{ 
                alignSelf: 'flex-end',
                textDecoration: 'none',
                color: '#059669',
                fontSize: '0.875rem'
              }}
            >
              {t('login.form.forgotPassword')}
            </Link>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ 
                py: 1.5,
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: '#059669',
                '&:hover': {
                  bgcolor: '#047857'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t('login.form.signIn')}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                {t('login.form.or')}
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => handleSocialLogin('google')}
                startIcon={<GoogleIcon />}
                sx={{ 
                  borderRadius: 2, 
                  flex: 1,
                  borderColor: '#059669',
                  color: '#059669',
                  '&:hover': {
                    borderColor: '#047857',
                    bgcolor: '#f0fdf4'
                  }
                }}
              >
                {t('login.form.googleButton')}
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleSocialLogin('facebook')}
                startIcon={<FacebookIcon />}
                sx={{ 
                  borderRadius: 2, 
                  flex: 1,
                  borderColor: '#059669',
                  color: '#059669',
                  '&:hover': {
                    borderColor: '#047857',
                    bgcolor: '#f0fdf4'
                  }
                }}
              >
                {t('login.form.facebookButton')}
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('login.form.noAccount')}{' '}
                <Link 
                  href="/signup"
                  style={{ 
                    textDecoration: 'none',
                    color: '#059669',
                    fontWeight: 600
                  }}
                >
                  {t('login.form.signUp')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="body2" sx={{ color: '#059669', mt: 4, textAlign: 'center' }}>
          {t('login.terms.text')}{' '}
          <Link href="/terms" style={{ color: '#059669', textDecoration: 'underline' }}>
            {t('login.terms.termsLink')}
          </Link>
          {' '}{t('login.terms.and')}{' '}
          <Link href="/privacy" style={{ color: '#059669', textDecoration: 'underline' }}>
            {t('login.terms.privacyLink')}
          </Link>
        </Typography>
      </Box>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </Box>
  );
} 