import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: String,
			enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
			default: 'pending'
		},
		shippingAddress: {
			street: String,
			city: String,
			state: String,
			zipCode: String,
			country: String
		},
		stripeSessionId: {
			type: String,
			unique: true,
		},
		paymentStatus: {
			type: String,
			enum: ['pending', 'paid', 'failed', 'refunded'],
			default: 'pending'
		}
	},
	{ timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel; 