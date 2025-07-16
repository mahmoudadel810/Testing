import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useWishlistStore = create((set, get) => ({
	wishlist: [],
	loading: false,

	getWishlistItems: async () => {
		try {
			const res = await axios.get("/wishlist");
			set({ wishlist: res.data });
		} catch (error) {
			set({ wishlist: [] });
			console.error("Error fetching wishlist:", error);
		}
	},

	addToWishlist: async (product) => {
		try {
			await axios.post("/wishlist", { productId: product._id });
			toast.success("Added to wishlist");

			set((prevState) => {
				const existingItem = prevState.wishlist.find((item) => item._id === product._id);
				if (existingItem) {
					toast.error("Product already in wishlist");
					return prevState;
				}
				return { wishlist: [...prevState.wishlist, product] };
			});
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to add to wishlist");
		}
	},

	removeFromWishlist: async (productId) => {
		try {
			await axios.delete("/wishlist", { data: { productId } });
			set((prevState) => ({
				wishlist: prevState.wishlist.filter((item) => item._id !== productId)
			}));
			toast.success("Removed from wishlist");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to remove from wishlist");
		}
	},

	isInWishlist: (productId) => {
		return get().wishlist.some((item) => item._id === productId);
	},

	clearWishlist: async () => {
		try {
			await axios.delete("/wishlist/clear");
			set({ wishlist: [] });
			toast.success("Wishlist cleared");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to clear wishlist");
		}
	},
}));