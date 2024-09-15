import { useState, useEffect, useLayoutEffect, MutableRefObject } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import { useTonAddress } from "@tonconnect/ui-react";
import { API } from "@/api/api";
import { useStore } from "@/store/store";
import { useElementIntersection } from "@/hooks";
import { Skeleton } from "./ui/skeleton";
import { formatIntNumber, formatNumber, getDateAndTime, downgradeFontSize } from "@/utils";

interface ChartHomeProps {
    timeline: string;
}

interface PnlData {
    pnl_percentage: number;
    pnl_usd: number;
}

interface ChartMouseEvent {
    activeTooltipIndex?: number;
    activeLabel?: string | number;
    activeCoordinate?: { x: number; y: number };
}

export function ChartHome({timeline}: ChartHomeProps) {
    const { netWorth } = useStore();
    const walletAddress = useTonAddress();
    const { fontSizeCounter, element1Ref, element2Ref, checkIntersection } = useElementIntersection();

    console.log('--timeline',timeline);
    const [selectedPoint, setSelectedPoint] = useState<{ netWorth: number, pnlData: PnlData, timestamp: number } | null>(null);
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
    const currentNetWorth = selectedPoint ? selectedPoint.netWorth : netWorth;
    const currentPnlData = selectedPoint ? selectedPoint.pnlData : pnlData;
    const currentTimestamp = selectedPoint ? selectedPoint.timestamp : null;

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

    useLayoutEffect(() => {
        checkIntersection();
    },[currentNetWorth, currentPnlData, currentTimestamp]);

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
                const pointTimestamp = chartData[0];
                const updatedNetWorth = chartData[1];
                const updatedPnlData = {
                    pnl_percentage: 20,
                    pnl_usd: 1000
                };

                setHighlightedIndex(index);

                setSelectedPoint({
                    netWorth: updatedNetWorth,
                    pnlData: updatedPnlData,
                    timestamp: pointTimestamp,
                });
            }
        }
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    return (
        <>
            <div className="px-5">
                <p className="text-gray-400 mt-2 font-light">NetWorth</p>
                <div className="flex items-center justify-between">
                    <h2 ref={element1Ref as MutableRefObject<HTMLHeadingElement | null>} className={`${downgradeFontSize("text-2xl", fontSizeCounter)} mb-1 text-white font-bold whitespace-nowrap`}>${formatIntNumber(Math.round(currentNetWorth))}</h2>
                    <div ref={element2Ref as MutableRefObject<HTMLDivElement | null>} className="flex flex-col">
                        {currentPnlData && <span className={`${downgradeFontSize("text-base",fontSizeCounter)} text-green-400 flex justify-end whitespace-nowrap`}>+{formatNumber(currentPnlData.pnl_percentage, false)}% (${formatNumber(currentPnlData.pnl_usd, false)})</span>}
                        <span className={`${downgradeFontSize("text-xs",fontSizeCounter)} text-gray-400 flex justify-end leading-extra-tight whitespace-nowrap`}>{getDateAndTime(currentTimestamp)}</span>
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
