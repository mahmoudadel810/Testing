import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const { signup, loading } = useUserStore();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		} else if (formData.name.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters';
		}

		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your password';
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (!validateForm()) return;

		try {
			await signup(formData);
			navigate('/');
		} catch (error) {
			// Error is handled in the store
		}
	};

	return (
		<div className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="bg-card rounded-2xl shadow-xl p-8 border border-border"
				>
					{/* Header */}
					<div className="text-center mb-8">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<User size={32} className="text-white" />
						</motion.div>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="text-3xl font-bold text-foreground mb-2"
						>
							Create Account
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-muted-foreground"
						>
							Join us and start shopping today
						</motion.p>
					</div>

					{/* Form */}
					<motion.form
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						{/* Name Field */}
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
								Full Name
							</label>
							<div className="relative">
								<User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
										errors.name 
											? 'border-red-500 focus:border-red-500' 
											: 'border-border focus:border-primary'
									}`}
									placeholder="Enter your full name"
								/>
							</div>
							{errors.name && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-red-500 text-sm mt-1"
								>
									{errors.name}
								</motion.p>
							)}
						</div>

						{/* Email Field */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
								Email Address
							</label>
							<div className="relative">
								<Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
										errors.email 
											? 'border-red-500 focus:border-red-500' 
											: 'border-border focus:border-primary'
									}`}
									placeholder="Enter your email"
								/>
							</div>
							{errors.email && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-red-500 text-sm mt-1"
								>
									{errors.email}
								</motion.p>
							)}
						</div>

						{/* Password Field */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
								Password
							</label>
							<div className="relative">
								<Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
								<input
									type={showPassword ? 'text' : 'password'}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
										errors.password 
											? 'border-red-500 focus:border-red-500' 
											: 'border-border focus:border-primary'
									}`}
									placeholder="Create a password"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.password && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-red-500 text-sm mt-1"
								>
									{errors.password}
								</motion.p>
							)}
						</div>

						{/* Confirm Password Field */}
						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									id="confirmPassword"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
										errors.confirmPassword 
											? 'border-red-500 focus:border-red-500' 
											: 'border-border focus:border-primary'
									}`}
									placeholder="Confirm your password"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
								>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.confirmPassword && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-red-500 text-sm mt-1"
								>
									{errors.confirmPassword}
								</motion.p>
							)}
						</div>

						{/* Submit Button */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:from-primary/90 hover:to-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
						>
							{loading ? (
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							) : (
								<>
									<span>Create Account</span>
									<ArrowRight size={16} />
								</>
							)}
						</motion.button>
					</motion.form>

					{/* Divider */}
					<div className="my-6 flex items-center">
						<div className="flex-1 border-t border-border" />
						<span className="px-4 text-sm text-muted-foreground">or</span>
						<div className="flex-1 border-t border-border" />
					</div>

					{/* Sign In Link */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="text-center"
					>
						<p className="text-muted-foreground">
							Already have an account?{' '}
							<Link
								to="/login"
								className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300"
							>
								Sign in here
							</Link>
						</p>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default SignUpPage;