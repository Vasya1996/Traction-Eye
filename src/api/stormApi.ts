import { stormTonClient } from "./apiClient";
import { stormTonEndpoints } from "./endpoints";

type PositionData = {
	decimals: number;
	direction: "SHORT" | "LONG";
	elp: number;
	entry_price: number;
	fraction: string;
	idx: string;
	leverage: number;
	margin: number;
	market: string;
	name: string;
	notional: number;
	pnl: number;
	price: number;
	rolloverFeeInEvent: string;
	settlementOraclePrice: string;
	size: number;
	temp: {
		bar: number;
		llpf: number;
		lspf: number;
		mmr: number;
		qar: number;
		qarw: number;
		rf: number;
		tps: number;
	};
	timestamp: string;
	total_balance_token: number;
	total_balance_usd: number;
};

type ResponseData = {
	data: PositionData[];
	error: string;
};

export const STORM_API = {
	getStormPositions: async (rawAdress?: string): Promise<ResponseData> => {
		try {
			const response = await stormTonClient.post(
				`${stormTonEndpoints.positions}`,
				{ wallet: rawAdress }
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching storm jettons:", error);
			throw error;
		}
	},
};
