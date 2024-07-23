import { Asset, LPResponse } from "@/types";
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
  },

  getNftsByWallet: async (wallet: string) => {
    try {
      const payload = { wallet_address: wallet };
      const response = await apiClient.post(endpoints.gethNFTsByWallet, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching nfts:", error);
			throw error;
    }
  },

  getStonfiInfo: async (wallet: string): Promise<LPResponse> => {
    try {
      const payload = { wallet_address: wallet };
      const response = await apiClient.post(endpoints.getStonfiInfo, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching nfts:", error);
			throw error;
    }
  }
}