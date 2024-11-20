import { formatNumber } from "@/utils";
import { ProtocolNames } from "@/constants";
import { FC, ReactElement } from "react";
import { VaultData } from "@/api/stormApi";

interface LiquidityPoolCardProps {
	poolName: ProtocolNames;
	poolData: Array<VaultData> | [];
	icon: string | ReactElement;
	hasIcon?: boolean;
}

export const StormVaultCard: FC<LiquidityPoolCardProps> = ({ poolData }) => {
	if (!poolData?.length) {
		return null;
	}

	console.log("pool data", poolData);

	return (
		<>
			{poolData?.map((pool, index) => (
				<>
					{pool.APR && (
						<p className="text-gray-400 font-medium text-lg text-right">
							APR: {pool.APR.toFixed(2)}%
						</p>
					)}
					<div className="p-4 bg-white rounded-2xl shadow-md" key={index}>
						<div className="mb-2">
							<div className="flex justify-between items-center">
								<p className="text-blue-500 bg-blue-100 rounded-full px-4 py-1 h-8">
									Vault
								</p>
								<p className="text-xl font-bold mt-2">
									${formatNumber(pool.lp_balance, false)}
								</p>
							</div>
							<div>
								{/* <div className="grid grid-cols-3 text-gray-500 text-sm">
								 */}
								<div className="flex w-full justify-between text-sm flex-col">
									<div className="flex w-full justify-between">
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Supplied
											</p>
											<p className="py-2 px-1 text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
												{pool.name}
											</p>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Amount
											</p>
											<p className="py-2 px-1 text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
												{pool.lp_balance}
											</p>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												USD Value
											</p>
											<p className="py-2 px-1 text-right text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
												${formatNumber(pool.price, false)}
											</p>
										</div>
									</div>
									<div className="flex w-full justify-between">
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Rewarded
											</p>
											<p className="py-2 px-1 text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
												{pool.name}
											</p>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												Amount
											</p>
											<p className="py-2 px-1 text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
												{pool.rewards_token}
											</p>
										</div>
										<div className="flex flex-col">
											<p className="py-2 px-1 text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
												USD Value
											</p>
											<p className="py-2 px-1 text-right text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
												${formatNumber(pool.rewards_usd, false)}
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
