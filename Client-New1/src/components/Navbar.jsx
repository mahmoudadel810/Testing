import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar } from './ui/avatar';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
  Smartphone,
  Laptop,
  Gamepad2,
  Home,
  Headphones,
  Tablet,
  LogOut,
  Settings,
  Package,
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import '../App.css';

const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const categories = [
    { name: 'Smartphones', icon: Smartphone, href: '/shop?category=smartphones' },
    { name: 'Laptops', icon: Laptop, href: '/shop?category=laptops' },
    { name: 'Gaming', icon: Gamepad2, href: '/shop?category=gaming' },
    { name: 'Smart Home', icon: Home, href: '/shop?category=smart-home' },
    { name: 'Audio', icon: Headphones, href: '/shop?category=audio' },
    { name: 'Tablets', icon: Tablet, href: '/shop?category=tablets' },
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Deals', href: '/deals', badge: 'Hot' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const cartItemCount = cart.length;
  const wishlistItemCount = wishlist.length;
  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer select-none" onClick={() => navigate('/')}> 
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            {/* Optionally, you can put a simple icon or leave it empty for now */}
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
            Pioneer
          </span>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={`nav-animated-link px-4 py-2 rounded-full font-medium transition-colors flex items-center relative ${
                        isActive(link.href)
                          ? 'text-blue-700 nav-animated-link-active'
                          : 'text-gray-800 hover:text-blue-700'
                      }`}
                      style={{overflow: 'hidden'}}
                    >
                      {link.icon && <link.icon size={16} className="mr-2 text-blue-500" />}
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Search Bar */}
        <div className="hidden md:flex items-center w-72 ml-6">
          <Input
            type="text"
            placeholder="Search electronics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10 pr-4 py-2.5 bg-white/70 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-zinc-900 placeholder:text-zinc-400 shadow-sm"
            startIcon={<Search size={20} className="text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />}
          />
        </div>
        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="relative hidden md:flex p-2 rounded-full" onClick={() => navigate('/wishlist')}>
            <Heart size={22} />
            {wishlistItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-pink-500 text-white border-2 border-white shadow">{wishlistItemCount}</Badge>
            )}
          </Button>
          <Button variant="ghost" className="relative p-2 rounded-full" onClick={() => navigate('/cart')}>
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white border-2 border-white shadow">{cartItemCount}</Badge>
            )}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:flex items-center gap-2 p-2 rounded-full">
                  <Avatar className="w-6 h-6"><User size={18} /></Avatar>
                  <span className="text-sm font-semibold">{user.name}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2"><User size={16} /> Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex items-center gap-2"><Package size={16} /> Orders</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center gap-2"><Settings size={16} /> Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 flex items-center gap-2 cursor-pointer">
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" className="hidden md:flex items-center gap-2 p-2 rounded-full" onClick={() => navigate('/login')}>
              <User size={22} />
              <span className="text-sm font-semibold">Sign In</span>
            </Button>
          )}
          {/* Mobile Menu Button */}
          <Button variant="ghost" className="lg:hidden p-2 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl shadow-2xl">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-lg font-semibold rounded-xl px-3 transition-all duration-200 ${isActive(link.href) ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-md' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-100'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Separator />
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors"
                  >
                    <span className="bg-gradient-to-br from-blue-600 to-orange-500 p-2 rounded-lg text-white">
                      <category.icon size={20} />
                    </span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
              {user && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2">Account</h3>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block py-2 px-3 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors">Profile</Link>
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block py-2 px-3 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors">Cart ({cartItemCount})</Link>
                    <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block py-2 px-3 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors">Wishlist ({wishlistItemCount})</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 px-3 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors">Admin Dashboard</Link>
                    )}
                    <Button variant="ghost" onClick={handleLogout} className="w-full text-left py-2 px-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">Logout</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;

