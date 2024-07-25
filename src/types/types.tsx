export interface Asset {
    id: string;
    icon: string;
    name: string;
    amount: number;
    price: number;
    symbol: string;
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


