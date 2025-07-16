import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './stores/useUserStore';
import { useCartStore } from './stores/useCartStore';
import { useWishlistStore } from './stores/useWishlistStore';

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
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import PurchaseCancelPage from './pages/PurchaseCancelPage';
import WishlistPage from './pages/WishlistPage';
import CategoryPage from './pages/CategoryPage';

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	const { getWishlistItems } = useWishlistStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (user) {
			getCartItems();
			getWishlistItems();
		}
	}, [getCartItems, getWishlistItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/product/:id" element={<ProductDetailPage />} />
				<Route path="/category/:category" element={<CategoryPage />} />
				<Route path="/wishlist" element={user ? <WishlistPage /> : <Navigate to="/login" />} />
				
				{/* Auth Routes */}
				<Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
				<Route path="/forget-password" element={<ForgetPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
				
				{/* Protected Routes */}
				<Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
				<Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
				<Route path="/admin" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
				<Route path="/purchase-success" element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />} />
				<Route path="/purchase-cancel" element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />} />
			</Routes>
			
			<Toaster 
				position="top-right"
				toastOptions={{
					duration: 4000,
					style: {
						background: 'var(--background)',
						color: 'var(--foreground)',
						border: '1px solid var(--border)',
					},
				}}
			/>
		</div>
	);
}

export default App;

