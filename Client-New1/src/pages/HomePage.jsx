import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
	Star, 
	Truck, 
	Shield, 
	Headphones, 
	Award,
	Users,
	Package,
	Globe,
	Heart,
	ShoppingCart,
	ArrowRight
} from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useUserStore } from '../stores/useUserStore';
import HeroSlider from '../components/HeroSlider';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
	const { user } = useUserStore();
	const { featuredProducts, fetchFeaturedProducts, loading } = useProductStore();
	const { addToCart } = useCartStore();
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
	const [currentSlide, setCurrentSlide] = useState(0);

	const categories = [
		{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
		{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
		{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
		{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
		{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
		{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
		{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
		{ href: "/phones", name: "Phones", imageUrl: "/phones.jpeg" },
		{ href: "/shishas", name: "Shishas", imageUrl: "/shisha.jpeg" },
		{ href: "/pc", name: "PC", imageUrl: "/pc.jpeg" },
		{ href: "/laptops", name: "Laptops", imageUrl: "/laptop.jpeg" },
		{ href: "/screens", name: "Screens", imageUrl: "/screens.jpeg" },
		{ href: "/tabacco", name: "Tabacco", imageUrl: "/tabacco.jpeg" },
		{ href: "/vibes", name: "Vibes", imageUrl: "/vibe.jpeg" },
		{ href: "/iqoss", name: "Iqoss", imageUrl: "/iqos.jpeg" },
	];

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const features = [
		{
			icon: Truck,
			title: "Free Shipping",
			description: "Free shipping on orders over $99"
		},
		{
			icon: Shield,
			title: "Secure Payment",
			description: "100% secure payment processing"
		},
		{
			icon: Headphones,
			title: "24/7 Support",
			description: "Round-the-clock customer support"
		},
		{
			icon: Award,
			title: "Quality Guarantee",
			description: "30-day money-back guarantee"
		}
	];

	const stats = [
		{ icon: 'users', value: '50K+', label: 'Happy Customers' },
		{ icon: 'package', value: '100K+', label: 'Products Sold' },
		{ icon: 'globe', value: '150+', label: 'Countries Served' },
		{ icon: 'award', value: '15+', label: 'Years Experience' }
	];

	const testimonials = [
		{
			id: 1,
			name: "Sarah Johnson",
			role: "Tech Enthusiast",
			content: "Amazing selection of electronics and lightning-fast delivery. Highly recommended!",
			rating: 5,
			avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
		},
		{
			id: 2,
			name: "Mike Chen",
			role: "Software Developer",
			content: "Best prices I've found online. Customer service is exceptional and products are top quality.",
			rating: 5,
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
		},
		{
			id: 3,
			name: "Emily Rodriguez",
			role: "Digital Artist",
			content: "Perfect for my creative work. Fast shipping and excellent product quality. Will shop again!",
			rating: 5,
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
		}
	];

	const ProductCard = ({ product, index }) => {
		const isWishlisted = isInWishlist(product._id);

		const handleAddToCart = () => {
			if (!user) {
				// Redirect to login or show login modal
				return;
			}
			addToCart(product);
		};

		const handleWishlistToggle = () => {
			if (!user) {
				// Redirect to login or show login modal
				return;
			}
			if (isWishlisted) {
				removeFromWishlist(product._id);
			} else {
				addToWishlist(product);
			}
		};

		return (
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
				whileHover={{ y: -10 }}
				className="group bg-card rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
			>
				<div className="relative overflow-hidden rounded-lg mb-4">
					<img
						src={product.images?.[0] || '/placeholder-product.jpg'}
						alt={product.name}
						className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					{product.discount > 0 && (
						<span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
							-{product.discount}%
						</span>
					)}
					{product.isNew && (
						<span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
							New
						</span>
					)}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={handleWishlistToggle}
						className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
							isWishlisted 
								? 'bg-red-500 text-white' 
								: 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
						}`}
					>
						<Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
					</motion.button>
				</div>
				
				<div className="space-y-3">
					<Link to={`/product/${product._id}`}>
						<h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
							{product.name}
						</h3>
					</Link>
					
					<div className="flex items-center space-x-1">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								size={14}
								className={`${
									i < Math.floor(product.rating || 4)
										? 'text-yellow-400 fill-current'
										: 'text-gray-300'
								}`}
							/>
						))}
						<span className="text-sm text-muted-foreground ml-2">
							({product.reviewCount || 0})
						</span>
					</div>
					
					<div className="flex items-center space-x-2">
						<span className="text-xl font-bold text-primary">
							${product.price}
						</span>
						{product.originalPrice > product.price && (
							<span className="text-sm text-muted-foreground line-through">
								${product.originalPrice}
							</span>
						)}
					</div>
					
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleAddToCart}
						className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center space-x-2"
					>
						<ShoppingCart size={16} />
						<span>Add to Cart</span>
					</motion.button>
				</div>
			</motion.div>
		);
	};

	const CategoryCard = ({ category, index }) => {
		return (
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
				whileHover={{ y: -10 }}
				className="group relative overflow-hidden h-80 rounded-xl shadow-lg"
			>
				<Link to={`/category${category.href}`}>
					<div className="w-full h-full cursor-pointer">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-80 z-10" />
						<img
							src={category.imageUrl}
							alt={category.name}
							className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
							loading="lazy"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6 z-20">
							<h3 className="text-white text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
								{category.name}
							</h3>
							<p className="text-gray-200 text-sm mb-3">Explore {category.name}</p>
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
								className="flex items-center text-white group-hover:text-primary transition-colors duration-300"
							>
								<span className="text-sm font-medium">Shop Now</span>
								<ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
							</motion.div>
						</div>
					</div>
				</Link>
			</motion.div>
		);
	};

	const StatCard = ({ stat, index }) => {
		const IconComponent = stat.icon === 'users' ? Users : 
							 stat.icon === 'package' ? Package :
							 stat.icon === 'globe' ? Globe : Award;
		
		return (
			<motion.div
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
					<IconComponent size={32} className="text-white" />
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
		);
	};

	if (loading) return <LoadingSpinner />;

	return (
		<div className="min-h-screen bg-background pt-16">
			{/* Hero Section */}
			<section className="relative">
				<HeroSlider />
			</section>

			{/* Categories Section */}
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
							Shop by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Category</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Discover our wide range of products across different categories
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{categories.map((category, index) => (
							<CategoryCard key={category.name} category={category} index={index} />
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-secondary/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

			{/* Featured Products */}
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
							Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Products</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Discover our handpicked selection of the latest and greatest electronics
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{featuredProducts.slice(0, 8).map((product, index) => (
							<ProductCard key={product._id} product={product} index={index} />
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="text-center mt-12"
					>
						<Link
							to="/shop"
							className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105"
						>
							View All Products
						</Link>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-gradient-to-r from-primary to-accent">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl font-bold text-white mb-4">
							Trusted by Thousands
						</h2>
						<p className="text-xl text-white/80 max-w-2xl mx-auto">
							Join our growing community of satisfied customers worldwide
						</p>
					</motion.div>

					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<StatCard key={stat.label} stat={stat} index={index} />
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
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
							What Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Customers Say</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Real reviews from real customers
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -5 }}
								className="bg-card p-6 rounded-xl shadow-lg text-center"
							>
								<div className="flex justify-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} size={20} className="text-yellow-400 fill-current" />
									))}
								</div>
								<p className="text-muted-foreground mb-6 italic">
									"{testimonial.content}"
								</p>
								<div className="flex items-center justify-center space-x-3">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										className="w-12 h-12 rounded-full object-cover"
									/>
									<div>
										<h4 className="font-semibold">{testimonial.name}</h4>
										<p className="text-sm text-muted-foreground">{testimonial.role}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section className="py-16 bg-gradient-to-r from-primary to-accent">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h2 className="text-4xl font-bold text-white mb-4">
							Stay Updated
						</h2>
						<p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
							Subscribe to our newsletter and be the first to know about new products and exclusive deals
						</p>
						
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="max-w-md mx-auto flex space-x-4"
						>
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
							/>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
							>
								Subscribe
							</motion.button>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;