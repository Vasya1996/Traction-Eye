export interface NFT {
    id: string;
    nft_address: string;
    name: string;
    description: string;
    image_url: string;
    collection_name: string;
}

export interface Asset {
    id: string;
    icon: string;
    name: string;
    amount: number;
    price: number;
    usdValue: number;
}

export interface AssetListProps {
    assets: Asset[];
}

export interface ProfileItemProps {
    username: string;
    wallet: string;
    balance: number;
    managed: boolean;
}


