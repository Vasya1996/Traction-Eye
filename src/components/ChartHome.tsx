import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import { useTonAddress } from "@tonconnect/ui-react";
import { API } from "@/api/api";

export function ChartHome() {
	const walletAddress =
		useTonAddress() || "UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO";

	const { data: mainChartData } = useQuery({
		queryKey: ["mainChartData"],
		queryFn: () => API.getChart(walletAddress, "native"),
	});

	return (
		<>
			{mainChartData?.worth_chart ? (
				<Chart worth_chart={mainChartData?.worth_chart} />
			) : null}
		</>
	);
}
