import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
	BarChart, 
	PlusCircle, 
	ShoppingBasket, 
	Users, 
	MessageSquare,
	Settings,
	TrendingUp,
	DollarSign,
	Package,
	Eye
} from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { toast } from 'react-hot-toast';

const tabs = [
	{ id: "overview", label: "Overview", icon: BarChart },
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "customers", label: "Customers", icon: Users },
	{ id: "messages", label: "Messages", icon: MessageSquare },
	{ id: "settings", label: "Settings", icon: Settings },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("overview");
	const { fetchAllProducts, products, loading } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	const stats = [
		{
			icon: TrendingUp,
			label: "Total Sales",
			value: "$45,231",
			change: "+20.1%",
			changeType: "positive"
		},
		{
			icon: Package,
			label: "Products",
			value: products.length.toString(),
			change: "+12",
			changeType: "positive"
		},
		{
			icon: Users,
			label: "Customers",
			value: "2,350",
			change: "+180.1%",
			changeType: "positive"
		},
		{
			icon: DollarSign,
			label: "Revenue",
			value: "$12,234",
			change: "+19%",
			changeType: "positive"
		}
	];

	const recentProducts = products.slice(0, 5);

	const OverviewTab = () => (
		<div className="space-y-8">
			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						className="bg-card rounded-xl p-6 shadow-lg"
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
								<p className="text-2xl font-bold">{stat.value}</p>
							</div>
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<stat.icon size={24} className="text-primary" />
							</div>
						</div>
						<div className="mt-4 flex items-center">
							<span className={`text-sm font-medium ${
								stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
							}`}>
								{stat.change}
							</span>
							<span className="text-sm text-muted-foreground ml-2">from last month</span>
						</div>
					</motion.div>
				))}
			</div>

			{/* Recent Products */}
			<div className="bg-card rounded-xl p-6 shadow-lg">
				<h3 className="text-xl font-semibold mb-4">Recent Products</h3>
				<div className="space-y-4">
					{recentProducts.map((product, index) => (
						<motion.div
							key={product._id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
						>
							<div className="flex items-center space-x-4">
								<img
									src={product.images?.[0] || '/placeholder-product.jpg'}
									alt={product.name}
									className="w-12 h-12 rounded-lg object-cover"
								/>
								<div>
									<h4 className="font-semibold">{product.name}</h4>
									<p className="text-sm text-muted-foreground">{product.category}</p>
								</div>
							</div>
							<div className="text-right">
								<p className="font-bold text-primary">${product.price}</p>
								<p className="text-sm text-muted-foreground">
									{product.isFeatured ? 'Featured' : 'Regular'}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);

	const CreateProductTab = () => (
		<div className="bg-card rounded-xl p-6 shadow-lg">
			<h3 className="text-xl font-semibold mb-6">Create New Product</h3>
			<p className="text-muted-foreground mb-6">
				This feature will be implemented with a comprehensive product creation form.
			</p>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
			>
				<PlusCircle size={18} />
				<span>Create Product</span>
			</motion.button>
		</div>
	);

	const ProductsTab = () => (
		<div className="bg-card rounded-xl p-6 shadow-lg">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold">All Products</h3>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
				>
					<PlusCircle size={16} />
					<span>Add Product</span>
				</motion.button>
			</div>
			
			{loading ? (
				<div className="text-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
					<p className="mt-2 text-muted-foreground">Loading products...</p>
				</div>
			) : (
				<div className="space-y-4">
					{products.map((product, index) => (
						<motion.div
							key={product._id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
						>
							<div className="flex items-center space-x-4">
								<img
									src={product.images?.[0] || '/placeholder-product.jpg'}
									alt={product.name}
									className="w-16 h-16 rounded-lg object-cover"
								/>
								<div>
									<h4 className="font-semibold">{product.name}</h4>
									<p className="text-sm text-muted-foreground">{product.category}</p>
									<p className="text-sm text-muted-foreground">{product.description}</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="text-right">
									<p className="font-bold text-primary">${product.price}</p>
									<p className="text-sm text-muted-foreground">
										Stock: {product.stock || 'N/A'}
									</p>
								</div>
								<div className="flex space-x-2">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="p-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
									>
										<Eye size={16} />
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
									>
										<Settings size={16} />
									</motion.button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);

	const CustomersTab = () => (
		<div className="bg-card rounded-xl p-6 shadow-lg">
			<h3 className="text-xl font-semibold mb-6">Customer Management</h3>
			<p className="text-muted-foreground">
				Customer management features will be implemented here.
			</p>
		</div>
	);

	const MessagesTab = () => (
		<div className="bg-card rounded-xl p-6 shadow-lg">
			<h3 className="text-xl font-semibold mb-6">Contact Messages</h3>
			<p className="text-muted-foreground">
				Contact form messages will be displayed here.
			</p>
		</div>
	);

	const SettingsTab = () => (
		<div className="bg-card rounded-xl p-6 shadow-lg">
			<h3 className="text-xl font-semibold mb-6">Admin Settings</h3>
			<p className="text-muted-foreground">
				Admin settings and configuration options will be available here.
			</p>
		</div>
	);

	const renderTabContent = () => {
		switch (activeTab) {
			case "overview":
				return <OverviewTab />;
			case "create":
				return <CreateProductTab />;
			case "products":
				return <ProductsTab />;
			case "customers":
				return <CustomersTab />;
			case "messages":
				return <MessagesTab />;
			case "settings":
				return <SettingsTab />;
			default:
				return <OverviewTab />;
		}
	};

	return (
		<div className="min-h-screen bg-background pt-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold mb-4">
						Admin <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</span>
					</h1>
					<p className="text-xl text-muted-foreground">
						Manage your store, products, and customers
					</p>
				</motion.div>

				{/* Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="flex flex-wrap justify-center mb-8 gap-2"
				>
					{tabs.map((tab) => (
						<motion.button
							key={tab.id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
								activeTab === tab.id
									? "bg-primary text-white shadow-lg"
									: "bg-secondary text-foreground hover:bg-secondary/80"
							}`}
						>
							<tab.icon className="mr-2 h-5 w-5" />
							{tab.label}
						</motion.button>
					))}
				</motion.div>

				{/* Tab Content */}
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{renderTabContent()}
				</motion.div>
			</div>
		</div>
	);
};

export default AdminPage;