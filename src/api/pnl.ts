import { Asset } from "@/types";
import { getPnlByAddressPayload, getTokenPnlByAddressPayload } from "@/types";
import apiClient from "./apiClient";
import endpoints from "./endpoints";

export const PNL_API = {
	getPnlByAddress: async ({ wallet_address, interval }: getPnlByAddressPayload): Promise<{ assets: Asset[] }> => {
		try {
            const response = await apiClient.get(
				endpoints.getPnlByAddress({wallet_address, interval})
			);
			return response.data;
		} catch (error) { 
			console.error("Error fetching users:", error);
			throw error;
		}
	},
    getTokenPnlByAddress: async ({ wallet_address, token_address, interval }: getTokenPnlByAddressPayload): Promise<{ assets: Asset[] }> => {
        try {
            const response = await apiClient.get(
				endpoints.getTokenPnlByAddress({wallet_address, token_address, interval})
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching users:", error);
			throw error;
		}
    }
};
