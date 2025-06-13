'use client';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Speed as SpeedIcon,
  LocationOn as LocationIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import WebNavigation from '@/components/WebNavigation';
import { useTranslation } from '@/utils/translations';
import { en } from '@/locales/en';

type Feature = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: '#059669' }} />,
    title: 'Secure Document Management',
    description: 'Advanced encryption and secure storage for all your identification documents.'
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: '#059669' }} />,
    title: 'Quick Recovery',
    description: 'Fast and efficient document recovery process through our network of kiosks.'
  },
  {
    icon: <LocationIcon sx={{ fontSize: 40, color: '#059669' }} />,
    title: 'Nationwide Coverage',
    description: 'Extensive network of kiosks across Kenya for convenient document pickup.'
  },
  {
    icon: <NotificationsIcon sx={{ fontSize: 40, color: '#059669' }} />,
    title: 'Real-time Notifications',
    description: 'Instant alerts when your documents are found and ready for collection.'
  }
];

const faqs = [
  {
    question: 'How do I search for my lost document?',
    answer: 'Simply enter your document number or name in the search bar on our homepage. Our system will check if your document has been found and is available for collection.'
  },
  {
    question: 'What types of documents can I find through NipeID?',
    answer: 'We handle various identification documents including National IDs, Passports, Driving Licenses, and Student IDs.'
  },
  {
    question: 'How long does it take to recover a document?',
    answer: 'Once your document is found in our system, you can collect it immediately from your nearest kiosk. The entire process typically takes less than 24 hours.'
  },
  {
    question: 'What do I need to bring when collecting my document?',
    answer: `You'll need to bring a valid form of identification and the reference number provided during your search.`
  },
  {
    question: 'Is there a fee for using NipeID services?',
    answer: 'Basic document search is free. A small administrative fee may apply for document collection and verification.'
  },
  {
    question: 'How secure is my information?',
    answer: 'We employ bank-grade encryption and security measures to protect all personal information and documents in our system.'
  },
  {
    question: 'How do I report a lost document?',
    answer: 'You can report a lost document through our search page. If your document is not found in our system, you will be given the option to file a report.'
  },
  {
    question: 'Can I get notifications when my document is found?',
    answer: 'Yes, we will notify you via email and SMS when your document is found and ready for collection.'
  },
  {
    question: 'What happens if someone claims my document?',
    answer: 'We have a strict verification process to ensure documents are only released to their rightful owners. Multiple forms of identification are required.'
  },
  {
    question: 'How can I contact support?',
    answer: 'You can reach our support team through the contact form, email, phone, or WhatsApp. We aim to respond within 24 hours.'
  }
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ pb: { xs: 7, sm: 0 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Navigation Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                  {t<string>('common.appName')}
                </Typography>
              </Box>
            </Link>
            <WebNavigation />
          </Box>

          {/* About Section */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#059669' }}>
              {t<string>('about.title')}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: '#059669', opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
              {t<string>('about.subtitle')}
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 4, 
              maxWidth: '800px', 
              mx: 'auto',
              color: '#1f2937',
              fontSize: '1.1rem',
              lineHeight: 1.7
            }}>
              {t<string>('about.description')}
            </Typography>
          </Box>

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#059669', textAlign: 'center' }}>
              {t<string>('about.features.title')}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
              {Object.entries(t<typeof en.about.features.items>('about.features.items')).map(([key, feature], index) => (
                <Box key={key}>
                  <Card 
                    elevation={3} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box sx={{ mb: 2 }}>{features[index].icon}</Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {(feature as Feature).title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {(feature as Feature).description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* FAQs Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#059669', textAlign: 'center' }}>
              {t<string>('about.faq.title')}
            </Typography>
            <Stack spacing={2}>
              {t<typeof en.about.faq.items>('about.faq.items').map((faq: { question: string; answer: string }, index: number) => (
                <Accordion key={index} sx={{ borderRadius: '8px !important' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      backgroundColor: '#f0fdf4',
                      borderRadius: '8px !important',
                      '&.Mui-expanded': {
                        borderBottomLeftRadius: '0 !important',
                        borderBottomRightRadius: '0 !important'
                      }
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Box>

          {/* Mission Section */}
          <Box>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#059669' }}>
                  {t<string>('about.mission.title')}
                </Typography>
                <Typography variant="body1">
                  {t<string>('about.mission.description')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  );
} 