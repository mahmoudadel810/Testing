import React from 'react';
import { motion } from 'framer-motion';
import { 
	Users, 
	Award, 
	Globe, 
	Heart, 
	Shield, 
	Truck, 
	Headphones,
	Star
} from 'lucide-react';

const AboutPage = () => {
	const features = [
		{
			icon: Shield,
			title: "Quality Assurance",
			description: "Every product is carefully selected and tested for quality"
		},
		{
			icon: Truck,
			title: "Fast Delivery",
			description: "Quick and reliable shipping to your doorstep"
		},
		{
			icon: Headphones,
			title: "24/7 Support",
			description: "Round-the-clock customer service and support"
		},
		{
			icon: Heart,
			title: "Customer First",
			description: "Your satisfaction is our top priority"
		}
	];

	const stats = [
		{ icon: Users, value: '50K+', label: 'Happy Customers' },
		{ icon: Globe, value: '150+', label: 'Countries Served' },
		{ icon: Award, value: '15+', label: 'Years Experience' },
		{ icon: Star, value: '4.9', label: 'Average Rating' }
	];

	const team = [
		{
			name: "Sarah Johnson",
			role: "CEO & Founder",
			image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
			bio: "Passionate about creating exceptional shopping experiences"
		},
		{
			name: "Mike Chen",
			role: "CTO",
			image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
			bio: "Leading our technology innovation and development"
		},
		{
			name: "Emily Rodriguez",
			role: "Head of Design",
			image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
			bio: "Creating beautiful and intuitive user experiences"
		}
	];

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
							About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ElectroShop</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
							Your trusted partner in the world of online shopping. We offer high-quality products,
							exceptional customer service, and a seamless shopping experience. From electronics to fashion, 
							our curated collections are designed to meet the needs of modern shoppers.
						</p>
						<p className="text-lg text-muted-foreground leading-relaxed">
							At ElectroShop, we believe in innovation, transparency, and putting the customer first. 
							Our team works tirelessly to source the best products at competitive prices while maintaining 
							ethical and sustainable practices.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="text-center"
							>
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4"
								>
									<stat.icon size={32} className="text-white" />
								</motion.div>
								<motion.h3
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
									className="text-3xl font-bold text-primary mb-2"
								>
									{stat.value}
								</motion.h3>
								<p className="text-muted-foreground">{stat.label}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-secondary/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl font-bold mb-4">
							Why Choose <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Us</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							We're committed to providing the best shopping experience possible
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
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
									<feature.icon size={32} className="text-white" />
								</motion.div>
								<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
									{feature.title}
								</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl font-bold mb-4">
							Meet Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Team</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							The passionate people behind ElectroShop
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{team.map((member, index) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -5 }}
								className="text-center group"
							>
								<motion.div
									whileHover={{ scale: 1.05 }}
									className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
								>
									<img
										src={member.image}
										alt={member.name}
										className="w-full h-full object-cover"
									/>
								</motion.div>
								<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
									{member.name}
								</h3>
								<p className="text-primary font-medium mb-3">{member.role}</p>
								<p className="text-muted-foreground">{member.bio}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-16 bg-gradient-to-r from-primary to-accent">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-4xl mx-auto"
					>
						<h2 className="text-4xl font-bold text-white mb-6">
							Our Mission
						</h2>
						<p className="text-xl text-white/90 leading-relaxed">
							To revolutionize online shopping by providing exceptional products, 
							unparalleled customer service, and innovative technology that makes 
							shopping easier, faster, and more enjoyable for everyone.
						</p>
						<p className="text-lg text-white/80 mt-6 leading-relaxed">
							Join us on this journey and experience a better way to shop. 
							Welcome to ElectroShop.
						</p>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;