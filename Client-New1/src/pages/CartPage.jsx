import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
	Trash2, 
	Plus, 
	Minus, 
	ShoppingCart, 
	ArrowRight,
	Heart,
	X
} from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';

const CartPage = () => {
	const { cart, removeFromCart, updateQuantity, subtotal, total, coupon, applyCoupon, removeCoupon, isCouponApplied } = useCartStore();
	const { addToWishlist } = useWishlistStore();
	const [couponCode, setCouponCode] = useState('');

	const handleQuantityChange = (productId, newQuantity) => {
		if (newQuantity < 1) return;
		updateQuantity(productId, newQuantity);
	};

	const handleMoveToWishlist = (product) => {
		addToWishlist(product);
		removeFromCart(product._id);
	};

	const handleApplyCoupon = () => {
		if (couponCode.trim()) {
			applyCoupon(couponCode.trim());
			setCouponCode('');
		}
	};

	const handleCheckout = () => {
		// Redirect to checkout page or open checkout modal
		// This would integrate with your payment system
		console.log('Proceeding to checkout...');
	};

	if (cart.length === 0) {
		return (
			<div className="min-h-screen bg-background pt-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center"
					>
						<div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
							<ShoppingCart size={48} className="text-muted-foreground" />
						</div>
						<h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
						<p className="text-muted-foreground mb-8 max-w-md mx-auto">
							Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
						</p>
						<Link
							to="/shop"
							className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
						>
							Start Shopping
							<ArrowRight size={20} className="ml-2" />
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
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
					<p className="text-muted-foreground">
						You have {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="space-y-4"
						>
							{cart.map((item, index) => (
								<motion.div
									key={item._id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className="bg-card rounded-xl p-6 border border-border"
								>
									<div className="flex items-center space-x-4">
										{/* Product Image */}
										<div className="w-20 h-20 flex-shrink-0">
											<img
												src={item.images?.[0] || '/placeholder-product.jpg'}
												alt={item.name}
												className="w-full h-full object-cover rounded-lg"
											/>
										</div>

										{/* Product Details */}
										<div className="flex-1 min-w-0">
											<h3 className="font-semibold text-lg mb-1 truncate">
												{item.name}
											</h3>
											<p className="text-muted-foreground text-sm mb-2 line-clamp-2">
												{item.description}
											</p>
											<div className="flex items-center justify-between">
												<span className="text-xl font-bold text-primary">
													${item.price}
												</span>
												<div className="flex items-center space-x-2">
													<button
														onClick={() => handleMoveToWishlist(item)}
														className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
														title="Move to wishlist"
													>
														<Heart size={16} />
													</button>
													<button
														onClick={() => removeFromCart(item._id)}
														className="p-2 text-muted-foreground hover:text-red-500 transition-colors duration-300"
														title="Remove from cart"
													>
														<Trash2 size={16} />
													</button>
												</div>
											</div>
										</div>

										{/* Quantity Controls */}
										<div className="flex items-center space-x-2">
											<button
												onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
												className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-300"
											>
												<Minus size={16} />
											</button>
											<span className="w-12 text-center font-semibold">
												{item.quantity}
											</span>
											<button
												onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
												className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-300"
											>
												<Plus size={16} />
											</button>
										</div>

										{/* Total Price */}
										<div className="text-right">
											<p className="font-semibold text-lg">
												${(item.price * item.quantity).toFixed(2)}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Order Summary */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="lg:col-span-1"
					>
						<div className="bg-card rounded-xl p-6 border border-border sticky top-24">
							<h2 className="text-xl font-bold mb-6">Order Summary</h2>

							{/* Coupon Section */}
							<div className="mb-6">
								<div className="flex space-x-2">
									<input
										type="text"
										placeholder="Enter coupon code"
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
										className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
									/>
									<button
										onClick={handleApplyCoupon}
										className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
									>
										Apply
									</button>
								</div>
								
								{coupon && isCouponApplied && (
									<div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-green-800 font-semibold">{coupon.code}</p>
												<p className="text-green-600 text-sm">{coupon.discountPercentage}% off</p>
											</div>
											<button
												onClick={removeCoupon}
												className="text-green-600 hover:text-green-800"
											>
												<X size={16} />
											</button>
										</div>
									</div>
								)}
							</div>

							{/* Price Breakdown */}
							<div className="space-y-3 mb-6">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								{coupon && isCouponApplied && (
									<div className="flex justify-between text-green-600">
										<span>Discount ({coupon.discountPercentage}%)</span>
										<span>-${(subtotal * (coupon.discountPercentage / 100)).toFixed(2)}</span>
									</div>
								)}
								<div className="flex justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span className="text-green-600">Free</span>
								</div>
								<hr className="border-border" />
								<div className="flex justify-between text-lg font-bold">
									<span>Total</span>
									<span>${total.toFixed(2)}</span>
								</div>
							</div>

							{/* Checkout Button */}
							<button
								onClick={handleCheckout}
								className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:from-primary/90 hover:to-accent/90 transition-all duration-300 flex items-center justify-center space-x-2"
							>
								<span>Proceed to Checkout</span>
								<ArrowRight size={20} />
							</button>

							{/* Continue Shopping */}
							<Link
								to="/shop"
								className="block text-center mt-4 text-primary hover:text-primary/80 transition-colors duration-300"
							>
								Continue Shopping
							</Link>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;