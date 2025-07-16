import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

const ProductCard = memo(({ 
  product, 
  index, 
  onAddToCart, 
  onAddToWishlist, 
  isInWishlist = false 
}) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart();
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="card-product group"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/300x200?text=Product'}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full shadow-lg transition-colors duration-300 ${
                isInWishlist 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="p-2 bg-white/90 rounded-full shadow-lg text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              <ShoppingCart size={16} />
            </motion.button>
          </div>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="bg-white rounded-full p-3"
            >
              <Eye size={20} className="text-gray-700" />
            </motion.div>
          </div>
        </div>
      </Link>
      
      <div className="space-y-2">
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
            ({product.reviewCount || Math.floor(Math.random() * 100) + 10})
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
        
        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full btn-primary mt-4 flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;