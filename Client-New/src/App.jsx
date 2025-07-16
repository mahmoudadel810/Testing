import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import { 
  Star, 
  Truck, 
  Shield, 
  Headphones, 
  Award,
  Users,
  Package,
  Globe,
  TrendingUp,
  Zap,
  Heart
} from 'lucide-react';
import { 
  getFeaturedProducts, 
  getBestsellerProducts, 
  getNewProducts,
  stats,
  testimonials,
  brands 
} from './data/mockData';
import './App.css';

const App = memo(() => {
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const bestsellerProducts = getBestsellerProducts().slice(0, 6);
  const newProducts = getNewProducts().slice(0, 4);

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

  const ProductCard = memo(({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="card-product group"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.discount > 0 && (
          <span className="badge-sale absolute top-2 left-2">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="badge-new absolute top-2 right-2">
            New
          </span>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart size={16} className="text-red-500" />
        </motion.button>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">
            ({product.reviewCount})
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
          className="w-full btn-primary mt-4"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  ));

  const StatCard = memo(({ stat, index }) => {
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
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
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
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSlider />
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
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300"
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
              Featured <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of the latest and greatest electronics
            </p>
          </motion.div>

          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
             className="btn-accent text-lg px-8 py-4 transition-transform duration-300 hover:scale-105"   >
              View All Products
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-500">
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
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
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

      {/* Bestsellers */}
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
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Bestsellers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our most popular products loved by customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellerProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
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
              New <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Arrivals</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be the first to get your hands on the latest tech
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
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
              What Our <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Customers Say</span>
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
                className="card-modern p-6 text-center"
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-500">
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
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
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
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  ElectroShop
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your trusted destination for the latest electronics and technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/shop" className="hover:text-primary transition-colors">Shop</a></li>
                <li><a href="/deals" className="hover:text-primary transition-colors">Deals</a></li>
                <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/shop/smartphones" className="hover:text-primary transition-colors">Smartphones</a></li>
                <li><a href="/shop/laptops" className="hover:text-primary transition-colors">Laptops</a></li>
                <li><a href="/shop/gaming" className="hover:text-primary transition-colors">Gaming</a></li>
                <li><a href="/shop/audio" className="hover:text-primary transition-colors">Audio</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="/shipping" className="hover:text-primary transition-colors">Shipping Info</a></li>
                <li><a href="/returns" className="hover:text-primary transition-colors">Returns</a></li>
                <li><a href="/warranty" className="hover:text-primary transition-colors">Warranty</a></li>
              </ul>
            </div>
          </div>
          
          <hr className="border-border my-8" />
          
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 ElectroShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
});

App.displayName = 'App';

export default App;

