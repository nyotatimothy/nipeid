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
import { z } from 'zod';
import { useTranslation } from '@/utils/translations';
import { en } from '@/locales/en';

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

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long')
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitCount, setSubmitCount] = useState(0);

  const validateForm = () => {
    try {
      contactSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<ContactForm> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactForm] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (submitCount >= 5) {
      setSubmitStatus('error');
      setErrors({ message: 'Too many attempts. Please try again later.' });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitCount(prev => prev + 1);
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image 
                  src="/nipeID.png" 
                  alt={t<string>('common.appName')}
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
                  {t<string>('contact.title')}
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 4,
                  textAlign: 'center',
                  maxWidth: '800px',
                  mx: 'auto'
                }}>
                  {t<string>('contact.subtitle')}
                </Typography>

                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    {submitStatus === 'success' && (
                      <Alert severity="success" sx={{ mb: 3 }}>
                        {t<string>('contact.form.success')}
                      </Alert>
                    )}
                    {submitStatus === 'error' && (
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {errors.message || t<string>('contact.form.error')}
                      </Alert>
                    )}
                    {submitCount >= 5 && (
                      <Alert severity="warning" sx={{ mb: 3 }}>
                        {t<string>('contact.form.tooManyAttempts')}
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        <TextField
                          label={t<string>('contact.form.name')}
                          value={form.name}
                          onChange={handleChange('name')}
                          error={!!errors.name}
                          helperText={errors.name}
                          fullWidth
                          required
                        />
                        <TextField
                          label={t<string>('contact.form.email')}
                          type="email"
                          value={form.email}
                          onChange={handleChange('email')}
                          error={!!errors.email}
                          helperText={errors.email}
                          fullWidth
                          required
                        />
                        <TextField
                          label={t<string>('contact.form.subject')}
                          value={form.subject}
                          onChange={handleChange('subject')}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          fullWidth
                          required
                        />
                        <TextField
                          label={t<string>('contact.form.message')}
                          multiline
                          rows={4}
                          value={form.message}
                          onChange={handleChange('message')}
                          error={!!errors.message}
                          helperText={errors.message}
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
                          {isSubmitting ? t<string>('contact.form.sending') : t<string>('contact.form.submit')}
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
                      {t<string>('contact.info.title')}
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <EmailIcon sx={{ color: '#059669' }} />
                        <Typography>{t<string>('contact.info.email')}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <PhoneIcon sx={{ color: '#059669' }} />
                        <Typography>{t<string>('contact.info.phone')}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <WhatsAppIcon sx={{ color: '#059669' }} />
                        <Typography>{t<string>('contact.info.whatsapp')}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LocationIcon sx={{ color: '#059669' }} />
                        <Typography>{t<string>('contact.info.location')}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AccessTimeIcon sx={{ color: '#059669' }} />
                        <Typography>{t<string>('contact.info.hours')}</Typography>
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