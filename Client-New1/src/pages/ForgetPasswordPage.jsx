import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Loader } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { toast } from 'react-hot-toast';

const ForgetPasswordPage = () => {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { forgetPassword } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const data = await forgetPassword(email);
			
			if (data?.success) {
				toast.success(data.message || 'Check your email for the reset code');
				navigate('/reset-password');
			} else {
				toast.error(data?.message || 'An error occurred');
			}
		} catch (error) {
			toast.error('An error occurred while processing your request');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-8"
				>
					<h1 className="text-3xl font-bold mb-2">
						Forgot <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Password</span>
					</h1>
					<p className="text-muted-foreground">
						Enter your email address and we'll send you a reset code
					</p>
				</motion.div>

				{/* Form */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="bg-card rounded-2xl shadow-xl p-8"
				>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium mb-2">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-muted-foreground" />
								</div>
								<input
									id="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
									placeholder="Enter your email address"
								/>
							</div>
						</div>

						<motion.button
							type="submit"
							disabled={isSubmitting}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
								isSubmitting
									? 'bg-muted cursor-not-allowed'
									: 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl'
							}`}
						>
							{isSubmitting ? (
								<>
									<Loader className="h-5 w-5 animate-spin" />
									<span>Sending...</span>
								</>
							) : (
								<>
									<Mail size={18} />
									<span>Send Reset Code</span>
								</>
							)}
						</motion.button>
					</form>

					{/* Back to Login */}
					<div className="mt-6 text-center">
						<Link
							to="/login"
							className="text-primary hover:text-primary/80 transition-colors flex items-center justify-center space-x-2"
						>
							<ArrowLeft size={16} />
							<span>Back to Login</span>
						</Link>
					</div>
				</motion.div>

				{/* Additional Info */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-6 text-center"
				>
					<p className="text-sm text-muted-foreground">
						Don't have an account?{' '}
						<Link to="/signup" className="text-primary hover:text-primary/80 transition-colors">
							Sign up here
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default ForgetPasswordPage;