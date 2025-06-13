'use client';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Home as HomeIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

export default function MobileNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        display: { xs: 'block', sm: 'none' },
        zIndex: 1000
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={pathname}
        onChange={handleChange}
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
        />
        <BottomNavigationAction 
          label="Contact" 
          value="/contact" 
          icon={<ContactIcon />} 
        />
        <BottomNavigationAction 
          label="About" 
          value="/about" 
          icon={<InfoIcon />} 
        />
        <BottomNavigationAction 
          label="Login" 
          value="/login" 
          icon={<LoginIcon />} 
        />
      </BottomNavigation>
    </Paper>
  );
} 