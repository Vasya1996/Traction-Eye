import { ProtocolTypes } from "@/constants";
import { PoolData } from "@/types/pools";

type OriginalItem = {
    apy: number;
    balance: number;
    balance_in_usdt: number;
    icon: string;
    name: string;
    price: number;
};

type OriginalSettleTonResponse = {
    ok: boolean;
    result: {
        indexes: OriginalItem[];
        vaults: OriginalItem[];
    };
};

export type TransformedSettleTonResponse = {
    indexes: PoolData[];
    vaults: PoolData[];
};

export function transformSettleTonResponse(response: OriginalSettleTonResponse): TransformedSettleTonResponse {
    const transformItem = (item: OriginalItem, isIndexes = false): PoolData => ({
        indexes: isIndexes ? [{
            amount: String(item.balance),
            usd_value: String(item.balance_in_usdt),
            token_image_url: item.icon,
            token_name: item.name,
            decimals: "9",
        }] : [],
        vaults: !isIndexes ? [{
            amount: String(item.balance),
            usd_value: String(item.balance_in_usdt),
            token_image_url: item.icon,
            token_name: item.name,
            decimals: "9",
        }] : [],
        totalApy: item.apy,
        usd_sum: String(item.balance_in_usdt),
        type: isIndexes ? ProtocolTypes.Indexes : ProtocolTypes.Vault,
        supplied: [],
        borrowed: [],
        rewards: [],
    });

    return {
        indexes: response.result.indexes.map((value) => transformItem(value, true)),
        vaults: response.result.vaults.map((value) => transformItem(value, false)),
    };
}