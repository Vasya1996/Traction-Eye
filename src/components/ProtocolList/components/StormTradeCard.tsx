import { formatNumber } from "@/utils";
import { PoolHeader } from "./PoolHeader";
import { ProtocolNames } from "@/constants";
import { FC, ReactElement } from "react";
import { PositionData } from "@/api/stormApi";
import { MoveDownRight, MoveUpRight } from "lucide-react";

interface LiquidityPoolCardProps {
	poolName: ProtocolNames;
	poolData: Array<PositionData> | [];
	icon: string | ReactElement;
	hasIcon?: boolean;
}

export const StormPoolCard: FC<LiquidityPoolCardProps> = ({
	poolName,
	poolData,
	icon,
	hasIcon = true,
}) => {
	if (!poolData?.length) {
		return null;
	}

	console.log("pool data", poolData);

	return (
		<>
			{poolData?.map((pool, index) => (
				<div key={index}>
					<div className="flex justify-between items-center my-2">
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center min-h-8">
								{index === 0 && hasIcon && (
									<PoolHeader icon={icon} poolName={poolName} />
								)}
							</div>
						</div>
					</div>
					<div className="p-4 bg-white rounded-2xl shadow-md">
						<div className="mb-2">
							<div className="flex justify-between items-center">
									<p className="text-blue-500 bg-blue-100 rounded-full px-2 py-1 h-8 flex items-center gap-x-2">
                  {pool.direction === "LONG" ? <MoveUpRight className="text-green-400 h-5 w-5" /> : <MoveDownRight className="text-red-400 h-5 w-5"/>}<span>{pool.direction} </span>
									</p>
								<p className="text-xl font-bold mt-2">
									${formatNumber(pool.total_balance_usd, false)}
								</p>
							</div>
							<div>
								<div className="flex justify-between items-center">
									<div className="flex items-center">
										<div className="flex">
											<img src={pool.icon[0]} className="w-6 h-6" />
											<img src={pool.icon[1]} className="-ml-2 w-6 h-6" />
										</div>
										<p className="ml-1 opacity-80 py-4">{pool.name}</p>
									</div>
									<p
										className={`${
											Number(pool.pnl) >= 0 || !pool.pnl
												? "text-green-600"
												: "text-red-600"
										} py-2 px-1 text-right text-xs font-medium flex justify-end whitespace-nowrap tracking-wider`}
									>
										{Number(pool.pnl) > 0 ? "+" : ""}
										{formatNumber(pool.pnl, false)}% ($
										{formatNumber(pool.pnl, false)})
									</p>
								</div>
								<div className="flex w-full justify-between text-sm">
									<div className="flex flex-col">
										<p className="py-2 text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
											Asset/Amount
										</p>
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<img src={pool.icon[0]} className="w-6 h-6" alt="" />
											</div>
											<div className="flex flex-col justify-center ml-2">
												<p className="text-xs text-black uppercase tracking-wider whitespace-nowrap">
													{formatNumber(pool.total_balance_token, true)}
												</p>
												<p className="text-xs text-black/50 uppercase tracking-wider whitespace-nowrap">
													{pool.name.split("/")[0] || pool.name}
												</p>
											</div>
										</div>
									</div>
									<div className="flex flex-col">
										<p className="py-2 text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
											Entry Price
										</p>
										<p className="py-2 px-1 text-xs text-right text-black uppercase tracking-wider whitespace-nowrap">
											{formatNumber(pool.entry_price, true)}
										</p>
									</div>
									<div className="flex flex-col">
										<p className="py-2 text-xs font-medium uppercase text-gray-400 tracking-wider text-right whitespace-nowrap">
											Est.Liq.Price
										</p>
										<p className="py-2 px-1 text-right text-xs text-black uppercase tracking-wider whitespace-nowrap">
											{formatNumber(pool.elp, true)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
