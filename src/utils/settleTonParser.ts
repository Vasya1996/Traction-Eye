import { Token } from "@/components/ProtocolList/components";
import { ProtocolTypes } from "@/constants";

type OriginalItem = {
    apy: number;
    balance: number;
    balance_in_usdt: number;
    icon: string;
    name: string;
    price: number;
};

type TransformedItem = {
    indexes: Token[];
    vaults: Token[];
    usd_sum: number;
    type: ProtocolTypes;
    totalApy: number;
};

type OriginalSettleTonResponse = {
    ok: boolean;
    result: {
        indexes: OriginalItem[];
        vaults: OriginalItem[];
    };
};

export type TransformedSettleTonResponse = {
    indexes: TransformedItem[];
    vaults: TransformedItem[];
};

function getTokenName(name: string): string {
    const match = name.match(/SettleTON Index - Middle #(\d+)/);
    if (match) {
        return `STL_MID_${match[1]}`;
    } else if (name === "USDT Vault") {
        return "USDT_VAULT";
    }
    return name;
}

export function transformSettleTonResponse(response: OriginalSettleTonResponse): TransformedSettleTonResponse {
    const transformItem = (item: OriginalItem, isIndexes = false): TransformedItem => ({
        indexes: isIndexes ? [{
            amount: String(item.balance),
            usd_value: String(item.balance_in_usdt),
            token_image_url: item.icon,
            token_name: getTokenName(item.name),
            decimals: "9",
        }] : [],
        vaults: !isIndexes ? [{
            amount: String(item.balance),
            usd_value: String(item.balance_in_usdt),
            token_image_url: item.icon,
            token_name: getTokenName(item.name),
            decimals: "9",
        }] : [],
        totalApy: item.apy,
        usd_sum: item.balance_in_usdt,
        type: isIndexes ? ProtocolTypes.Indexes : ProtocolTypes.Vault
    });

    return {
        indexes: response.result.indexes.map((value) => transformItem(value, true)),
        vaults: response.result.vaults.map((value) => transformItem(value, false)),
    };
}