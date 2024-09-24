export interface getTokenPnlByAddressPayload {
    wallet_address: string;
    token_address: string;
    interval: number;
    period: number;
}

export interface getPnlByAddressPayload {
    wallet_address: string;
    interval: number;
    period: number;
}