export interface Asset {
	image_url: string;
	name: string;
	amount: number;
	price_usd: number;
	symbol: string;
}

export interface NFT {
  nft_address: string;
  name: string;
  description: string;
  image_url: string;
  collection_name: string;
}
