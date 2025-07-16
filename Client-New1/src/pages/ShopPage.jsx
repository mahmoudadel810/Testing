import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useUserStore } from '../stores/useUserStore';
import LoadingSpinner from '../components/LoadingSpinner';

const ShopPage = () => {
	const { user } = useUserStore();
	const { products, fetchAllProducts, loading } = useProductStore();
	const { addToCart } = useCartStore();
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
	
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sortBy, setSortBy] = useState('name');
	const [viewMode, setViewMode] = useState('grid');
	const [priceRange, setPriceRange] = useState([0, 10000]);

	const categories = [
		{ id: 'all', name: 'All Products' },
		{ id: 'smartphones', name: 'Smartphones' },
		{ id: 'laptops', name: 'Laptops' },
		{ id: 'gaming', name: 'Gaming' },
		{ id: 'audio', name: 'Audio' },
		{ id: 'accessories', name: 'Accessories' }
	];

	const sortOptions = [
		{ value: 'name', label: 'Name A-Z' },
		{ value: 'name-desc', label: 'Name Z-A' },
		{ value: 'price', label: 'Price Low to High' },
		{ value: 'price-desc', label: 'Price High to Low' },
		{ value: 'rating', label: 'Highest Rated' },
		{ value: 'newest', label: 'Newest First' }
	];

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	const filteredProducts = products.filter(product => {
		const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
							product.description?.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
		const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
		
		return matchesSearch && matchesCategory && matchesPrice;
	});

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (sortBy) {
			case 'name':
				return a.name.localeCompare(b.name);
			case 'name-desc':
				return b.name.localeCompare(a.name);
			case 'price':
				return a.price - b.price;
			case 'price-desc':
				return b.price - a.price;
			case 'rating':
				return (b.rating || 0) - (a.rating || 0);
			case 'newest':
				return new Date(b.createdAt) - new Date(a.createdAt);
			default:
				return 0;
		}
	});

	const handleAddToCart = (product) => {
		if (!user) {
			// Redirect to login or show login modal
			return;
		}
		addToCart(product);
	};

	const handleWishlistToggle = (product) => {
		if (!user) {
			// Redirect to login or show login modal
			return;
		}
		if (isInWishlist(product._id)) {
			removeFromWishlist(product._id);
		} else {
			addToWishlist(product);
		}
	};

	const ProductCard = ({ product, index }) => {
		const isWishlisted = isInWishlist(product._id);

		return (
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
				whileHover={{ y: -10 }}
				className={`group bg-card rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
					viewMode === 'list' ? 'flex items-center space-x-4' : ''
				}`}
			>
				<div className={`relative overflow-hidden rounded-lg mb-4 ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : ''}`}>
					<img
						src={product.images?.[0] || '/placeholder-product.jpg'}
						alt={product.name}
						className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
							viewMode === 'list' ? 'h-32' : 'h-48'
						}`}
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
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => handleWishlistToggle(product)}
						className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
							isWishlisted 
								? 'bg-red-500 text-white' 
								: 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
						}`}
					>
						<Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
					</motion.button>
				</div>
				
				<div className={`space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
					<h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
						{product.name}
					</h3>
					
					{viewMode === 'grid' && (
						<p className="text-muted-foreground text-sm line-clamp-2">
							{product.description}
						</p>
					)}
					
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
					
					<div className="flex items-center justify-between">
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
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => handleAddToCart(product)}
							className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors duration-300"
						>
							<ShoppingCart size={16} />
						</motion.button>
					</div>
				</div>
			</motion.div>
		);
	};

	if (loading) return <LoadingSpinner />;

	return (
		<div className="min-h-screen bg-background pt-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-8"
				>
					<h1 className="text-4xl font-bold mb-4">
						Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Products</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Discover amazing electronics and gadgets at unbeatable prices
					</p>
				</motion.div>

				{/* Filters and Search */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="bg-card rounded-xl p-6 mb-8 border border-border"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Search */}
						<div className="relative">
							<Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
							<input
								type="text"
								placeholder="Search products..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
							/>
						</div>

						{/* Category Filter */}
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
						>
							{categories.map(category => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>

						{/* Sort */}
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
						>
							{sortOptions.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>

						{/* View Mode */}
						<div className="flex items-center space-x-2">
							<button
								onClick={() => setViewMode('grid')}
								className={`p-2 rounded-lg transition-colors duration-300 ${
									viewMode === 'grid' 
										? 'bg-primary text-white' 
										: 'bg-secondary text-muted-foreground hover:text-foreground'
								}`}
							>
								<Grid size={20} />
							</button>
							<button
								onClick={() => setViewMode('list')}
								className={`p-2 rounded-lg transition-colors duration-300 ${
									viewMode === 'list' 
										? 'bg-primary text-white' 
										: 'bg-secondary text-muted-foreground hover:text-foreground'
								}`}
							>
								<List size={20} />
							</button>
						</div>
					</div>

					{/* Price Range */}
					<div className="mt-4">
						<label className="block text-sm font-medium text-foreground mb-2">
							Price Range: ${priceRange[0]} - ${priceRange[1]}
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="range"
								min="0"
								max="10000"
								value={priceRange[0]}
								onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
								className="flex-1"
							/>
							<input
								type="range"
								min="0"
								max="10000"
								value={priceRange[1]}
								onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
								className="flex-1"
							/>
						</div>
					</div>
				</motion.div>

				{/* Results Count */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="mb-6"
				>
					<p className="text-muted-foreground">
						Showing {sortedProducts.length} of {products.length} products
					</p>
				</motion.div>

				{/* Products Grid */}
				<div className={`grid gap-6 ${
					viewMode === 'grid' 
						? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
						: 'grid-cols-1'
				}`}>
					{sortedProducts.map((product, index) => (
						<ProductCard key={product._id} product={product} index={index} />
					))}
				</div>

				{/* No Results */}
				{sortedProducts.length === 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center py-12"
					>
						<p className="text-xl text-muted-foreground mb-4">
							No products found matching your criteria
						</p>
						<button
							onClick={() => {
								setSearchQuery('');
								setSelectedCategory('all');
								setPriceRange([0, 10000]);
							}}
							className="text-primary hover:text-primary/80 font-semibold"
						>
							Clear all filters
						</button>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default ShopPage;