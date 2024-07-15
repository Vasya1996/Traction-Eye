import { Asset } from "@/types";
import apiClient from "./apiClient";
import endpoints from "./endpoints";

export const API = {
  getAssetsByWallet: async (wallet: string): Promise<{assets: Asset[]}> => {
    try {
      const payload = { wallet_address: wallet };
			const response = await apiClient.post(endpoints.getAssetsByWallet, payload);
			return response.data;
		} catch (error) {
			console.error("Error fetching users:", error);
			throw error;
		}
  }
}