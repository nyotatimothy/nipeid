'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { useMpesaPayment } from '@/hooks/useMpesaPayment';

interface MpesaPaymentModalProps {
  open: boolean;
  onClose: () => void;
  documentId: string;
  documentNumber: string;
  amount?: number;
  onPaymentComplete?: (paymentId: string) => void;
}

export const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({
  open,
  onClose,
  documentId,
  documentNumber,
  amount = 50,
  onPaymentComplete
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  
  const {
    loading,
    error,
    paymentId,
    paymentStatus,
    initiatePayment,
    pollPaymentStatus,
    reset
  } = useMpesaPayment();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      reset();
      setPhoneNumber('');
    }
  }, [open, reset]);

  // Handle payment completion
  useEffect(() => {
    if (paymentStatus?.status === 'COMPLETED' && paymentId && onPaymentComplete) {
      onPaymentComplete(paymentId);
    }
  }, [paymentStatus, paymentId, onPaymentComplete]);

  const handlePaymentInitiation = async () => {
    if (!phoneNumber.trim()) {
      return;
    }

    try {
      const response = await initiatePayment({
        documentId,
        phoneNumber: phoneNumber.trim(),
        amount,
        testMode: true
      });

      if (response.success && response.paymentId) {
        // Start polling for status
        setIsPolling(true);
        
        // Poll with a maximum of 5 attempts, 3 second interval, and 30 second timeout
        const finalStatus = await pollPaymentStatus(
          response.paymentId, 
          (status) => {
            console.log('Payment status update:', status);
          },
          5,    // maxAttempts
          3000, // pollInterval in ms
          30000 // maxPollTime in ms
        );
        
        console.log('Final payment status:', finalStatus);
        
        // If we have a completed payment and callback is provided
        if (finalStatus.status === 'COMPLETED' && onPaymentComplete) {
          onPaymentComplete(response.paymentId);
        }
      }
    } catch (err) {
      console.error('Payment initiation failed:', err);
    } finally {
      setIsPolling(false);
    }
  };

  const handleClose = () => {
    if (!loading && !isPolling) {
      onClose();
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'FAILED': return 'error';
      case 'PROCESSING': return 'warning';
      default: return 'default';
    }
  };

  const getStatusMessage = (status?: string) => {
    switch (status) {
      case 'COMPLETED': return 'Payment completed successfully!';
      case 'FAILED': return 'Payment failed. Please try again.';
      case 'PROCESSING': return 'Payment is being processed...';
      case 'PENDING': return 'Payment is pending...';
      default: return 'Unknown status';
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6">M-Pesa Payment</Typography>
          {paymentStatus && (
            <Chip
              label={paymentStatus.status}
              color={getStatusColor(paymentStatus.status) as any}
              size="small"
            />
          )}
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={3}>
          {/* Document Info */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Document Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              Document Number: <strong>{documentNumber}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Amount: <strong>KES {amount}</strong>
            </Typography>
          </Box>

          <Divider />

          {/* Phone Number Input */}
          {!paymentId && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Enter M-Pesa Phone Number
              </Typography>
              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 07XXXXXXXX or +2547XXXXXXXX"
                disabled={loading}
                helperText="Enter the phone number registered with M-Pesa"
              />
            </Box>
          )}

          {/* Error Display */}
          {error && (
            <Alert severity="error" onClose={() => reset()}>
              {error}
            </Alert>
          )}

          {/* Payment Status */}
          {paymentStatus && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Payment Status
              </Typography>
              <Alert severity={getStatusColor(paymentStatus.status) as any}>
                {getStatusMessage(paymentStatus.status)}
              </Alert>
              {paymentStatus.details && (
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Receipt: {paymentStatus.details.mpesaReceiptNumber}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Loading State */}
          {(loading || isPolling) && (
            <Box display="flex" alignItems="center" gap={2}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                {loading ? 'Initiating payment...' : 'Checking payment status...'}
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading || isPolling}>
          {paymentStatus?.status === 'COMPLETED' ? 'Close' : 'Cancel'}
        </Button>
        
        {!paymentId && (
          <Button
            onClick={handlePaymentInitiation}
            variant="contained"
            disabled={!phoneNumber.trim() || loading}
            startIcon={loading && <CircularProgress size={16} />}
          >
            {loading ? 'Initiating...' : 'Pay with M-Pesa'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
