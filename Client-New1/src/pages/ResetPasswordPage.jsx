import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Loader, Key } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { toast } from 'react-hot-toast';

const ResetPasswordPage = () => {
	const [formData, setFormData] = useState({
		code: '',
		newPassword: '',
		confirmNewPassword: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { resetPassword } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const data = await resetPassword(formData);
			
			if (data?.success) {
				toast.success(data.message || 'Password updated successfully');
				navigate('/login');
			} else {
				toast.error(data?.message || 'An error occurred');
			}
		} catch (error) {
			toast.error('An error occurred while resetting your password');
		} finally {
			setIsSubmitting(false);
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
						Reset <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Password</span>
					</h1>
					<p className="text-muted-foreground">
						Enter the code from your email and your new password
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
						{/* Reset Code */}
						<div>
							<label htmlFor="code" className="block text-sm font-medium mb-2">
								Reset Code
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Key className="h-5 w-5 text-muted-foreground" />
								</div>
								<input
									id="code"
									name="code"
									type="text"
									required
									value={formData.code}
									onChange={handleInputChange}
									className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
									placeholder="Enter reset code"
								/>
							</div>
						</div>

						{/* New Password */}
						<div>
							<label htmlFor="newPassword" className="block text-sm font-medium mb-2">
								New Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-muted-foreground" />
								</div>
								<input
									id="newPassword"
									name="newPassword"
									type="password"
									required
									value={formData.newPassword}
									onChange={handleInputChange}
									className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
									placeholder="Enter new password"
								/>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label htmlFor="confirmNewPassword" className="block text-sm font-medium mb-2">
								Confirm New Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-muted-foreground" />
								</div>
								<input
									id="confirmNewPassword"
									name="confirmNewPassword"
									type="password"
									required
									value={formData.confirmNewPassword}
									onChange={handleInputChange}
									className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
									placeholder="Confirm new password"
								/>
							</div>
							{formData.newPassword && formData.confirmNewPassword && formData.newPassword !== formData.confirmNewPassword && (
								<p className="mt-1 text-sm text-destructive">
									Passwords do not match
								</p>
							)}
						</div>

						<motion.button
							type="submit"
							disabled={isSubmitting || (formData.newPassword && formData.confirmNewPassword && formData.newPassword !== formData.confirmNewPassword)}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
								isSubmitting || (formData.newPassword && formData.confirmNewPassword && formData.newPassword !== formData.confirmNewPassword)
									? 'bg-muted cursor-not-allowed'
									: 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl'
							}`}
						>
							{isSubmitting ? (
								<>
									<Loader className="h-5 w-5 animate-spin" />
									<span>Updating...</span>
								</>
							) : (
								<>
									<Lock size={18} />
									<span>Update Password</span>
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
						Didn't receive the code?{' '}
						<Link to="/forget-password" className="text-primary hover:text-primary/80 transition-colors">
							Request a new one
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;