import { TIMELINES_PERIOD_SECONDS } from "@/constants";

export interface getTokenPnlByAddressPayload {
    wallet_address: string;
    token_address: string;
    interval: keyof typeof TIMELINES_PERIOD_SECONDS
}

export interface getPnlByAddressPayload {
    wallet_address: string;
    interval: keyof typeof TIMELINES_PERIOD_SECONDS;
}