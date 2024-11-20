import { stormTonClient } from "./apiClient";
import { stormTonEndpoints } from "./endpoints";

export type PositionData = {
	decimals: number;
	direction: "SHORT" | "LONG";
	elp: number;
	entry_price: number;
	fraction: string;
	idx: string;
	leverage: number;
  icon: string[];
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

export type VaultData = {
	APR: number;
	address: string;
	average_rate: number;
	balance: number;
  icon: string;
	decimals: number;
	entry_usd: number;
	lp_balance: number;
	lp_balance_count: number;
	lp_jetton_master: string;
	name: string;
	price: number;
	rate: number;
	rewards_token: number;
	rewards_usd: number;
	total_usd: number;
};

type PoolVaultResponse = {
	data: VaultData[];
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
	getStormVaults: async (rawAdress?: string): Promise<PoolVaultResponse> => {
		try {
			const response = await stormTonClient.post(
				`${stormTonEndpoints.vaults}`,
				{ wallet: rawAdress }
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching storm vaults:", error);
			throw error;
		}
	},
};
