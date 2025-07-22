import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { initializePayment, verifyPayment } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaystackButton } from "react-paystack";

const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPriceNGN, clearCart } = useCart();
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  useEffect(() => {
    if (items.length > 0 && !paymentUrl) {
      const initializePaymentProcess = async () => {
        setLoading(true);
        try {
          const email = 'customer@example.com'; // Replace with actual user email
          const response = await initializePayment(email, totalPriceNGN);

          if (!response.data.authorization_url) {
            throw new Error('Invalid payment URL');
          }

          setPaymentUrl(response.data.authorization_url);
          setReference(response.data.reference);
        } catch (err) {
          setError('Failed to initialize payment. Please try again.');
          console.error('Payment initialization error');
        } finally {
          setLoading(false);
        }
      };

      initializePaymentProcess();
    }
  }, [items, totalPriceNGN, paymentUrl]);

  const handlePaymentVerification = async () => {
    if (!reference) return;

    setLoading(true);
    try {
      const response = await verifyPayment(reference);
      if (response.data.status === 'success') {
        clearCart();
        navigate('/order-success');
      } else {
        setError('Payment verification failed. Please contact support.');
      }
    } catch (err) {
      setError('Failed to verify payment. Please try again.');
      console.error('Payment verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async (reference: any) => {
    const res = await fetch('/api/orders/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference: reference.reference }),
    });
    const data = await res.json();
    if (data.success) {
      // Show success message, update UI, etc.
    } else {
      // Handle failure
    }
  };

  const handleClose = () => {
    // Handle modal close if needed
  };

  if (loading) return <div className="text-center py-8">Processing payment...</div>;
  if (!items || items.length === 0) return <div className="text-center py-8">Redirecting to cart...</div>;

  return (
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="font-semibold">₦{totalPriceNGN.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {paymentUrl ? (
          <div className="space-y-4">
            <PaystackButton
              email="user@example.com"
              amount={16194000} // ₦161,940 in kobo
              publicKey={publicKey}
              text="Pay Now"
              onSuccess={handleSuccess}
              onClose={handleClose}
            />
            <p className="text-sm text-gray-600 text-center">
              You'll be redirected to Paystack's secure payment page
            </p>
          </div>
        ) : (
          <div className="text-center py-4">Preparing payment gateway...</div>
        )}

        {reference && (
          <div className="mt-6">
            <Button
              onClick={handlePaymentVerification}
              className="w-full"
              variant="outline"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Already Paid? Verify Payment'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Checkout;