import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
	Star, 
	Heart, 
	ShoppingCart, 
	Filter, 
	Grid, 
	List,
	ChevronLeft,
	Search
} from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useUserStore } from '../stores/useUserStore';
import LoadingSpinner from '../components/LoadingSpinner';

const CategoryPage = () => {
	const { category } = useParams();
	const { user } = useUserStore();
	const { fetchProductsByCategory, products, loading } = useProductStore();
	const { addToCart } = useCartStore();
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
	
	const [viewMode, setViewMode] = useState('grid');
	const [sortBy, setSortBy] = useState('name');
	const [searchTerm, setSearchTerm] = useState('');
	const [priceRange, setPriceRange] = useState([0, 10000]);

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	const filteredProducts = products
		.filter(product => 
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			product.price >= priceRange[0] && product.price <= priceRange[1]
		)
		.sort((a, b) => {
			switch (sortBy) {
				case 'price-low':
					return a.price - b.price;
				case 'price-high':
					return b.price - a.price;
				case 'rating':
					return (b.rating || 0) - (a.rating || 0);
				case 'name':
				default:
					return a.name.localeCompare(b.name);
			}
		});

	const ProductCard = ({ product, index }) => {
		const isWishlisted = isInWishlist(product._id);

		const handleAddToCart = () => {
			if (!user) {
				// Redirect to login or show login modal
				return;
			}
			addToCart(product);
		};

		const handleWishlistToggle = () => {
			if (!user) {
				// Redirect to login or show login modal
				return;
			}
			if (isWishlisted) {
				removeFromWishlist(product._id);
			} else {
				addToWishlist(product);
			}
		};

		return (
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
				whileHover={{ y: -10 }}
				className={`group bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
					viewMode === 'grid' ? 'p-4' : 'p-6 flex space-x-6'
				}`}
			>
				<div className={`relative overflow-hidden rounded-lg ${
					viewMode === 'grid' ? 'mb-4' : 'w-48 flex-shrink-0'
				}`}>
					<img
						src={product.images?.[0] || '/placeholder-product.jpg'}
						alt={product.name}
						className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
							viewMode === 'grid' ? 'w-full h-48' : 'w-full h-32'
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
						onClick={handleWishlistToggle}
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
					<Link to={`/product/${product._id}`}>
						<h3 className={`font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300 ${
							viewMode === 'grid' ? 'text-lg' : 'text-xl'
						}`}>
							{product.name}
						</h3>
					</Link>
					
					{viewMode === 'list' && (
						<p className="text-muted-foreground line-clamp-2">
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
					
					<div className="flex items-center space-x-2">
						<span className={`font-bold text-primary ${
							viewMode === 'grid' ? 'text-xl' : 'text-2xl'
						}`}>
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
						onClick={handleAddToCart}
						className={`bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center space-x-2 ${
							viewMode === 'grid' ? 'w-full' : 'w-auto px-6'
						}`}
					>
						<ShoppingCart size={16} />
						<span>Add to Cart</span>
					</motion.button>
				</div>
			</motion.div>
		);
	};

	if (loading) return <LoadingSpinner />;

	return (
		<div className="min-h-screen bg-background pt-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
					<Link to="/" className="hover:text-primary transition-colors">Home</Link>
					<ChevronLeft size={16} />
					<Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
					<ChevronLeft size={16} />
					<span className="text-foreground capitalize">{category}</span>
				</nav>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold mb-4">
						{category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
					</h1>
					<p className="text-xl text-muted-foreground">
						Discover our amazing collection of {category.replace('-', ' ')}
					</p>
				</motion.div>

				{/* Filters and Search */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="bg-card rounded-xl p-6 mb-8 shadow-lg"
				>
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
						{/* Search */}
						<div className="relative flex-1 max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>

						{/* Sort and View */}
						<div className="flex items-center space-x-4">
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="name">Sort by Name</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
								<option value="rating">Sort by Rating</option>
							</select>

							<div className="flex items-center space-x-2">
								<button
									onClick={() => setViewMode('grid')}
									className={`p-2 rounded-lg transition-colors ${
										viewMode === 'grid' 
											? 'bg-primary text-white' 
											: 'bg-secondary text-muted-foreground hover:text-foreground'
									}`}
								>
									<Grid size={20} />
								</button>
								<button
									onClick={() => setViewMode('list')}
									className={`p-2 rounded-lg transition-colors ${
										viewMode === 'list' 
											? 'bg-primary text-white' 
											: 'bg-secondary text-muted-foreground hover:text-foreground'
									}`}
								>
									<List size={20} />
								</button>
							</div>
						</div>
					</div>

					{/* Price Range Filter */}
					<div className="mt-4 pt-4 border-t border-border">
						<label className="block text-sm font-medium mb-2">Price Range</label>
						<div className="flex items-center space-x-4">
							<input
								type="number"
								placeholder="Min"
								value={priceRange[0]}
								onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
								className="w-24 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<span className="text-muted-foreground">to</span>
							<input
								type="number"
								placeholder="Max"
								value={priceRange[1]}
								onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
								className="w-24 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
					</div>
				</motion.div>

				{/* Results Count */}
				<div className="mb-6">
					<p className="text-muted-foreground">
						Showing {filteredProducts.length} of {products.length} products
					</p>
				</div>

				{/* Products Grid */}
				{filteredProducts.length === 0 ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-16"
					>
						<h2 className="text-2xl font-semibold text-muted-foreground mb-4">
							No products found
						</h2>
						<p className="text-muted-foreground">
							Try adjusting your search criteria or browse our other categories
						</p>
					</motion.div>
				) : (
					<div className={`grid gap-6 ${
						viewMode === 'grid' 
							? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
							: 'grid-cols-1'
					}`}>
						{filteredProducts.map((product, index) => (
							<ProductCard key={product._id} product={product} index={index} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryPage;