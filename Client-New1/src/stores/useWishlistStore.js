import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useWishlistStore = create((set, get) => ({
	wishlist: [],
	loading: false,

	fetchWishlist: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/wishlist");
			set({ wishlist: response.data, loading: false });
		} catch (error) {
			set({ wishlist: [], loading: false });
			console.error("Error fetching wishlist:", error);
		}
	},

	addToWishlist: async (product) => {
		try {
			await axios.post("/wishlist", { productId: product._id });
			set((prevState) => {
				const isAlreadyInWishlist = prevState.wishlist.find(item => item._id === product._id);
				if (isAlreadyInWishlist) {
					toast.error("Product is already in your wishlist");
					return prevState;
				}
				toast.success("Added to wishlist");
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
				wishlist: prevState.wishlist.filter(item => item._id !== productId)
			}));
			toast.success("Removed from wishlist");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to remove from wishlist");
		}
	},

	isInWishlist: (productId) => {
		return get().wishlist.some(item => item._id === productId);
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

	getWishlistCount: () => {
		return get().wishlist.length;
	},
}));