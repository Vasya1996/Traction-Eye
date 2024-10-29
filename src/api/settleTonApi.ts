import { settleTonClient } from "./apiClient";
import {settleTonEndpoints} from "./endpoints";
import { TransformedSettleTonResponse, transformSettleTonResponse } from "@/utils/settleTonParser";

export const SETTLE_API = {
	getSettleTonJettons: async (userRawAddress?: string): Promise<TransformedSettleTonResponse> => {
		try {
			const response = await settleTonClient.get(
				`${settleTonEndpoints.jettons}/${userRawAddress}/`,
			);

			return transformSettleTonResponse(response.data);
		} catch (error) {
			console.error("Error fetching settle ton jettons:", error);
			throw error;
		}
	},
};
