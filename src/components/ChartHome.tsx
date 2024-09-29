import { useState, useLayoutEffect, MutableRefObject, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart, { SelectedPoint } from "./Chart";
import { useTonAddress } from "@tonconnect/ui-react";
import { useElementIntersection } from "@/hooks";
import { Skeleton } from "./ui/skeleton";
import { formatIntNumber, formatNumber, getDateAndTime, downgradeFontSize, getTimelinePeriodAndIntervalKey, updateChartPnlData } from "@/utils";
import { TIMELINES_INTERVALS_SECONDS, CACHE_OPTIONS } from "@/constants";
import { PNL_API } from "@/api/pnl";
import { ChartData } from "@/types";
import { TON_CENTER_API } from "@/api/tonCenter";

interface ChartHomeProps {
    timeline: keyof typeof TIMELINES_INTERVALS_SECONDS;
}

export function ChartHome({timeline}: ChartHomeProps) {
    const walletAddress = useTonAddress();
    const { fontSizeCounter, element1Ref, element2Ref, checkIntersection } = useElementIntersection();
    const { data: userWalletCreationDate } = useQuery({
        queryKey: ["userWalletCreationDate", walletAddress], // Ensure the same queryKey is used in all components
        queryFn: () => TON_CENTER_API.getUserWalletCreationDate(walletAddress!),
        enabled: !!walletAddress,
        staleTime: Infinity
    });

    const timelineData = useMemo(() => getTimelinePeriodAndIntervalKey(Number(userWalletCreationDate), timeline), [userWalletCreationDate, timeline]);

    const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);

    const { data: mainChartData, isLoading: isLoadingMainChartData, refetch: refetchMainChartData } = useQuery<ChartData[]>({
        queryKey: ["mainChartData", timelineData?.period, timelineData?.interval],
        queryFn: () => PNL_API.getPnlByAddress({wallet_address: walletAddress, interval: timelineData!.interval, period: timelineData!.period }),
        enabled: !!walletAddress && !!timelineData?.period && !!timelineData?.interval,
        refetchOnWindowFocus: false,
        ...CACHE_OPTIONS
    });

    const updatedChartData = useMemo(() => {
        if(!mainChartData) {
            return [];
        }
        
        return updateChartPnlData(mainChartData);
    },[mainChartData])

    const lastChartData = useMemo(() => updatedChartData?.[updatedChartData?.length - 1], [updatedChartData]);

    useEffect(() => {
        if (timelineData?.interval && timelineData?.period && walletAddress) {
            refetchMainChartData();
            setSelectedPoint(null);
        }
    }, [timelineData?.interval, timelineData?.period, walletAddress]);

    const currentNetWorth = selectedPoint ? selectedPoint.netWorth : lastChartData?.net_worth;
    const currentPnlData = selectedPoint ? selectedPoint.pnlData : {
        pnl_percentage: lastChartData?.pnl_percentage,
        pnl_usd: lastChartData?.pnl_usd
    };
    const currentTimestamp = selectedPoint ? selectedPoint.timestamp : lastChartData?.timestamp;

    useLayoutEffect(() => {
        checkIntersection();
    },[currentNetWorth, currentPnlData, currentTimestamp]);

    if (isLoadingMainChartData) {
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

    const hasMainChartData = updatedChartData && updatedChartData?.length > 0;

    const handleSelectPoint = (data: SelectedPoint) => {
        setSelectedPoint(data)
      }

    if (!hasMainChartData) {
        return null;
    }

    return (
        <>
            <div className="px-5">
                <p className="text-gray-400 mt-2 font-light">NetWorth</p>
                <div className="flex items-center justify-between">
                    <h2 ref={element1Ref as MutableRefObject<HTMLHeadingElement | null>} className={`${downgradeFontSize("text-2xl", fontSizeCounter)} mb-1 text-white font-bold whitespace-nowrap`}>${formatIntNumber(Math.round(currentNetWorth ?? 0))}</h2>
                    <div ref={element2Ref as MutableRefObject<HTMLDivElement | null>} className="flex flex-col">
                        {currentPnlData && <span className={`${downgradeFontSize("text-base",fontSizeCounter)} ${(Number(currentPnlData?.pnl_percentage) >= 0 || !currentPnlData.pnl_percentage) ? "text-green-600" : "text-red-600"} flex justify-end whitespace-nowrap`}>{Number(currentPnlData?.pnl_percentage) > 0 ? "+" : ""}{formatNumber(currentPnlData.pnl_percentage, false)}% (${formatNumber(currentPnlData.pnl_usd, false)})</span>}
                        {currentTimestamp && <span className={`${downgradeFontSize("text-xs",fontSizeCounter)} text-gray-400 flex justify-end leading-extra-tight whitespace-nowrap`}>{getDateAndTime(currentTimestamp)}</span>}
                    </div>
                </div>
            </div>
            <Chart
                worth_chart={updatedChartData}
                onSelectPoint={handleSelectPoint}
            />
        </>
    );
}
