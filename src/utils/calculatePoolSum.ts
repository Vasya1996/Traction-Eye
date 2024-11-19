import { PoolData } from "@/types/pools";

export const calculatePoolSum = (array: PoolData[]): number => {
    return array.reduce((acc, obj) => acc + (Number(obj.usd_sum) || 0), 0);
};