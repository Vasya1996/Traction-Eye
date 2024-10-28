import { Token } from "@/components/ProtocolList/components";
import { ProtocolTypes } from "@/constants";

export interface PoolData {
    supplied: Token[];
    borrowed: Token[];
    rewards: Token[];
    indexes: Token[];
    vaults: Token[];
    type: ProtocolTypes;
    usd_sum: string;
    totalApy?: number;
    healthRate?: number;
  }