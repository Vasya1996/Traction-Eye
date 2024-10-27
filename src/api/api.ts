import { Asset, ChartResponse, JettonInfo, LPPairInfo, LPResponse } from "@/types";
import apiClient from "./apiClient";
import endpoints from "./endpoints";
import { ProtocolTypes } from "@/constants";

export const API = {
	getAssetsByWallet: async (wallet: string): Promise<{ assets: Asset[] }> => {
		try {
			const payload = { wallet_address: wallet };
			const response = await apiClient.post(
				endpoints.getAssetsByWallet,
				payload
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching users:", error);
			throw error;
		}
	},

	getNftsByWallet: async (wallet: string) => {
		try {
			const payload = { wallet_address: wallet };
			const response = await apiClient.post(
				endpoints.gethNFTsByWallet,
				payload
			);
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
			const updatedResponse = (response.data ?? []).map((item: LPPairInfo) => ({ ...item, type: ProtocolTypes.LiquidityPool }));
			return updatedResponse;
		} catch (error) {
			console.error("Error fetching nfts:", error);
			throw error;
		}
	},

	getDedustInfo: async (wallet: string): Promise<LPResponse> => {
		try {
			const payload = { wallet_address: wallet };
			const response = await apiClient.post(endpoints.getDedustInfo, payload);
			const updatedResponse = (response.data ?? []).map((item: LPPairInfo) => ({ ...item, type: ProtocolTypes.LiquidityPool }));
			return updatedResponse;
		} catch (error) {
			console.error("Error fetching nfts:", error);
			throw error;
		}
	},

	getChart: async (
		wallet: string,
		assetWallet: string,
		period_s = 0
	): Promise<ChartResponse> => {
		try {
			const payload = {
				master_jetton_address: assetWallet,
				wallet_address: wallet,
				period_s,
			};
			const response = await apiClient.post(endpoints.getChart, payload);
			return response.data;
		} catch (error) {
			console.error("Error fetching nfts:", error);
			throw error;
		}
	},

	getJettonInfo: async (
		wallet: string,
		assetWallet: string,
		period_s = 0
	): Promise<JettonInfo> => {
		try {
			const payload = {
				master_jetton_address: assetWallet,
				wallet_address: wallet,
				period_s,
			};
			const response = await apiClient.post(endpoints.getJettonInfo, payload);
			return response.data;
		} catch (error) {
			console.error("Error fetching nfts:", error);
			throw error;
		}
	},

	login: async (initData: string) => {
		try {
			const payload = {
				init_data: initData,
			};
			const response = await apiClient.post(endpoints.login, payload);
			return response.data;
		} catch (error) {
			console.error("Error loging", error);
			throw error;
		}
	},

	getTotalPnl: async (
		wallet_address: string,
		start_s: number
	): Promise<{ pnl_usd: number; pnl_percentage: number }> => {
		try {
			const response = await apiClient.get(
				endpoints.getAssetsPnl(wallet_address, start_s)
			);
			return response.data;
		} catch (error) {
			console.error("Error getTotalPnl", error);
			throw error;
		}
	},

	getAdditionalNftInfo: async (
		nft_address: string
	): Promise<{
		nft_address: string;
		name: string;
		collection_name: string;
		collection_address: string;
		floor_price_ton: string;
		floor_price_usd: string;
		last_transaction_timestamp: number;
		last_transaction_date: string;
	}> => {
		try {
      const payload = {
				nft_address,
			};
			const response = await apiClient.post(
				endpoints.getAdditionalNftInfo,
				payload
			);
			return response.data;
		} catch (error) {
			console.error("Error getTotalPnl", error);
			throw error;
		}
	},

  addWallet: async (
    telegram_id: number,
    wallet_address: string,
  ) => {
		try {
      const payload = {
				telegram_id,
        		wallet_address
			};
			const response = await apiClient.post(
				endpoints.addWallet,
				payload
			);
			return response.data;
		} catch (error) {
			console.error("Error getTotalPnl", error);
			return;
			// throw error;
		}
	},
};
