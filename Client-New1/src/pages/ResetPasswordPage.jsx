import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useUserStore } from '../stores/useUserStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Key, ArrowLeft, Loader } from 'lucide-react';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    code: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const navigate = useNavigate();
  const { resetPassword, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const data = await resetPassword(formData);
      if (data.success) {
        navigate('/login');
        toast.success(data.message || 'Password updated successfully');
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            Reset Your <span className="text-primary">Password</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter the code from your email and create a new password.
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
                Create New Password
              </CardTitle>
              <p className="text-muted-foreground">
                Enter the verification code and your new password.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                    Verification Code
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      required
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="Enter 6-digit code"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type="password"
                      required
                      value={formData.confirmNewPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
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
                      Updating...
                    </div>
                  ) : (
                    'Update Password'
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

export default ResetPasswordPage;