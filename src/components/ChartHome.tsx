import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import { useTonAddress } from "@tonconnect/ui-react";
import { API } from "@/api/api";
import { useStore } from "@/store/store";
import { Skeleton } from "./ui/skeleton";

// Update this interface to match the actual shape of the data returned by your API
interface PnlData {
    pnl_percentage: number;
    pnl_usd: number; // Assuming pnl_usd is a number, update if it's a string
}

export function ChartHome() {
    const { netWorth } = useStore();
    const walletAddress = useTonAddress();

    console.log("rendercharthome")

    // Fetch main chart data
    const { data: mainChartData, isLoading: isLoadingMainChartData } = useQuery({
        queryKey: ["mainChartData"],
        queryFn: () => API.getChart(walletAddress, "native"),
    });

    // Fetch PnL data
    const { data: pnlData, isLoading: isLoadingPnlData } = useQuery<PnlData>({
        queryKey: ["pnlData"],
        queryFn: () => API.getTotalPnl(walletAddress, 60),
    });

    const isLoading = isLoadingMainChartData || isLoadingPnlData;

    if (isLoading) {
        return (
            <div className="pb-4 mb-14">
                <div className="px-4">
                    <Skeleton className="w-20 h-4 bg-gray-700 mb-1 rounded-xl" />
                    <Skeleton className="w-40 h-10 bg-gray-700 rounded-xl" />
                    <Skeleton className="w-32 h-4 bg-gray-700 mt-1 rounded-xl" />
                </div>
            </div>
        );
    }

    // Check if data is present before rendering
    const hasMainChartData = mainChartData?.worth_chart !== undefined;
    const hasPnlData = pnlData !== undefined;

    if (!hasMainChartData || !hasPnlData) {
        return null;
    }

    return (
        <div className="mb-28">
            <div className="px-5 mb-16">
                <p className="text-gray-400 mt-2 font-light">NetWorth</p>
                <div className="flex items-center justify-between">
                    <h2 className="mb-1 text-white font-bold text-2xl">${netWorth.toFixed(2)}</h2>
                    <div className="flex">
                        <div className="text-green-400 text-base">+{pnlData.pnl_percentage}%</div>
                        <div className="text-green-400 ml-2 text-base">(${pnlData.pnl_usd})</div>
                    </div>
                </div>
                
            </div>
            <Chart worth_chart={mainChartData.worth_chart} />
        </div>
    );
}
