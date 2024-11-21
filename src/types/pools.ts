import { Token } from "@/components/ProtocolList/components";
import { ProtocolNames, ProtocolTypes } from "@/constants";

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


export interface LiquidityPool {
  id: string; // Unique identifier for the pool
  poolName: ProtocolNames; // Name of the protocol
  icon: string; // Path to the icon
  poolData: PoolData[]; // Array of data related to the pool
  indexes: PoolData[]; // Specific data for indexes (optional)
  vaults: PoolData[]; // Specific data for vaults (optional)
  sum: number; // Total sum of USD values in the pool
}

export type PoolsData = LiquidityPool[]; // Array of liquidity pools