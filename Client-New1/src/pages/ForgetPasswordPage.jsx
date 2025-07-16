import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useUserStore } from '../stores/useUserStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Loader } from 'lucide-react';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { forgetPassword, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await forgetPassword(email);
      if (data.success) {
        navigate('/reset-password');
        toast.success(data.message || 'Check your email for the reset code');
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Reset Password</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Forgot Your <span className="text-primary">Password?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter your email address and we'll send you a code to reset your password.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <Card className="w-full max-w-md border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Reset Password
              </CardTitle>
              <p className="text-muted-foreground">
                We'll send a reset code to your email address.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Code'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button variant="ghost" asChild>
                  <Link to="/login" className="flex items-center justify-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;