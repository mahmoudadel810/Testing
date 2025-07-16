import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
	Heart, 
	Trash2, 
	ShoppingCart, 
	Star,
	ArrowRight
} from 'lucide-react';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import { toast } from 'react-hot-toast';

const WishlistPage = () => {
	const { wishlist, removeFromWishlist } = useWishlistStore();
	const { addToCart } = useCartStore();
	const { user } = useUserStore();

	const handleAddToCart = (product) => {
		if (!user) {
			toast.error('Please login to add items to cart');
			return;
		}
		addToCart(product);
		toast.success('Added to cart!');
	};

	const handleRemoveFromWishlist = (productId) => {
		removeFromWishlist(productId);
		toast.success('Removed from wishlist');
	};

	if (wishlist.length === 0) {
		return (
			<div className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
				<div className="text-center max-w-md">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
						>
							<Heart className="text-red-500 w-12 h-12" />
						</motion.div>
						<h1 className="text-3xl font-bold mb-4">
							Your <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Wishlist</span> is Empty
						</h1>
						<p className="text-muted-foreground mb-8">
							Start adding products to your wishlist to save them for later
						</p>
						<Link
							to="/shop"
							className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 mx-auto w-fit"
						>
							<ArrowRight size={18} />
							<span>Start Shopping</span>
						</Link>
					</motion.div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pt-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold mb-4">
						My <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Wishlist</span>
					</h1>
					<p className="text-xl text-muted-foreground">
						{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
					</p>
				</motion.div>

				{/* Wishlist Items */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{wishlist.map((product, index) => (
						<motion.div
							key={product._id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -5 }}
							className="bg-card rounded-xl shadow-lg overflow-hidden group"
						>
							{/* Product Image */}
							<div className="relative overflow-hidden">
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
								
								{/* Remove Button */}
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={() => handleRemoveFromWishlist(product._id)}
									className="absolute top-2 right-2 p-2 bg-white/80 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
								>
									<Trash2 size={16} />
								</motion.button>
							</div>

							{/* Product Info */}
							<div className="p-4 space-y-3">
								<Link to={`/product/${product._id}`}>
									<h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
										{product.name}
									</h3>
								</Link>
								
								{/* Rating */}
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
								
								{/* Price */}
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
								
								{/* Add to Cart Button */}
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => handleAddToCart(product)}
									className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center space-x-2"
								>
									<ShoppingCart size={16} />
									<span>Add to Cart</span>
								</motion.button>
							</div>
						</motion.div>
					))}
				</div>

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-12 text-center"
				>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/shop"
							className="bg-secondary text-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center space-x-2"
						>
							<ArrowRight size={18} />
							<span>Continue Shopping</span>
						</Link>
						<button
							onClick={() => {
								wishlist.forEach(product => handleAddToCart(product));
								toast.success('All items added to cart!');
							}}
							className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
						>
							<ShoppingCart size={18} />
							<span>Add All to Cart</span>
						</button>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default WishlistPage;