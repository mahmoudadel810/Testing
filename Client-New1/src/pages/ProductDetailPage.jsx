import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
	Star, 
	Heart, 
	ShoppingCart, 
	Share2, 
	ChevronLeft,
	ChevronRight,
	Package,
	Truck,
	Shield,
	ArrowLeft
} from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useUserStore } from '../stores/useUserStore';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailPage = () => {
	const { id } = useParams();
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
	const { fetchAllProducts, products, loading } = useProductStore();
	
	const [product, setProduct] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedTab, setSelectedTab] = useState('description');

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	useEffect(() => {
		if (products.length > 0) {
			const foundProduct = products.find(p => p._id === id);
			setProduct(foundProduct);
		}
	}, [products, id]);

	const handleAddToCart = () => {
		if (!user) {
			toast.error('Please login to add items to cart');
			return;
		}
		addToCart(product);
		toast.success('Added to cart!');
	};

	const handleWishlistToggle = () => {
		if (!user) {
			toast.error('Please login to manage wishlist');
			return;
		}
		if (isInWishlist(product._id)) {
			removeFromWishlist(product._id);
			toast.success('Removed from wishlist');
		} else {
			addToWishlist(product);
			toast.success('Added to wishlist');
		}
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: product.name,
				text: product.description,
				url: window.location.href,
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			toast.success('Link copied to clipboard!');
		}
	};

	const nextImage = () => {
		setCurrentImageIndex((prev) => 
			prev === (product.images?.length - 1) ? 0 : prev + 1
		);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => 
			prev === 0 ? (product.images?.length - 1) : prev - 1
		);
	};

	const relatedProducts = products
		.filter(p => p.category === product?.category && p._id !== product?._id)
		.slice(0, 4);

	if (loading) return <LoadingSpinner />;

	if (!product) {
		return (
			<div className="min-h-screen bg-background pt-16 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
					<Link
						to="/shop"
						className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
					>
						Back to Shop
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pt-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8"
				>
					<Link
						to="/shop"
						className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
					>
						<ArrowLeft size={16} />
						<span>Back to Shop</span>
					</Link>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					{/* Product Images */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="relative"
					>
						<div className="relative overflow-hidden rounded-2xl bg-secondary/30">
							<img
								src={product.images?.[currentImageIndex] || '/placeholder-product.jpg'}
								alt={product.name}
								className="w-full h-96 lg:h-[500px] object-cover"
							/>
							
							{/* Navigation Arrows */}
							{product.images?.length > 1 && (
								<>
									<button
										onClick={prevImage}
										className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
									>
										<ChevronLeft size={20} />
									</button>
									<button
										onClick={nextImage}
										className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
									>
										<ChevronRight size={20} />
									</button>
								</>
							)}

							{/* Badges */}
							{product.discount > 0 && (
								<span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
									-{product.discount}%
								</span>
							)}
							{product.isNew && (
								<span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
									New
								</span>
							)}
						</div>

						{/* Thumbnail Images */}
						{product.images?.length > 1 && (
							<div className="flex space-x-2 mt-4">
								{product.images.map((image, index) => (
									<button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
											currentImageIndex === index 
												? 'border-primary' 
												: 'border-transparent'
										}`}
									>
										<img
											src={image}
											alt={`${product.name} ${index + 1}`}
											className="w-full h-full object-cover"
										/>
									</button>
								))}
							</div>
						)}
					</motion.div>

					{/* Product Info */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-6"
					>
						{/* Title and Rating */}
						<div>
							<h1 className="text-3xl font-bold mb-2">{product.name}</h1>
							<div className="flex items-center space-x-2 mb-4">
								<div className="flex items-center space-x-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											size={16}
											className={`${
												i < Math.floor(product.rating || 4)
													? 'text-yellow-400 fill-current'
													: 'text-gray-300'
											}`}
										/>
									))}
								</div>
								<span className="text-muted-foreground">
									({product.reviewCount || 0} reviews)
								</span>
							</div>
						</div>

						{/* Price */}
						<div className="flex items-center space-x-4">
							<span className="text-3xl font-bold text-primary">
								${product.price}
							</span>
							{product.originalPrice > product.price && (
								<span className="text-xl text-muted-foreground line-through">
									${product.originalPrice}
								</span>
							)}
						</div>

						{/* Description */}
						<p className="text-muted-foreground leading-relaxed">
							{product.description}
						</p>

						{/* Quantity */}
						<div className="flex items-center space-x-4">
							<label className="font-medium">Quantity:</label>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
								>
									-
								</button>
								<span className="w-12 text-center font-medium">{quantity}</span>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
								>
									+
								</button>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleAddToCart}
								className="flex-1 bg-primary text-white py-4 px-6 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
							>
								<ShoppingCart size={20} />
								<span>Add to Cart</span>
							</motion.button>
							
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleWishlistToggle}
								className={`p-4 rounded-xl transition-colors flex items-center justify-center ${
									isInWishlist(product._id)
										? 'bg-red-500 text-white hover:bg-red-600'
										: 'bg-secondary text-foreground hover:bg-secondary/80'
								}`}
							>
								<Heart size={20} className={isInWishlist(product._id) ? 'fill-current' : ''} />
							</motion.button>
							
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleShare}
								className="p-4 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors flex items-center justify-center"
							>
								<Share2 size={20} />
							</motion.button>
						</div>

						{/* Features */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
							<div className="flex items-center space-x-3">
								<Package className="text-primary" size={20} />
								<div>
									<p className="font-medium">Free Shipping</p>
									<p className="text-sm text-muted-foreground">On orders over $99</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<Shield className="text-primary" size={20} />
								<div>
									<p className="font-medium">Secure Payment</p>
									<p className="text-sm text-muted-foreground">100% secure checkout</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<Truck className="text-primary" size={20} />
								<div>
									<p className="font-medium">Fast Delivery</p>
									<p className="text-sm text-muted-foreground">3-5 business days</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Product Details Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mb-16"
				>
					<div className="bg-card rounded-2xl shadow-xl p-8">
						{/* Tab Navigation */}
						<div className="flex space-x-8 mb-8 border-b border-border">
							{['description', 'specifications', 'reviews'].map((tab) => (
								<button
									key={tab}
									onClick={() => setSelectedTab(tab)}
									className={`pb-4 px-2 font-medium transition-colors capitalize ${
										selectedTab === tab
											? 'text-primary border-b-2 border-primary'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									{tab}
								</button>
							))}
						</div>

						{/* Tab Content */}
						<div className="min-h-[200px]">
							{selectedTab === 'description' && (
								<div className="prose max-w-none">
									<p className="text-muted-foreground leading-relaxed">
										{product.description}
									</p>
								</div>
							)}
							
							{selectedTab === 'specifications' && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-3">
										<div className="flex justify-between py-2 border-b border-border">
											<span className="font-medium">Category</span>
											<span className="text-muted-foreground">{product.category}</span>
										</div>
										<div className="flex justify-between py-2 border-b border-border">
											<span className="font-medium">Brand</span>
											<span className="text-muted-foreground">{product.brand || 'N/A'}</span>
										</div>
										<div className="flex justify-between py-2 border-b border-border">
											<span className="font-medium">SKU</span>
											<span className="text-muted-foreground">{product._id}</span>
										</div>
									</div>
								</div>
							)}
							
							{selectedTab === 'reviews' && (
								<div className="text-center py-8">
									<p className="text-muted-foreground">Reviews feature coming soon!</p>
								</div>
							)}
						</div>
					</div>
				</motion.div>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<h2 className="text-2xl font-bold mb-8">Related Products</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{relatedProducts.map((relatedProduct, index) => (
								<Link
									key={relatedProduct._id}
									to={`/product/${relatedProduct._id}`}
									className="group"
								>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
										whileHover={{ y: -5 }}
										className="bg-card rounded-xl shadow-lg overflow-hidden"
									>
										<div className="relative overflow-hidden">
											<img
												src={relatedProduct.images?.[0] || '/placeholder-product.jpg'}
												alt={relatedProduct.name}
												className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										</div>
										<div className="p-4">
											<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
												{relatedProduct.name}
											</h3>
											<p className="text-xl font-bold text-primary">
												${relatedProduct.price}
											</p>
										</div>
									</motion.div>
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default ProductDetailPage;