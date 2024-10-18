import { userServiceClient } from "./apiClient";
import { userServiceEndpoints } from "./endpoints";

export const UserServiceApi = {
	connectReferral: async (referrer_link: string) => {
		try {
			const response = await userServiceClient.post(userServiceEndpoints.connectReferral, {
				referrer_link
			});
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	getUser: async () => {
		try {
			const response = await userServiceClient.get(userServiceEndpoints.getUser);
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	login: async (initData: string) => {
		try {
			const payload = {
				init_data: initData,
			};
			const response = await userServiceClient.post(userServiceEndpoints.auth, payload);
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	addWallet: async (wallet: string) => {
		try {

			const payload = {
				wallet_id: wallet,
			};
			const response = await userServiceClient.post(userServiceEndpoints.addWallet, payload);
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	removeWallet: async (wallet: string): Promise<void> => {
		try {

			const payload = {
				wallet_id: wallet,
			};
			await userServiceClient.post(userServiceEndpoints.removeWallet, payload);
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
};
