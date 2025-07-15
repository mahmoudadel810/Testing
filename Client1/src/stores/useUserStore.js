import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ name, email, password, confirmPassword }) => {
		console.log({ name, email, password, confirmPassword });
		
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}
		try {
			console.log("=================?");
			const res = await axios.post("/auth/signup", { name, email, password });
			set({  loading: false });
			return res.data
			
			
		} catch (error) {
			console.log("=================develober in error");
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	login: async (email, password) => {
		console.log(email, password);
		
		set({ loading: true });

		try {
			console.log("TRUE");
			
			const res = await axios.post("/auth/login", { email, password });
			console.log(res.data);
			
			// if(!res.data.user.isConfirmed){
			// 	toast.error("confirm email after login")
			// 	set({ user: null, loading: false });
			// }else{

			// 	;
			// 	toast.success(res.data.message)
			// }
			set({ user: res.data, loading: false })
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	forgetPassword:async(email)=>{
		set({ loading: true });
		try{
			const res = await axios.post("/auth/forgot-password", { email });
			set({loading:false})
			
			// return res.data
			console.log(res);
			
		
			

			return res.data
		} catch(error){
			console.log({"error in get password":error});
			toast.error(error.response.data.message || "An error occurred");
			set({loading:false})  
		}
	},
	resetPassword:async( {code, newPassword, confirmNewPassword})=>{
		// console.log({code, newPassword, confirmNewPassword});
		
		set({ loading: true });
		try{
			const res = await axios.post("/auth/reset-password", { code, newPassword, confirmNewPassword });
			set({loading:false})
			
			// return res.data
			console.log(res);
			
		
			

			return res.data
		} catch(error){
			console.log({"error in get password":error});
			toast.error(error.response.data.message || "An error occurred");
			set({loading:false})  
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
