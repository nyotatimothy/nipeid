'use client';
import { Box, Button, useTheme } from '@mui/material';
import {
  Home as HomeIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function WebNavigation() {
  const pathname = usePathname();
  const theme = useTheme();

  const buttonStyle = (path: string) => ({
    width: 120,
    height: 40,
    backgroundColor: pathname === path ? theme.palette.success.main : 'rgba(255, 255, 255, 0.9)',
    color: pathname === path ? 'white' : theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
      color: 'white',
    }
  });

  return (
    <Box 
      sx={{ 
        position: 'absolute',
        top: { xs: 16, sm: 32 },
        right: { xs: 16, sm: 32 },
        display: { xs: 'none', sm: 'flex' },
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<HomeIcon />}
          sx={buttonStyle('/')}
        >
          Home
        </Button>
        <Button
          component={Link}
          href="/contact"
          startIcon={<ContactIcon />}
          sx={buttonStyle('/contact')}
        >
          Contact
        </Button>
        <Button
          component={Link}
          href="/about"
          startIcon={<InfoIcon />}
          sx={buttonStyle('/about')}
        >
          About
        </Button>
        <Button
          component={Link}
          href="/login"
          startIcon={<LoginIcon />}
          sx={buttonStyle('/login')}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
} 