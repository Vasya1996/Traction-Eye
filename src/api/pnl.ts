import { getPnlByAddressPayload, getTokenPnlByAddressPayload, ChartData } from "@/types";
import { newApiClient } from "./apiClient";
import endpoints from "./endpoints";

export const PNL_API = {
	getPnlByAddress: async ({ wallet_address, interval, period }: getPnlByAddressPayload): Promise<ChartData[]> => {
		try {
            const response = await newApiClient.get(
				endpoints.getPnlByAddress({wallet_address, interval, period})
			);
			return response.data;
		} catch (error) { 
			console.error("Error fetching users:", error);
			throw error;
		}
	},
    getTokenPnlByAddress: async ({ wallet_address, token_address, interval, period }: getTokenPnlByAddressPayload): Promise<ChartData[]> => {
        try {
          console.log("req made")
        const response = await newApiClient.get(
				endpoints.getTokenPnlByAddress({wallet_address, token_address, interval, period})
			);
      console.log(response.data)
			return response.data;
		} catch (error) {
			console.error("Error fetching users:", error);
			throw error;
		}
    }
};
