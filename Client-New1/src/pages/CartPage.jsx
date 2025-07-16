import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Heart
} from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import ProductCard from '../components/ProductCard';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    total, 
    subtotal, 
    coupon, 
    isCouponApplied,
    removeFromCart, 
    updateQuantity, 
    applyCoupon, 
    removeCoupon,
    clearCart 
  } = useCartStore();
  
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    await applyCoupon(couponCode);
    setCouponCode('');
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Navigate to checkout page or process payment
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const moveToWishlist = async (product) => {
    await removeFromCart(product._id);
    addToWishlist(product);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShoppingCart size={48} className="text-muted-foreground" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-foreground mb-4"
            >
              Your cart is empty
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              Looks like you haven't added any items to your cart yet.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-x-4"
            >
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-3"
                >
                  Start Shopping
                </motion.button>
              </Link>
              
              <Link to="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline px-8 py-3"
                >
                  View Wishlist
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Continue Shopping</span>
              </motion.button>
            </Link>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {cart.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-modern p-6"
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.images?.[0] || item.image || 'https://via.placeholder.com/100x100?text=Product'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item._id}`}>
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-lg font-bold text-primary">
                          ${item.price}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                      >
                        <Minus size={16} />
                      </motion.button>
                      
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => moveToWishlist(item)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Move to wishlist"
                      >
                        <Heart size={20} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-modern p-6 sticky top-4"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
              
              {/* Coupon Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Apply Coupon</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Apply
                  </motion.button>
                </div>
                
                {coupon && isCouponApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">
                        {coupon.code} - {coupon.discountPercentage}% off
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-800"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {coupon && isCouponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({coupon.discountPercentage}%)</span>
                    <span>-${(subtotal * (coupon.discountPercentage / 100)).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Truck size={16} />
                  <span>Free shipping on orders over $99</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Shield size={16} />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CreditCard size={16} />
                  <span>Secure payment processing</span>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={loading}
                className="w-full btn-primary py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard size={20} />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;