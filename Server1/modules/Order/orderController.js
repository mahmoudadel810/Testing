import orderModel from "../../DB/models/orderModel.js";
import userModel from "../../DB/models/userModel.js";
import { errorHandler } from "../../utils/errorHandler.js";

//==================================Get User Orders======================================

export const getUserOrders = async (req, res, next) => {
	try {
		const orders = await orderModel.find({ user: req.user._id })
			.populate('products.product', 'name image price')
			.sort({ createdAt: -1 });

		res.json({
			success: true,
			message: "User orders retrieved successfully",
			data: orders
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
};

//==================================Get All Orders (Admin)======================================

export const getAllOrders = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, status } = req.query;
		const skip = (page - 1) * limit;

		let query = {};
		if (status) {
			query.status = status;
		}

		const orders = await orderModel.find(query)
			.populate('user', 'name email')
			.populate('products.product', 'name image price')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(parseInt(limit));

		const totalOrders = await orderModel.countDocuments(query);

		res.json({
			success: true,
			message: "All orders retrieved successfully",
			data: orders,
			pagination: {
				currentPage: parseInt(page),
				totalPages: Math.ceil(totalOrders / limit),
				totalOrders,
				hasNextPage: page * limit < totalOrders,
				hasPrevPage: page > 1
			}
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
};

//==================================Get Order By ID======================================

export const getOrderById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await orderModel.findById(id)
			.populate('user', 'name email')
			.populate('products.product', 'name image price description');

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found"
			});
		}

		// Check if user can access this order
		if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
			return res.status(403).json({
				success: false,
				message: "Access denied. You can only view your own orders."
			});
		}

		res.json({
			success: true,
			message: "Order retrieved successfully",
			data: order
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
};

//==================================Update Order Status (Admin)======================================

export const updateOrderStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const order = await orderModel.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		).populate('user', 'name email');

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found"
			});
		}

		res.json({
			success: true,
			message: "Order status updated successfully",
			data: order
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
};

//==================================Delete Order (Admin)======================================

export const deleteOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await orderModel.findByIdAndDelete(id);

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found"
			});
		}

		res.json({
			success: true,
			message: "Order deleted successfully"
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
}; 