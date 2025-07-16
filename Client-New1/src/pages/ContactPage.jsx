import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
	Mail, 
	Phone, 
	MapPin, 
	Clock, 
	Send,
	CheckCircle,
	XCircle
} from 'lucide-react';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});
	
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const contactInfo = [
		{
			icon: Mail,
			title: "Email",
			value: "contact@electroshop.com",
			description: "Send us an email anytime"
		},
		{
			icon: Phone,
			title: "Phone",
			value: "+1 (555) 123-4567",
			description: "Call us during business hours"
		},
		{
			icon: MapPin,
			title: "Address",
			value: "123 Tech Street, Digital City",
			description: "Visit our headquarters"
		},
		{
			icon: Clock,
			title: "Business Hours",
			value: "Mon - Fri: 9AM - 6PM",
			description: "We're here to help"
		}
	];

	const validateForm = (data) => {
		const errors = {};
		
		if (!data.name.trim()) {
			errors.name = 'Name is required';
		} else if (data.name.length < 2) {
			errors.name = 'Name must be at least 2 characters';
		} else if (data.name.length > 50) {
			errors.name = 'Name must be less than 50 characters';
		}

		if (!data.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
			errors.email = 'Invalid email format';
		}

		if (!data.subject.trim()) {
			errors.subject = 'Subject is required';
		} else if (data.subject.length < 5) {
			errors.subject = 'Subject must be at least 5 characters';
		} else if (data.subject.length > 100) {
			errors.subject = 'Subject must be less than 100 characters';
		}

		if (!data.message.trim()) {
			errors.message = 'Message is required';
		} else if (data.message.length < 10) {
			errors.message = 'Message must be at least 10 characters';
		} else if (data.message.length > 500) {
			errors.message = 'Message must be less than 500 characters';
		}

		return errors;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const validationErrors = validateForm(formData);
			
			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				setIsSubmitting(false);
				return;
			}

			setErrors({});

			// Send data to API
			await axios.post('/contact', formData);
			
			toast.success('Message sent successfully! We\'ll get back to you soon.');
			setFormData({
				name: '',
				email: '',
				subject: '',
				message: ''
			});
			
		} catch (error) {
			toast.error(error.response?.data?.message || 'Something went wrong. Please try again later.');
			console.error('API Error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-background pt-16">
			{/* Hero Section */}
			<section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-4xl mx-auto"
					>
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Contact <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Us</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8">
							We'd love to hear from you. Send us a message and we'll respond as soon as possible.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Contact Info Section */}
			<section className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{contactInfo.map((info, index) => (
							<motion.div
								key={info.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -5 }}
								className="text-center group"
							>
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300"
								>
									<info.icon size={32} className="text-white" />
								</motion.div>
								<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
									{info.title}
								</h3>
								<p className="text-primary font-medium mb-2">{info.value}</p>
								<p className="text-muted-foreground text-sm">{info.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className="py-16 bg-secondary/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="bg-card rounded-2xl shadow-xl p-8"
						>
							<div className="text-center mb-8">
								<h2 className="text-3xl font-bold mb-4">
									Send us a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Message</span>
								</h2>
								<p className="text-muted-foreground">
									Fill out the form below and we'll get back to you as soon as possible.
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Name and Email Row */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="name" className="block text-sm font-medium mb-2">
											Name *
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
												errors.name ? 'border-destructive' : 'border-border'
											}`}
											placeholder="Your full name"
										/>
										{errors.name && (
											<p className="mt-1 text-sm text-destructive flex items-center">
												<XCircle size={14} className="mr-1" />
												{errors.name}
											</p>
										)}
									</div>

									<div>
										<label htmlFor="email" className="block text-sm font-medium mb-2">
											Email *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
												errors.email ? 'border-destructive' : 'border-border'
											}`}
											placeholder="your.email@example.com"
										/>
										{errors.email && (
											<p className="mt-1 text-sm text-destructive flex items-center">
												<XCircle size={14} className="mr-1" />
												{errors.email}
											</p>
										)}
									</div>
								</div>

								{/* Subject Field */}
								<div>
									<label htmlFor="subject" className="block text-sm font-medium mb-2">
										Subject *
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
											errors.subject ? 'border-destructive' : 'border-border'
										}`}
										placeholder="What's this about?"
									/>
									{errors.subject && (
										<p className="mt-1 text-sm text-destructive flex items-center">
											<XCircle size={14} className="mr-1" />
											{errors.subject}
										</p>
									)}
								</div>

								{/* Message Field */}
								<div>
									<label htmlFor="message" className="block text-sm font-medium mb-2">
										Message *
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										rows={6}
										className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${
											errors.message ? 'border-destructive' : 'border-border'
										}`}
										placeholder="Tell us more about your inquiry..."
									/>
									{errors.message && (
										<p className="mt-1 text-sm text-destructive flex items-center">
											<XCircle size={14} className="mr-1" />
											{errors.message}
										</p>
									)}
									<p className="mt-1 text-sm text-muted-foreground">
										{formData.message.length}/500 characters
									</p>
								</div>

								{/* Submit Button */}
								<motion.button
									type="submit"
									disabled={isSubmitting}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
										isSubmitting
											? 'bg-muted cursor-not-allowed'
											: 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl'
									}`}
								>
									{isSubmitting ? (
										<>
											<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
											<span>Sending...</span>
										</>
									) : (
										<>
											<Send size={18} />
											<span>Send Message</span>
										</>
									)}
								</motion.button>
							</form>

							{/* Footer */}
							<div className="mt-8 text-center text-sm text-muted-foreground">
								<p>Fields marked with * are required</p>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;