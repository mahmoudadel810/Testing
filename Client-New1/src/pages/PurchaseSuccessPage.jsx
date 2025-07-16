import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useCartStore } from '../stores/useCartStore';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, Mail } from 'lucide-react';
import axios from '../lib/axios';

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        const response = await axios.post('/payments/checkout-success', {
          sessionId,
        });
        setOrderDetails(response.data);
        clearCart();
        toast.success('Order placed successfully!');
      } catch (error) {
        console.error('Error processing checkout success:', error);
        toast.error('Error processing order');
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      toast.error('No session ID found');
    }
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Processing your order...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Order Confirmed</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Purchase <span className="text-primary">Successful!</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Thank you for your order. We're processing it now and will send you updates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <Card className="w-full max-w-2xl border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Order Confirmed
                </h2>
                <p className="text-muted-foreground">
                  Check your email for order details and tracking information.
                </p>
              </div>

              {orderDetails && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Order Number</p>
                        <p className="font-semibold text-foreground">
                          #{orderDetails.orderNumber || '12345'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email Sent</p>
                        <p className="font-semibold text-foreground">
                          {orderDetails.email || 'customer@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="font-semibold text-foreground">3-5 business days</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-semibold text-primary">
                        ${orderDetails.total || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full" size="lg">
                  <Link to="/profile">
                    View Order History
                  </Link>
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">What's Next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You'll receive an order confirmation email</li>
                  <li>• We'll notify you when your order ships</li>
                  <li>• Track your package with the provided tracking number</li>
                  <li>• Contact us if you have any questions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;