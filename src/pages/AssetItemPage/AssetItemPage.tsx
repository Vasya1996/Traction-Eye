import { FC, useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import Chart, { SelectedPoint } from "@/components/Chart";
import { useQuery } from "@tanstack/react-query";
// import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { AssetItemProps } from "@/components/AssetItem";
import { MdOutlineInfo } from "react-icons/md";
import { postEvent } from '@telegram-apps/sdk';
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, getTimelinePeriodAndIntervalKey, parseQueryString } from "@/utils";
import { AssetInfo } from "./components";
import { TimelineKeys, TIMELINES_INTERVALS_SECONDS } from "@/constants";
import { TimelineToolbar } from "@/components/TImelineToolbar";
import { PNL_API } from "@/api/pnl";
import { ChartData } from "@/types";

const AssetItemPage: FC = () => {
  const [tooltip, setTooltip] = useState<null | string>(null);
  const params = useParams<{ id: string }>();
  const walletAddress = useTonAddress();
  const location = useLocation();
  const state = location.state as AssetItemProps;
// State for selected timeline
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<keyof typeof TIMELINES_INTERVALS_SECONDS>(TimelineKeys.MAX);
  const handleTimelineSelect = (timeline: keyof typeof TIMELINES_INTERVALS_SECONDS) => {
    setSelectedTimeline(timeline);
  };

  const { initDataRaw } = retrieveLaunchParams();

  const initData = useMemo(() => parseQueryString(initDataRaw),[initDataRaw]);

  const timelineKey = useMemo(() => getTimelinePeriodAndIntervalKey((initData as {auth_date: number}).auth_date, selectedTimeline), [initData, selectedTimeline]);

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: assetChartData, refetch: refetchAssetChartData } = useQuery<ChartData[]>({
    queryKey: ["assetChartData"],
    queryFn: () => PNL_API.getTokenPnlByAddress({wallet_address: walletAddress, token_address: params.id as string, interval: timelineKey}),
    enabled: !!walletAddress && !!timelineKey && !!params.id,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
      if (timelineKey && walletAddress && params.id) {
        refetchAssetChartData();
      }
  }, [timelineKey, walletAddress, params.id]);

  // const { data: jettonData } = useQuery({
  //   queryKey: ['jettonData', params.id],
  //   queryFn: () => API.getJettonInfo(walletAddress, params.id!),
  // });

  const toggleTooltip = (key: string) => {
    postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'light' });

    setTooltip(key);
    setTimeout(() => {
      setTooltip(null);
    }, 3000);
  };

  const handleSelectPoint = (data: SelectedPoint) => {
    setSelectedPoint(data)
  }

  const currentPnlData = selectedPoint ? selectedPoint.pnlData : null;
  const currentTimestamp = selectedPoint ? selectedPoint.timestamp : null;

  return (
    <div className={`h-screen bg-gray-800`}>
      <div className="flex flex-col h-72">
        <AssetInfo icon={state.icon} name={state.name} amount={selectedPoint?.netWorth} price={selectedPoint?.totalPrice} pnl_usd={currentPnlData?.pnl_usd} pnl_percentage={currentPnlData?.pnl_percentage} timestamp={currentTimestamp} />
        <div className="max-w-full mt-auto">
          {assetChartData ? (
              <>
                <Chart onSelectPoint={handleSelectPoint} worth_chart={assetChartData} />
                <TimelineToolbar onTimelineSelect={handleTimelineSelect} />
              </>
            )
              : null
          }
        </div>
      </div>

      <div className="h-full bg-gray-50 rounded-t-3xl relative">
        <ul className="gap-3 p-7 text-base">
          <li className="flex justify-between mb-5">
            <div className="text-black font-semibold">Price</div>
            <div className="font-semibold flex items-center text-gray-500">{formatNumber(state.price, false) ?? <Skeleton className="w-12 ml-1 h-4 bg-gray-200" />}$</div>
          </li>
          <li className="flex justify-between mb-5 relative">
            <div className="text-black font-semibold flex items-center">
              Average price <MdOutlineInfo className="ml-1 text-gray-500 cursor-pointer" onClick={() => toggleTooltip('averagePrice')} />
              {tooltip === 'averagePrice' && (
                <div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
                  The average price is the mean price of the asset over a certain period.
                </div>
              )}
            </div>
            {/* <div className="font-semibold flex items-center text-gray-500">{jettonData?.average_price ? formatNumber(jettonData?.average_price, false) : <Skeleton className="w-12 ml-1 h-4 bg-gray-200" />}$</div> */}
            <div className="font-semibold flex items-center text-gray-500">{"\u2014"} $</div>
          </li>
          <li className="flex justify-between mb-5 relative">
            <div className="text-black font-semibold flex items-center">
              Commissions <MdOutlineInfo className="ml-1 text-gray-500 cursor-pointer" onClick={() => toggleTooltip('commissions')} />
              {tooltip === 'commissions' && (
                <div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
                  Commissions are fees charged for transactions.
                </div>
              )}
            </div>
            {/* <div className="font-semibold flex items-center text-gray-500">{jettonData?.commisions ? formatNumber(jettonData?.commisions, false) : <Skeleton className="w-12 ml-1 h-4 bg-gray-200" />}$</div> */}
            <div className="font-semibold flex items-center text-gray-500">{"\u2014"} $</div>
          </li>
          <li className="flex justify-between mb-5 relative">
            <div className="text-black font-semibold flex items-center">
              Market Cap <MdOutlineInfo className="ml-1 text-gray-500 cursor-pointer" onClick={() => toggleTooltip('marketCap')} />
              {tooltip === 'marketCap' && (
                <div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
                  Market Cap is the total market value of a company`s outstanding shares.
                </div>
              )}
            </div>
            <div className="font-semibold text-gray-500">$18,2B</div>
          </li>
        </ul>
        <span className="w-full border-b"></span>
      </div>
    </div>
  );
};

export default AssetItemPage;
