import { formatNumber, getAPYLabel } from "@/utils";
import { TokenList } from "./TokenList";
import { PoolHeader } from "./PoolHeader";
import { ProtocolNames } from "@/constants";
import { FC, ReactElement } from "react";

interface LiquidityPoolCardProps {
  poolName: ProtocolNames;
  poolData: Array<PoolData>;
  icon: string | ReactElement;
  hasIcon?: boolean;
}

export const StormPoolCard: FC<LiquidityPoolCardProps> = ({ poolName, poolData, icon, hasIcon = true }) => {
  if (!poolData?.length) {
    return null;
  }

  return (
    <>
      {
        poolData?.map((pool, index) => (
          <div key={index}>
            <div className="flex justify-between items-center my-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center min-h-8">
                  {(index === 0 && hasIcon) && (
                    <PoolHeader icon={icon} poolName={poolName} />
                  )}
                </div>
                {pool.totalApy && <p className="text-gray-400 font-medium text-lg">{getAPYLabel(pool.type)} {pool.totalApy}%</p>}
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-md">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <p className="text-blue-500 bg-blue-100 rounded-full px-4 py-1 h-8">
                    {pool.type}
                  </p>
                  <p className="text-xl font-bold mt-2">
                    ${formatNumber(parseFloat(pool.usd_sum), false)}
                  </p>
                </div>
                <TokenList title="Supplied" tokens={pool.supplied} />
                <TokenList title="Borrowed" tokens={pool.borrowed} />
                <TokenList title="Rewarded" tokens={pool.rewards} />
                <TokenList title="Supplied" tokens={pool.vaults} />
                <TokenList title="Supplied" tokens={pool.indexes} />
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};
