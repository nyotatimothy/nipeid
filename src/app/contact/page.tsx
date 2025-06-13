'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Alert,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Send as SendIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Report as ReportIcon,
  Update as UpdateIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import MobileNavigation from '@/components/MobileNavigation';
import WebNavigation from '@/components/WebNavigation';

const commonQuestions = [
  {
    question: "How long does it take to find a document?",
    answer: "The time varies depending on the document type and available information. We typically process reports within 24-48 hours."
  },
  {
    question: "What happens after I report a lost document?",
    answer: "We actively search our database and notify relevant authorities. You'll receive updates via email if provided."
  },
  {
    question: "Can I update my report information?",
    answer: "Yes, you can update your report by contacting our support team with your reference number."
  }
];

export default function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    referenceNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit message');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        referenceNumber: ''
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ pb: { xs: 7, sm: 0 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Navigation Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
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

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Contact Form Section */}
            <Box sx={{ flex: { xs: '1', md: '7' } }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: '#059669' }}>
                  Contact Support
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Need help with your lost document report? Our support team is here to assist you.
                </Typography>

                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    {submitError && (
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {submitError}
                      </Alert>
                    )}
                    {submitSuccess && (
                      <Alert severity="success" sx={{ mb: 3 }}>
                        Your message has been sent successfully. We'll get back to you soon.
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                          <TextField
                            label="Your Name"
                            value={formData.name}
                            onChange={handleFormChange('name')}
                            fullWidth
                            required
                          />
                          <TextField
                            label="Phone Number"
                            value={formData.phone}
                            onChange={handleFormChange('phone')}
                            fullWidth
                            required
                          />
                        </Box>
                        
                        <TextField
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={handleFormChange('email')}
                          fullWidth
                          required
                        />

                        <TextField
                          label="Reference Number (if available)"
                          value={formData.referenceNumber}
                          onChange={handleFormChange('referenceNumber')}
                          fullWidth
                          helperText="If you're inquiring about an existing report, please provide your reference number"
                        />

                        <TextField
                          label="Subject"
                          value={formData.subject}
                          onChange={handleFormChange('subject')}
                          fullWidth
                          required
                        />

                        <TextField
                          label="Message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleFormChange('message')}
                          fullWidth
                          required
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isSubmitting}
                          startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                          sx={{ 
                            bgcolor: '#059669',
                            '&:hover': { bgcolor: '#047857' },
                            '&:disabled': { bgcolor: '#059669', opacity: 0.7 }
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Stack>
                    </form>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* Contact Information and FAQ Section */}
            <Box sx={{ flex: { xs: '1', md: '5' } }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Contact Information Card */}
                <Card elevation={3} sx={{ borderRadius: 2, mb: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#059669' }}>
                      Contact Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <EmailIcon sx={{ color: '#059669' }} />
                        <Typography>support@nipeid.com</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <PhoneIcon sx={{ color: '#059669' }} />
                        <Typography>+254 700 000000</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <WhatsAppIcon sx={{ color: '#059669' }} />
                        <Typography>+254 700 000000</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LocationIcon sx={{ color: '#059669' }} />
                        <Typography>Nairobi, Kenya</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AccessTimeIcon sx={{ color: '#059669' }} />
                        <Typography>Mon - Fri, 8:00 AM - 5:00 PM</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* FAQ Section */}
                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#059669' }}>
                      Frequently Asked Questions
                    </Typography>
                    <List>
                      {commonQuestions.map((item, index) => (
                        <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <QuestionAnswerIcon sx={{ color: '#059669' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.question}
                            secondary={item.answer}
                            primaryTypographyProps={{ fontWeight: 'medium' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Mobile Navigation */}
        <MobileNavigation />
      </Box>
    </Box>
  );
} 