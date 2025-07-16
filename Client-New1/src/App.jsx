import React, { memo, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import PurchaseCancelPage from './pages/PurchaseCancelPage';

// Stores
import { useUserStore } from './stores/useUserStore';
import { useCartStore } from './stores/useCartStore';
import { useProductStore } from './stores/useProductStore';
import { useWishlistStore } from './stores/useWishlistStore';

import './App.css';

const App = memo(() => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const { fetchFeaturedProducts } = useProductStore();
  const { fetchWishlist } = useWishlistStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
      fetchWishlist();
    }
  }, [getCartItems, fetchWishlist, user]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          
          {/* Auth Routes */}
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <SignUpPage /> : <Navigate to="/" />} 
          />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/cart" 
            element={user ? <CartPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/wishlist" 
            element={user ? <WishlistPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/purchase-success" 
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/purchase-cancel" 
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />} 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </motion.div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
});

App.displayName = 'App';

export default App;

