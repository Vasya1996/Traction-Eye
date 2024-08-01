import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import { useTonAddress } from "@tonconnect/ui-react";
import { API } from "@/api/api";

export function ChartHome() {
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
		<div className="py-6">
			{mainChartData?.worth_chart && pnlData ? (
				<>
					<div className="text-green-400">PNL: {pnlData.pnl_usd} USD</div>
					<div className="text-green-400">+{pnlData.pnl_percentage}</div>
					<Chart worth_chart={mainChartData?.worth_chart} />
				</>
			) : null}
		</div>
	);
}
