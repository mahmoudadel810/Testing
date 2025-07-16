import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useUserStore } from '../stores/useUserStore';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  // Mock purchase history - replace with real data from API
  const purchaseHistory = [
    { id: 1, item: 'Wireless Headphones', price: 59.99, date: '2024-01-15', status: 'Delivered' },
    { id: 2, item: 'Smart Watch', price: 129.99, date: '2024-01-10', status: 'Delivered' },
    { id: 3, item: 'Bluetooth Speaker', price: 39.99, date: '2024-01-05', status: 'Delivered' },
  ];

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Please log in to view your profile.</p>
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
          <Badge variant="secondary" className="mb-4">Profile</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            My <span className="text-primary">Profile</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-6">
                  <AvatarImage src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0ea5e9&color=fff`} />
                  <AvatarFallback className="text-2xl">{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold text-foreground mb-2">{user.name}</h2>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                
                <Badge variant="outline" className="mb-6">
                  {user.role === 'admin' ? 'Administrator' : 'Customer'}
                </Badge>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm font-medium">
                      {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Total Orders</span>
                    <span className="text-sm font-medium">{purchaseHistory.length}</span>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {isLoading ? 'Logging out...' : 'Logout'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Purchase History */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Purchase History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {purchaseHistory.length > 0 ? (
                  <div className="space-y-4">
                    {purchaseHistory.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{purchase.item}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(purchase.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">${purchase.price}</p>
                          <Badge variant="secondary" className="text-xs">
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No purchases yet</h3>
                    <p className="text-muted-foreground">Start shopping to see your purchase history here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;