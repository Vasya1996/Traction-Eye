import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import { useTonAddress } from "@tonconnect/ui-react";
import { API } from "@/api/api";
import { useStore } from "@/store/store";
import { getDateAndTime, formatNumber, formatIntNumber } from "@/utils";
import { Skeleton } from "./ui/skeleton";

interface PnlData {
    pnl_percentage: number;
    pnl_usd: number;
}

interface ChartMouseEvent {
    activeTooltipIndex?: number;
    activeLabel?: string | number;
    activeCoordinate?: { x: number; y: number };
}

export function ChartHome() {
    const { netWorth } = useStore();
    const walletAddress = useTonAddress();

    const [selectedPoint, setSelectedPoint] = useState<{ netWorth: number, pnlData: PnlData } | null>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(undefined);

    const { data: mainChartData, isLoading: isLoadingMainChartData } = useQuery({
        queryKey: ["mainChartData"],
        queryFn: () => API.getChart(walletAddress, "native"),
    });

    const { data: pnlData, isLoading: isLoadingPnlData } = useQuery<PnlData>({
        queryKey: ["pnlData"],
        queryFn: () => API.getTotalPnl(walletAddress, 60),
    });

    const isLoading = isLoadingMainChartData || isLoadingPnlData;

    useEffect(() => {
        if (isMouseDown) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isMouseDown]);

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

    const hasMainChartData = mainChartData?.worth_chart !== undefined;
    const hasPnlData = pnlData !== undefined;

    if (!hasMainChartData || !hasPnlData) {
        return null;
    }

    const handleChartMouseMove = (data: ChartMouseEvent) => {
        if (data && data.activeLabel !== undefined) {
            const index = data.activeTooltipIndex;
            if (index !== undefined && mainChartData && mainChartData.worth_chart) {
                const chartData = mainChartData.worth_chart[index];
                const updatedNetWorth = chartData[1];
                const updatedPnlData = pnlData;

                setHighlightedIndex(index);
                if (isMouseDown) {
                    setSelectedPoint({
                        netWorth: updatedNetWorth,
                        pnlData: updatedPnlData,
                    });
                }
            }
        }
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setHighlightedIndex(undefined);
        setSelectedPoint(null);
    };

    const currentNetWorth = selectedPoint ? selectedPoint.netWorth : netWorth;
    const currentPnlData = selectedPoint ? selectedPoint.pnlData : pnlData;

    return (
        <>
            <div className="px-5">
                <p className="text-gray-400 mt-2 font-light">NetWorth</p>
                <div className="flex items-center justify-between">
                    <h2 className="mb-1 text-white font-bold text-2xl">${formatIntNumber(Math.round(netWorth))}</h2>
                    <div className="flex flex-col">
                        <span className="text-green-400 flex justify-end text-base">+{formatNumber(pnlData.pnl_percentage, false)}% (${formatNumber(pnlData.pnl_usd, false)})</span>
                        <span className="text-gray-400 flex justify-end text-xs leading-extra-tight">{getDateAndTime()}</span>
                    </div>
                </div>
            </div>
            <Chart
                worth_chart={mainChartData.worth_chart}
                onMouseMove={handleChartMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                highlightedIndex={highlightedIndex}
            />
        </>
    );
}
