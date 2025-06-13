'use client';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { People as PeopleIcon } from '@mui/icons-material';
import MobileNavigation from '@/components/MobileNavigation';
import WebNavigation from '@/components/WebNavigation';
import Image from 'next/image';
import { useTranslation } from '@/utils/translations';
import { en } from '@/locales/en';

const featureKeys = ['quickSearch', 'secureVerification', 'realTimeUpdates', 'nationwideNetwork'] as const;
const statKeys = ['documentsFound', 'documentsReturned', 'activeUsers', 'partnerKiosks'] as const;

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const features = [
    {
      key: 'quickSearch',
      icon: SearchIcon,
    },
    {
      key: 'secureVerification',
      icon: SecurityIcon,
    },
    {
      key: 'realTimeUpdates',
      icon: AccessTimeIcon,
    },
    {
      key: 'nationwideNetwork',
      icon: LocationOnIcon,
    },
  ];

  const stats = [
    { key: 'documentsFound', icon: DocumentScannerIcon },
    { key: 'documentsReturned', icon: VerifiedUserIcon },
    { key: 'activeUsers', icon: PeopleIcon },
    { key: 'partnerKiosks', icon: LocationOnIcon },
  ];

  return (
    <Box sx={{ pb: { xs: 7, sm: 0 } }}>
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              pt: { xs: 4, sm: 8 },
              pb: { xs: 4, sm: 8 },
              textAlign: 'center'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 4,
              position: 'absolute',
              top: 32,
              left: 32
            }}>
              <Image 
                src="/nipeID.png" 
                alt={t('common.appName')} 
                width={80} 
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <WebNavigation />
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#059669',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {t('about.title')}
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {t('about.subtitle')}
            </Typography>
          </Box>

          {/* About Section */}
          <Box
            sx={{
              py: { xs: 4, sm: 8 },
              textAlign: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #059669, transparent)',
                borderRadius: '2px'
              }
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                color: theme.palette.text.secondary,
                fontSize: isMobile ? '0.875rem' : '1rem',
                lineHeight: 1.8,
                backgroundColor: 'rgba(255,255,255,0.8)',
                padding: 3,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              {t('about.description')}
            </Typography>
          </Box>

          {/* Features Section */}
          <Box
            sx={{
              py: { xs: 4, sm: 8 },
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h2"
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 4
              }}
            >
              {t('about.features.title')}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: 'repeat(4, 1fr)'
                },
                gap: 3
              }}
            >
              {features.map((feature, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <feature.icon
                    sx={{
                      fontSize: isMobile ? 32 : 40,
                      color: '#059669',
                      mb: 2
                    }}
                  />
                  <Typography 
                    variant={isMobile ? "subtitle1" : "h6"} 
                    gutterBottom
                    sx={{ fontWeight: 'medium' }}
                  >
                    {t(`about.features.${feature.key}.title`)}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      lineHeight: 1.6
                    }}
                  >
                    {t(`about.features.${feature.key}.description`)}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>

          {/* Stats Section */}
          <Box
            sx={{
              py: { xs: 4, sm: 8 },
              bgcolor: 'background.default',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              borderRadius: 4,
              mt: 4
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h2"
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 4,
                color: 'white'
              }}
            >
              {t('about.impact.title')}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: 'repeat(4, 1fr)'
                },
                gap: 3
              }}
            >
              {stats.map((stat, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <stat.icon
                    sx={{
                      fontSize: isMobile ? 32 : 40,
                      color: 'white',
                      mb: 1
                    }}
                  />
                  <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    component="div" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: 'white' }}
                  >
                    {t(`about.impact.stats.${stat.key}.value`)}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      color: 'rgba(255,255,255,0.8)'
                    }}
                  >
                    {t(`about.impact.stats.${stat.key}.label`)}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </Container>
      </Box>
    </Box>
  );
} 