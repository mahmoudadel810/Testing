import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
	Home, 
	ShoppingCart, 
	Heart, 
	User, 
	LogIn, 
	LogOut, 
	UserPlus, 
	Menu, 
	X,
	Shield
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';

const Navbar = () => {
	const { user, logout } = useUserStore();
	const { cart } = useCartStore();
	const { wishlist } = useWishlistStore();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLogout = async () => {
		await logout();
		navigate('/');
	};

	const navLinks = [
		{ to: '/', label: 'Home', icon: Home },
		{ to: '/shop', label: 'Shop', icon: null },
		{ to: '/about', label: 'About', icon: null },
		{ to: '/contact', label: 'Contact', icon: null },
	];

	return (
		<header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
			isScrolled 
				? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
				: 'bg-transparent'
		}`}>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-2">
						<div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
							<span className="text-white font-bold text-xl">E</span>
						</div>
						<span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							ElectroShop
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center space-x-1"
							>
								{link.icon && <link.icon size={18} />}
								<span>{link.label}</span>
							</Link>
						))}
					</nav>

					{/* Right side actions */}
					<div className="flex items-center space-x-4">
						{/* Wishlist */}
						{user && (
							<Link
								to="/wishlist"
								className="relative p-2 text-foreground/80 hover:text-primary transition-colors duration-300"
							>
								<Heart size={20} />
								{wishlist.length > 0 && (
									<span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
										{wishlist.length}
									</span>
								)}
							</Link>
						)}

						{/* Cart */}
						{user && (
							<Link
								to="/cart"
								className="relative p-2 text-foreground/80 hover:text-primary transition-colors duration-300"
							>
								<ShoppingCart size={20} />
								{cart.length > 0 && (
									<span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{/* User Menu */}
						{user ? (
							<div className="flex items-center space-x-2">
								{user.role === 'admin' && (
									<Link
										to="/admin"
										className="flex items-center space-x-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
									>
										<Shield size={16} />
										<span className="hidden sm:inline">Admin</span>
									</Link>
								)}
								
								<Link
									to="/profile"
									className="flex items-center space-x-1 px-3 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-300"
								>
									<User size={16} />
									<span className="hidden sm:inline">Profile</span>
								</Link>

								<button
									onClick={handleLogout}
									className="flex items-center space-x-1 px-3 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors duration-300"
								>
									<LogOut size={16} />
									<span className="hidden sm:inline">Logout</span>
								</button>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<Link
									to="/login"
									className="flex items-center space-x-1 px-3 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-300"
								>
									<LogIn size={16} />
									<span className="hidden sm:inline">Login</span>
								</Link>
								
								<Link
									to="/signup"
									className="flex items-center space-x-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
								>
									<UserPlus size={16} />
									<span className="hidden sm:inline">Sign Up</span>
								</Link>
							</div>
						)}

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors duration-300"
						>
							{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
				>
					<div className="container mx-auto px-4 py-4">
						<nav className="flex flex-col space-y-4">
							{navLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									onClick={() => setIsMobileMenuOpen(false)}
									className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center space-x-2 py-2"
								>
									{link.icon && <link.icon size={18} />}
									<span>{link.label}</span>
								</Link>
							))}
							
							{user && (
								<>
									<Link
										to="/wishlist"
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center space-x-2 py-2"
									>
										<Heart size={18} />
										<span>Wishlist ({wishlist.length})</span>
									</Link>
									
									<Link
										to="/cart"
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center space-x-2 py-2"
									>
										<ShoppingCart size={18} />
										<span>Cart ({cart.length})</span>
									</Link>
									
									<Link
										to="/profile"
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center space-x-2 py-2"
									>
										<User size={18} />
										<span>Profile</span>
									</Link>
									
									{user.role === 'admin' && (
										<Link
											to="/admin"
											onClick={() => setIsMobileMenuOpen(false)}
											className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center space-x-2 py-2"
										>
											<Shield size={18} />
											<span>Admin Dashboard</span>
										</Link>
									)}
									
									<button
										onClick={() => {
											handleLogout();
											setIsMobileMenuOpen(false);
										}}
										className="text-foreground/80 hover:text-destructive transition-colors duration-300 flex items-center space-x-2 py-2 w-full text-left"
									>
										<LogOut size={18} />
										<span>Logout</span>
									</button>
								</>
							)}
						</nav>
					</div>
				</motion.div>
			)}
		</header>
	);
};

export default Navbar;

