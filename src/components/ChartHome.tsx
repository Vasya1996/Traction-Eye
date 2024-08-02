import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import { useTonAddress } from "@tonconnect/ui-react";
import { API } from "@/api/api";
import { useStore } from "@/store/store";

export function ChartHome() {
	const { netWorth } = useStore();
	const walletAddress = useTonAddress();

	const { data: mainChartData } = useQuery({
		queryKey: ["mainChartData"],
		queryFn: () => API.getChart(walletAddress, "native"),
	});

	const { data: pnlData } = useQuery({
		queryKey: ["pnlData"],
		queryFn: () => API.getTotalPnl(walletAddress, 60),
	});

	return (
		<div className="pb-4">
			{mainChartData?.worth_chart && pnlData ? (
				<div>
					<div className="px-4">
						<p className="text-gray-400 font-light">NetWorth</p>
						<h2 className="mb-1 text-white font-bold text-3xl">${netWorth.toFixed(2)}</h2>

						<div className="flex">
							<div className="text-green-400">+{pnlData.pnl_percentage}%</div>
							<div className="text-green-400 ml-2">(${pnlData.pnl_usd})</div>
						</div>
					</div>

					<Chart worth_chart={mainChartData?.worth_chart} />
				</div>
			) : null}
		</div>
	);
}
