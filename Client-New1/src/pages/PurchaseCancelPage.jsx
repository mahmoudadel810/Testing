import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, HelpCircle, ShoppingCart } from 'lucide-react';

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Order Cancelled</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Purchase <span className="text-destructive">Cancelled</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your order has been cancelled. No charges have been made to your account.
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
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Order Cancelled
                </h2>
                <p className="text-muted-foreground">
                  No charges have been made to your account.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      If you encountered any issues during the checkout process, please don't hesitate to 
                      contact our support team. We're here to help!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Return to Shop
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full" size="lg">
                  <Link to="/contact">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">What happened?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your payment was not processed</li>
                  <li>• No charges were made to your account</li>
                  <li>• Your cart items are still available</li>
                  <li>• You can try the checkout process again</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PurchaseCancelPage;