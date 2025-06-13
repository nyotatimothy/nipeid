'use client';
import { Box, Button, useTheme } from '@mui/material';
import {
  Home as HomeIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

export default function WebNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

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
        top: 32,
        right: 32,
        display: { xs: 'none', sm: 'flex' },
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          startIcon={<HomeIcon />}
          onClick={() => handleNavigation('/')}
          sx={buttonStyle('/')}
        >
          Home
        </Button>
        <Button
          startIcon={<ContactIcon />}
          onClick={() => handleNavigation('/contact')}
          sx={buttonStyle('/contact')}
        >
          Contact
        </Button>
        <Button
          startIcon={<InfoIcon />}
          onClick={() => handleNavigation('/about')}
          sx={buttonStyle('/about')}
        >
          About
        </Button>
        <Button
          startIcon={<LoginIcon />}
          onClick={() => handleNavigation('/login')}
          sx={buttonStyle('/login')}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
} 