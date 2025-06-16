import { useState, useCallback } from 'react';

interface PaymentRequest {
  documentId: string;
  phoneNumber: string;
  amount?: number;
  testMode?: boolean;
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  checkoutRequestId?: string;
  message?: string;
  testMode?: boolean;
  details?: any;
}

interface PaymentStatus {
  success: boolean;
  paymentId?: string;
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  message?: string;
  details?: any;
}

export const useMpesaPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);

  const initiatePayment = useCallback(async (request: PaymentRequest): Promise<PaymentResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/test-payment-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...request,
          testMode: request.testMode ?? true,
          amount: request.amount ?? 50
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed');
      }

      if (data.success && data.paymentId) {
        setPaymentId(data.paymentId);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment initiation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkPaymentStatus = useCallback(async (paymentId: string): Promise<PaymentStatus> => {
    try {
      const response = await fetch('/api/test-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Status check failed');
      }

      setPaymentStatus(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Status check failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const pollPaymentStatus = useCallback(async (
    paymentId: string, 
    onStatusChange?: (status: PaymentStatus) => void,
    maxAttempts: number = 5,
    pollInterval: number = 3000,
    maxPollTime: number = 30000 // 30 seconds max polling time
  ): Promise<PaymentStatus> => {
    let attempts = 0;
    const startTime = Date.now();
    let lastStatus: PaymentStatus | null = null;
    
    const poll = async (): Promise<PaymentStatus> => {
      // Check if we've exceeded the maximum polling time
      if (Date.now() - startTime > maxPollTime) {
        console.log('Max polling time reached');
        
        // If we have a last status, return it, otherwise create a timeout status
        if (lastStatus) {
          return {
            ...lastStatus,
            message: 'Payment processing timed out. Please check your M-Pesa for confirmation.'
          };
        }
        
        return {
          success: false,
          status: 'FAILED',
          message: 'Payment processing timed out. Please check your M-Pesa for confirmation.',
          paymentId
        };
      }
      
      attempts++;
      console.log(`Polling attempt ${attempts} of ${maxAttempts}`);
      
      try {
        const status = await checkPaymentStatus(paymentId);
        lastStatus = status;
        
        if (onStatusChange) {
          onStatusChange(status);
        }

        // Stop if we get a final status or reach max attempts
        if (status.status === 'COMPLETED' || status.status === 'FAILED') {
          console.log(`Final status reached: ${status.status}`);
          return status;
        }
        
        if (attempts >= maxAttempts) {
          console.log(`Max attempts (${maxAttempts}) reached`);
          return {
            ...status,
            message: 'Payment is still processing. Please check your M-Pesa for confirmation.'
          };
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        return poll();
      } catch (error) {
        console.error('Error during polling:', error);
        
        // If we've reached max attempts or have an error, stop polling
        if (attempts >= maxAttempts) {
          return {
            success: false,
            status: 'FAILED',
            message: 'Failed to check payment status. Please check your M-Pesa for confirmation.',
            paymentId
          };
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        return poll();
      }
    };

    return poll();
  }, [checkPaymentStatus]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setPaymentId(null);
    setPaymentStatus(null);
  }, []);

  return {
    loading,
    error,
    paymentId,
    paymentStatus,
    initiatePayment,
    checkPaymentStatus,
    pollPaymentStatus,
    reset
  };
};
