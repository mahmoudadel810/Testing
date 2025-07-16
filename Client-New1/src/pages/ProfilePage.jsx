import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
	User, 
	Mail, 
	Calendar, 
	ShoppingBag, 
	Heart, 
	Settings, 
	LogOut,
	Edit,
	Save,
	X
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
	const { user, logout } = useUserStore();
	const { cart } = useCartStore();
	const { wishlist } = useWishlistStore();
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({
		name: user?.name || '',
		email: user?.email || ''
	});

	const handleEdit = () => {
		setEditData({
			name: user?.name || '',
			email: user?.email || ''
		});
		setIsEditing(true);
	};

	const handleSave = () => {
		// Here you would typically make an API call to update user data
		toast.success('Profile updated successfully!');
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditData({
			name: user?.name || '',
			email: user?.email || ''
		});
	};

	const handleLogout = async () => {
		await logout();
		toast.success('Logged out successfully');
	};

	const stats = [
		{
			icon: ShoppingBag,
			label: 'Orders',
			value: '12',
			color: 'text-blue-500'
		},
		{
			icon: Heart,
			label: 'Wishlist',
			value: wishlist.length.toString(),
			color: 'text-red-500'
		},
		{
			icon: ShoppingBag,
			label: 'Cart Items',
			value: cart.length.toString(),
			color: 'text-green-500'
		}
	];

	const recentOrders = [
		{
			id: 1,
			item: 'Wireless Headphones',
			price: '$59.99',
			date: '2024-01-15',
			status: 'Delivered'
		},
		{
			id: 2,
			item: 'Smart Watch',
			price: '$129.99',
			date: '2024-01-10',
			status: 'Shipped'
		},
		{
			id: 3,
			item: 'Bluetooth Speaker',
			price: '$39.99',
			date: '2024-01-05',
			status: 'Delivered'
		}
	];

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
						My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Profile</span>
					</h1>
					<p className="text-xl text-muted-foreground">
						Manage your account and view your activity
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Profile Card */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="lg:col-span-1"
					>
						<div className="bg-card rounded-2xl shadow-xl p-8">
							<div className="text-center mb-8">
								<motion.div
									whileHover={{ scale: 1.05 }}
									className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-primary/20"
								>
									<img
										src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff&size=128`}
										alt={user?.name}
										className="w-full h-full object-cover"
									/>
								</motion.div>
								
								{isEditing ? (
									<div className="space-y-4">
										<input
											type="text"
											value={editData.name}
											onChange={(e) => setEditData({ ...editData, name: e.target.value })}
											className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
										/>
										<input
											type="email"
											value={editData.email}
											onChange={(e) => setEditData({ ...editData, email: e.target.value })}
											className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
										/>
										<div className="flex space-x-2">
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={handleSave}
												className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
											>
												<Save size={16} />
												<span>Save</span>
											</motion.button>
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={handleCancel}
												className="flex-1 bg-secondary text-foreground py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center space-x-2"
											>
												<X size={16} />
												<span>Cancel</span>
											</motion.button>
										</div>
									</div>
								) : (
									<div>
										<h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
										<p className="text-muted-foreground mb-4">{user?.email}</p>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={handleEdit}
											className="bg-secondary text-foreground py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors flex items-center space-x-2 mx-auto"
										>
											<Edit size={16} />
											<span>Edit Profile</span>
										</motion.button>
									</div>
								)}
							</div>

							{/* Stats */}
							<div className="space-y-4">
								{stats.map((stat, index) => (
									<motion.div
										key={stat.label}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
										className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
									>
										<div className="flex items-center space-x-3">
											<stat.icon size={20} className={stat.color} />
											<span className="font-medium">{stat.label}</span>
										</div>
										<span className="text-2xl font-bold text-primary">{stat.value}</span>
									</motion.div>
								))}
							</div>

							{/* Logout Button */}
							<motion.button
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.5 }}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleLogout}
								className="w-full mt-6 bg-destructive text-white py-3 px-4 rounded-lg hover:bg-destructive/90 transition-colors flex items-center justify-center space-x-2"
							>
								<LogOut size={18} />
								<span>Logout</span>
							</motion.button>
						</div>
					</motion.div>

					{/* Recent Orders */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="lg:col-span-2"
					>
						<div className="bg-card rounded-2xl shadow-xl p-8">
							<h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
								<ShoppingBag size={24} className="text-primary" />
								<span>Recent Orders</span>
							</h3>

							<div className="space-y-4">
								{recentOrders.map((order, index) => (
									<motion.div
										key={order.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
										whileHover={{ y: -2 }}
										className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
									>
										<div className="flex-1">
											<h4 className="font-semibold">{order.item}</h4>
											<p className="text-sm text-muted-foreground">{order.date}</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-primary">{order.price}</p>
											<span className={`text-xs px-2 py-1 rounded-full ${
												order.status === 'Delivered' 
													? 'bg-green-100 text-green-800' 
													: 'bg-blue-100 text-blue-800'
											}`}>
												{order.status}
											</span>
										</div>
									</motion.div>
								))}
							</div>

							{/* Quick Actions */}
							<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
								>
									<ShoppingBag size={18} />
									<span>View All Orders</span>
								</motion.button>
								
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="p-4 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center space-x-2"
								>
									<Settings size={18} />
									<span>Account Settings</span>
								</motion.button>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;