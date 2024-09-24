import { tonCenterApi } from "./apiClient";
import endpoints from "./endpoints";

export const TON_CENTER_API = {
	getUserWalletCreationDate: async (wallet_address: string): Promise<number> => {
		try {
            const response = await tonCenterApi.get(
				endpoints.getUserWalletCreationDate(wallet_address)
			);

			return response.data?.transactions?.[0].now;
		} catch (error) { 
			console.error("Error fetching users:", error);
			throw error;
		}
	},
};
