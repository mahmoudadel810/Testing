import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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
  Tablet,
  LogOut,
  Settings,
  Package
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import '../App.css';

const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const { getWishlistCount } = useWishlistStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = getWishlistCount();

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
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

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
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                ElectroShop
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="nav-link relative group"
              >
                <Link to={link.href} className="block">
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
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
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
                        >
                          <Link to={category.href} className="flex items-center space-x-3 w-full">
                            <category.icon size={20} className="text-primary" />
                            <span className="text-sm font-medium">{category.name}</span>
                          </Link>
                        </motion.div>
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
              onClick={() => navigate('/wishlist')}
              className="hidden md:flex relative p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Heart size={24} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

            {/* Shopping Cart */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cart')}
              className="relative p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
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
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <motion.div
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                        >
                          <Link to="/profile" className="flex items-center space-x-2">
                            <User size={16} />
                            <span>Profile</span>
                          </Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                        >
                          <Link to="/orders" className="flex items-center space-x-2">
                            <Package size={16} />
                            <span>Orders</span>
                          </Link>
                        </motion.div>
                        {user.role === 'admin' && (
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                            className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                          >
                            <Link to="/admin" className="flex items-center space-x-2">
                              <Settings size={16} />
                              <span>Admin Panel</span>
                            </Link>
                          </motion.div>
                        )}
                        <hr className="my-2 border-border" />
                        <motion.button
                          whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm rounded-lg transition-colors duration-200 text-red-500 hover:text-red-600"
                        >
                          <div className="flex items-center space-x-2">
                            <LogOut size={16} />
                            <span>Logout</span>
                          </div>
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.div
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                        >
                          <Link to="/login">Sign In</Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="block px-4 py-2 text-sm rounded-lg transition-colors duration-200"
                        >
                          <Link to="/signup">Create Account</Link>
                        </motion.div>
                      </>
                    )}
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
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="block py-2 text-lg font-medium text-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Link to={link.href} onClick={() => setIsMenuOpen(false)}>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <hr className="border-border" />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Categories
                  </h3>
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index + navLinks.length) * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                    >
                      <Link to={category.href} className="flex items-center space-x-3 w-full" onClick={() => setIsMenuOpen(false)}>
                        <category.icon size={20} />
                        <span>{category.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {user && (
                  <>
                    <hr className="border-border" />
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Account
                      </h3>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center space-x-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                      >
                        <Link to="/profile" className="flex items-center space-x-3 w-full" onClick={() => setIsMenuOpen(false)}>
                          <User size={20} />
                          <span>Profile</span>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center space-x-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                      >
                        <Link to="/cart" className="flex items-center space-x-3 w-full" onClick={() => setIsMenuOpen(false)}>
                          <ShoppingCart size={20} />
                          <span>Cart ({cartCount})</span>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center space-x-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                      >
                        <Link to="/wishlist" className="flex items-center space-x-3 w-full" onClick={() => setIsMenuOpen(false)}>
                          <Heart size={20} />
                          <span>Wishlist ({wishlistCount})</span>
                        </Link>
                      </motion.div>
                      {user.role === 'admin' && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center space-x-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                        >
                          <Link to="/admin" className="flex items-center space-x-3 w-full" onClick={() => setIsMenuOpen(false)}>
                            <Settings size={20} />
                            <span>Admin Panel</span>
                          </Link>
                        </motion.div>
                      )}
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                        whileHover={{ x: 10 }}
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 py-2 text-red-500 hover:text-red-600 transition-colors duration-300 w-full"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </motion.button>
                    </div>
                  </>
                )}
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

