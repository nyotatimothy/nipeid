'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Stack,
  Alert,
  Chip
} from '@mui/material';
import { MpesaPaymentModal } from '@/components/MpesaPaymentModal';

export default function TestPaymentPage() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [completedPayments, setCompletedPayments] = useState<string[]>([]);

  const handlePaymentComplete = (paymentId: string) => {
    setCompletedPayments(prev => [...prev, paymentId]);
    // You can add additional logic here like redirecting to a success page
    console.log('Payment completed:', paymentId);
  };

  const testDocuments = [
    {
      id: 'test-doc-001',
      number: 'ID-2024-001',
      type: 'National ID',
      amount: 50
    },
    {
      id: 'test-doc-002', 
      number: 'ID-2024-002',
      type: 'Passport',
      amount: 100
    },
    {
      id: 'test-doc-003',
      number: 'ID-2024-003', 
      type: 'Driving License',
      amount: 75
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        M-Pesa Payment Test
      </Typography>
      
      <Alert severity="info" sx={{ mb: 4 }}>
        This is a test page for the M-Pesa payment integration. All payments are simulated and no real money will be charged.
      </Alert>

      {/* Test Documents */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Test Documents
      </Typography>
      
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        {testDocuments.map((doc) => (
          <Card key={doc.id} sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {doc.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Document Number: {doc.number}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                KES {doc.amount}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setPaymentModalOpen(true)}
              >
                Pay with M-Pesa
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Completed Payments */}
      {completedPayments.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Completed Payments
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {completedPayments.map((paymentId, index) => (
              <Chip
                key={index}
                label={`Payment: ${paymentId.slice(-8)}`}
                color="success"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Payment Modal */}
      <MpesaPaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        documentId="test-doc-001"
        documentNumber="ID-2024-001"
        amount={50}
        onPaymentComplete={handlePaymentComplete}
      />
    </Container>
  );
} 