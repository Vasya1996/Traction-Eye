export * from "./apiTypes";
export * from "./chart";
export * from "./user"

export interface Asset {
	image_url: string;
	name: string;
  address: string,
	amount: number;
  decimals: number;
	price_usd: number;
	symbol: string;
}

export interface NFT {
	nft_address: string;
	name?: string;
	description?: string;
	image_url?: string;
	collection_name?: string;
}

export interface LpTokenInfo {
	token_name: string;
	token_image_url: string;
	amount: string;
	decimals: string;
	usd_value: string;
}

export interface LPPairInfo {
	supplied: LpTokenInfo[];
	rewards: LpTokenInfo[];
	usd_sum: string;
}

export interface LPResponse extends Array<LPPairInfo> {}


export interface ChartResponse {
  worth_chart: Array<[number, number]>;
}

export interface JettonInfo {
    amount: number;
    decimals: number;
    pnl_usd: number;
    pnl_percentage: number;
    average_price: number;
    price: number;
    commisions:number;
}