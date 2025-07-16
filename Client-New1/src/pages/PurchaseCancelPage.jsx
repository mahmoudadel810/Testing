import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingCart, HelpCircle } from 'lucide-react';

const PurchaseCancelPage = () => {
	return (
		<div className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
			<div className="max-w-2xl w-full">
				{/* Cancel Header */}
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
						className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<XCircle className="text-red-600 w-12 h-12" />
					</motion.div>
					<h1 className="text-4xl font-bold mb-4">
						Order <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Cancelled</span>
					</h1>
					<p className="text-xl text-muted-foreground">
						Your order has been cancelled. No charges have been made to your account.
					</p>
				</motion.div>

				{/* Info Card */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="bg-card rounded-2xl shadow-xl p-8 mb-8"
				>
					<div className="flex items-start space-x-4">
						<HelpCircle className="text-primary mt-1" size={24} />
						<div>
							<h3 className="text-lg font-semibold mb-2">Need Help?</h3>
							<p className="text-muted-foreground mb-4">
								If you encountered any issues during the checkout process or have questions about your order, 
								our support team is here to help.
							</p>
							<div className="space-y-2 text-sm text-muted-foreground">
								<p>• Check your payment method and try again</p>
								<p>• Contact our support team for assistance</p>
								<p>• Review your cart items before checkout</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
				>
					<Link
						to="/cart"
						className="bg-primary text-white py-4 px-6 rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
					>
						<ShoppingCart size={20} />
						<span>Return to Cart</span>
					</Link>
					<Link
						to="/"
						className="bg-secondary text-foreground py-4 px-6 rounded-xl hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
					>
						<ArrowLeft size={20} />
						<span>Continue Shopping</span>
					</Link>
				</motion.div>

				{/* Contact Support */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-8 text-center"
				>
					<p className="text-muted-foreground mb-2">
						Still having trouble? Contact our support team
					</p>
					<Link
						to="/contact"
						className="text-primary hover:text-primary/80 transition-colors font-medium"
					>
						Get Help Now
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default PurchaseCancelPage;