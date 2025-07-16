import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, Mail, Clock } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import axios from '../lib/axios';
import Confetti from 'react-confetti';

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const [orderDetails, setOrderDetails] = useState(null);
	const [error, setError] = useState(null);
	const { clearCart } = useCartStore();

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				const response = await axios.post('/payments/checkout-success', {
					sessionId,
				});
				setOrderDetails(response.data);
				clearCart();
			} catch (error) {
				console.error('Error processing checkout success:', error);
				setError('Failed to process order details');
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get('session_id');
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError('No session ID found in the URL');
		}
	}, [clearCart]);

	if (isProcessing) {
		return (
			<div className="min-h-screen bg-background pt-16 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
					<p className="text-muted-foreground">Processing your order...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
				<div className="text-center">
					<div className="text-destructive text-6xl mb-4">⚠️</div>
					<h1 className="text-2xl font-bold mb-2">Error Processing Order</h1>
					<p className="text-muted-foreground mb-6">{error}</p>
					<Link
						to="/"
						className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
					>
						Return to Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pt-16">
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="max-w-2xl mx-auto">
					{/* Success Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-8"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
						>
							<CheckCircle className="text-green-600 w-12 h-12" />
						</motion.div>
						<h1 className="text-4xl font-bold mb-4">
							Order <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Successful!</span>
						</h1>
						<p className="text-xl text-muted-foreground">
							Thank you for your purchase. We're processing your order now.
						</p>
					</motion.div>

					{/* Order Details */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="bg-card rounded-2xl shadow-xl p-8 mb-8"
					>
						<h2 className="text-2xl font-bold mb-6">Order Details</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
								<div className="flex items-center space-x-3">
									<Package className="text-primary" size={20} />
									<span className="font-medium">Order Number</span>
								</div>
								<span className="font-bold text-primary">
									#{orderDetails?.orderNumber || '12345'}
								</span>
							</div>
							<div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
								<div className="flex items-center space-x-3">
									<Mail className="text-primary" size={20} />
									<span className="font-medium">Confirmation Email</span>
								</div>
								<span className="text-muted-foreground">Sent</span>
							</div>
							<div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
								<div className="flex items-center space-x-3">
									<Clock className="text-primary" size={20} />
									<span className="font-medium">Estimated Delivery</span>
								</div>
								<span className="font-medium">3-5 business days</span>
							</div>
						</div>
					</motion.div>

					{/* Next Steps */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 mb-8"
					>
						<h3 className="text-2xl font-bold text-white mb-4">What's Next?</h3>
						<div className="space-y-3 text-white/90">
							<p>• You'll receive an order confirmation email shortly</p>
							<p>• We'll notify you when your order ships</p>
							<p>• Track your package with the provided tracking number</p>
							<p>• Contact us if you have any questions</p>
						</div>
					</motion.div>

					{/* Action Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="grid grid-cols-1 md:grid-cols-2 gap-4"
					>
						<Link
							to="/"
							className="bg-primary text-white py-4 px-6 rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
						>
							<ArrowRight size={20} />
							<span>Continue Shopping</span>
						</Link>
						<Link
							to="/profile"
							className="bg-secondary text-foreground py-4 px-6 rounded-xl hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
						>
							<Package size={20} />
							<span>View Orders</span>
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;