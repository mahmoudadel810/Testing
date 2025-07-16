import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
	wishlist: [],
	loading: false,

	addToWishlist: (product) => {
		set((prevState) => {
			const existingItem = prevState.wishlist.find((item) => item._id === product._id);
			if (existingItem) {
				toast.error("Product already in wishlist");
				return prevState;
			}
			toast.success("Product added to wishlist");
			return { wishlist: [...prevState.wishlist, product] };
		});
	},

	removeFromWishlist: (productId) => {
		set((prevState) => ({
			wishlist: prevState.wishlist.filter((item) => item._id !== productId)
		}));
		toast.success("Product removed from wishlist");
	},

	clearWishlist: () => {
		set({ wishlist: [] });
	},

	isInWishlist: (productId) => {
		return get().wishlist.some((item) => item._id === productId);
	},

	getWishlistCount: () => {
		return get().wishlist.length;
	},
}));