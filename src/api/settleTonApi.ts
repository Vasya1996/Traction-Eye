import { settleTonClient } from "./apiClient";
import {settleTonEndpoints} from "./endpoints";
import { TransformedSettleTonResponse, transformSettleTonResponse } from "@/utils/settleTonParser";

export const SETTLE_API = {
	getSettleTonJettons: async (userRawAddress: string): Promise<TransformedSettleTonResponse> => {
		try {
			console.log('---qweqwes', `${settleTonEndpoints.jettons}/${userRawAddress}`);
			// const response = await settleTonClient.get(
			// 	`${settleTonEndpoints.jettons}/${userRawAddress}`,
			// );

			const response = {
				data: {
					"ok": true,
					"result": {
						"indexes": [
							{
								"apy": 5.98,
								"balance": 12957668513,
								"balance_in_usdt": 1.3054489896626043,
								"icon": "https://cache.tonapi.io/imgproxy/hZlCIZjFSFD-i7hddZafExsfvsDNgFGICtjitDB11Qc/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZWFsLXRpcmVkLXBvcnBvaXNlLTExNC5teXBpbmF0YS5jbG91ZC9pcGZzL1FtUzRMQmZZYTl2Wk1YSGJKcEIxN0FHdThSTVRNczZrNjF4aU4yd2tRZnRmUVY.webp",
								"name": "SettleTON Index - Middle #1",
								"price": 100747213
							}
						],
						"vaults": [
							{
								"apy": 18.26,
								"balance": 52253373006,
								"balance_in_usdt": 0.35616212561127636,
								"icon": "https://cache.tonapi.io/imgproxy/hZlCIZjFSFD-i7hddZafExsfvsDNgFGICtjitDB11Qc/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZWFsLXRpcmVkLXBvcnBvaXNlLTExNC5teXBpbmF0YS5jbG91ZC9pcGZzL1FtUzRMQmZZYTl2Wk1YSGJKcEIxN0FHdThSTVRNczZrNjF4aU4yd2tRZnRmUVY.webp",
								"name": "USDT Vault",
								"price": 6816060
							}
						]
					}
				}
			}

			console.log('---response',response);
			return transformSettleTonResponse(response.data);
		} catch (error) {
			console.error("Error fetching settle ton jettons:", error);
			throw error;
		}
	},
};
