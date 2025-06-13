'use client';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Home as HomeIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        display: { xs: 'block', sm: 'none' },
        zIndex: 1100
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={pathname}
        showLabels
        sx={{
          bgcolor: 'white',
          '& .Mui-selected': {
            color: '#059669 !important'
          },
          '& .MuiBottomNavigationAction-root': {
            color: '#64748b',
            '&:hover': {
              color: '#047857'
            }
          }
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          value="/" 
          icon={<HomeIcon />} 
          component={Link}
          href="/"
        />
        <BottomNavigationAction 
          label="Contact" 
          value="/contact" 
          icon={<ContactIcon />} 
          component={Link}
          href="/contact"
        />
        <BottomNavigationAction 
          label="About" 
          value="/about" 
          icon={<InfoIcon />} 
          component={Link}
          href="/about"
        />
        <BottomNavigationAction 
          label="Login" 
          value="/login" 
          icon={<LoginIcon />} 
          component={Link}
          href="/login"
        />
      </BottomNavigation>
    </Paper>
  );
} 