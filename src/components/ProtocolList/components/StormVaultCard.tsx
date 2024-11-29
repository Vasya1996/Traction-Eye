import { formatNumber } from "@/utils";
import { ProtocolNames } from "@/constants";
import { FC, ReactElement } from "react";
import { VaultData } from "@/api/stormApi";
import { PoolHeader } from "./PoolHeader";

interface LiquidityPoolCardProps {
	poolName: ProtocolNames;
	poolData: Array<VaultData> | [];
	icon: string | ReactElement;
	hasIcon?: boolean;
}

export const StormVaultCard: FC<LiquidityPoolCardProps> = ({ poolData, hasIcon, icon, poolName }) => {
	if (!poolData?.length) {
		return null;
	}

	return (
		<>
			{poolData?.map((pool, index) => (
				<>
					{pool.APR && (
						<div key={index}>
							<div className="flex justify-between items-center my-2">
								<div className="flex w-full items-center justify-between">
									<div className="flex items-center min-h-8">
										{index === 0 && hasIcon && (
											<PoolHeader icon={icon} poolName={poolName} />
										)}
									</div>
									<p className="text-gray-400 font-medium text-lg text-right">
										APR: {pool.APR.toFixed(2)}%
									</p>

								</div>
							</div>
						</div>
					)}
					<div className="p-4 bg-white rounded-2xl shadow-md" key={index}>
						<div className="mb-2">
							<div className="flex justify-between items-center">
								<p className="text-blue-500 bg-blue-100 rounded-full px-4 py-1 h-8">
									Vault
								</p>
								<p className="text-xl font-bold mt-2">
									${formatNumber(pool.total_usd, false)}
								</p>
							</div>
							<div>
								{/* <div className="grid grid-cols-3 text-gray-500 text-sm">
								 */}
								<div className="flex w-full justify-between text-sm flex-col">
									<div className="grid grid-cols-3 w-full">
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Supplied
											</p>
											<div className="flex items-center">
												<img src={pool.icon} className="w-6 h-6" alt="" />
												<p className="py-2 px-1 text-xs text-black uppercase tracking-wider whitespace-nowrap">
													{pool.name}
												</p>
											</div>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Amount
											</p>
											<p className="py-2 px-1 text-xs text-black uppercase tracking-wider whitespace-nowrap">
												{formatNumber(pool.lp_balance, true)}
											</p>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap text-right">
												USD Value
											</p>
											<p className="py-2 px-1 text-right text-xs text-black uppercase tracking-wider whitespace-nowrap">
												{formatNumber(pool.entry_usd, false)}
											</p>
										</div>
									</div>
									<div className="grid grid-cols-3 w-full">
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Rewarded
											</p>
											<div className="flex items-center">
												<img src={pool.icon} className="w-6 h-6" alt="" />
												<p className="py-2 px-1 text-xs text-black uppercase tracking-wider whitespace-nowrap">
													{pool.name}
												</p>
											</div>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Amount
											</p>
											<p className="py-2 px-1 text-xs text-black uppercase tracking-wider whitespace-nowrap">
												{formatNumber(pool.rewards_token, true)}
											</p>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap text-right">
												USD Value
											</p>
											<p className="py-2 px-1 text-right text-xs text-black uppercase tracking-wider whitespace-nowrap">
												{formatNumber(pool.rewards_usd, false)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			))}
		</>
	);
};
