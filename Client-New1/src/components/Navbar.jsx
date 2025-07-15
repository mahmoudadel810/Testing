import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart,
  Bell,
  ChevronDown,
  Smartphone,
  Laptop,
  Gamepad2,
  Home,
  Headphones,
  Tablet
} from 'lucide-react';
import '../App.css';

const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Smartphones', icon: Smartphone, href: '/shop/smartphones' },
    { name: 'Laptops', icon: Laptop, href: '/shop/laptops' },
    { name: 'Gaming', icon: Gamepad2, href: '/shop/gaming' },
    { name: 'Smart Home', icon: Home, href: '/shop/smart-home' },
    { name: 'Audio', icon: Headphones, href: '/shop/audio' },
    { name: 'Tablets', icon: Tablet, href: '/shop/tablets' }
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`nav-modern transition-all duration-300 ${
        isScrolled ? 'bg-background/98 shadow-lg' : 'bg-background/95'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              ElectroShop
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="nav-link relative group"
              >
                {link.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <motion.button
                whileHover={{ y: -2 }}
                className="nav-link flex items-center space-x-1"
              >
                <span>Categories</span>
                <motion.div
                  animate={{ rotate: showCategories ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl p-4 z-50"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category, index) => (
                        <motion.a
                          key={category.name}
                          href={category.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
                        >
                          <category.icon size={20} className="text-primary" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`hidden md:flex items-center transition-all duration-300 ${
              isSearchFocused ? 'w-80' : 'w-64'
            }`}
          >
            <div className="relative w-full">
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex relative p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Heart size={24} />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                3
              </motion.span>
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex relative p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Bell size={24} />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                2
              </motion.span>
            </motion.button>

            {/* Shopping Cart */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <ShoppingCart size={24} />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center"
              >
                5
              </motion.span>
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hidden md:flex items-center space-x-2 p-2 text-foreground hover:text-primary transition-colors duration-300"
              >
                <User size={24} />
                <ChevronDown size={16} />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl p-2 z-50"
                  >
                    <motion.a
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      href="/login"
                      className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                    >
                      Sign In
                    </motion.a>
                    <motion.a
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      href="/register"
                      className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                    >
                      Create Account
                    </motion.a>
                    <hr className="my-2 border-border" />
                    <motion.a
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      href="/profile"
                      className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                    >
                      My Profile
                    </motion.a>
                    <motion.a
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      href="/orders"
                      className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                    >
                      My Orders
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4">
            <div className="relative">
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="block py-2 text-lg font-medium text-foreground hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                <hr className="border-border" />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Categories
                  </h3>
                  {categories.map((category, index) => (
                    <motion.a
                      key={category.name}
                      href={category.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index + navLinks.length) * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <category.icon size={20} />
                      <span>{category.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;

