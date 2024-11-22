import { FC, useState, useEffect, useMemo } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Chart, { SelectedPoint } from "@/components/Chart";
import { useQuery } from "@tanstack/react-query";
// import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { AssetItemProps } from "@/components/AssetItem";
import { MdOutlineInfo, SwapToken } from "@/components/icons";
import { postEvent } from "@telegram-apps/sdk";
import { Skeleton } from "@/components/ui/skeleton";
import {
	formatNumber,
	getTimelinePeriodAndIntervalKey,
	updateAssetChartPnlData,
} from "@/utils";
import { AssetInfo } from "./components";
import {
	TimelineKeys,
	TIMELINES_INTERVALS_SECONDS,
	CACHE_OPTIONS,
} from "@/constants";
import { TimelineToolbar } from "@/components/TImelineToolbar";
import { PNL_API } from "@/api/pnl";
import { ChartData } from "@/types";
import { TON_CENTER_API } from "@/api/tonCenter";
// import { API } from "@/api/api";

// const TEST_WALLETS = ["UQAINHiKgQMi0BQ-Y4C5AMFiZm_2dgvf-KPxdWJImKWArNwM", "UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO", "UQAiuSciIC6VfkKODF9xsrogE44Okn13XGvdzXq1uCoOH40Z"];

const AssetItemPage: FC = () => {
	const [tooltip, setTooltip] = useState<null | string>(null);
	const params = useParams<{ id: string }>();
	const walletAddress = useTonAddress();
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state as AssetItemProps;
	// State for selected timeline
	const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(
		null
	);
	const [selectedTimeline, setSelectedTimeline] = useState<
		keyof typeof TIMELINES_INTERVALS_SECONDS
	>(TimelineKeys.Month);
	const handleTimelineSelect = (
		timeline: keyof typeof TIMELINES_INTERVALS_SECONDS
	) => {
		setSelectedTimeline(timeline);
	};

	const targetAddress = state.friendWalletAddress || walletAddress;

	const { data: userWalletCreationDate } = useQuery({
		queryKey: ["userWalletCreationDate", targetAddress], // Ensure the same queryKey is used in all components
		queryFn: () => TON_CENTER_API.getUserWalletCreationDate(targetAddress!),
		enabled: !!targetAddress,
		staleTime: Infinity,
	});

	const timelineData = useMemo(
		() =>
			getTimelinePeriodAndIntervalKey(
				Number(userWalletCreationDate),
				selectedTimeline
			),
		[userWalletCreationDate, selectedTimeline]
	);

	// Scroll to the top of the page when the component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { data: assetChartData, refetch: refetchAssetChartData } = useQuery<
		ChartData[]
	>({
		queryKey: [
			"assetChartData",
			timelineData?.period,
			timelineData?.interval,
			params.id,
		],
		queryFn: () =>
			PNL_API.getTokenPnlByAddress({
				wallet_address: targetAddress,
				token_address: params.id as string,
				interval: timelineData!.interval,
				period: timelineData!.period,
			}),
		enabled:
			!!targetAddress &&
			!!timelineData?.period &&
			!!timelineData?.interval &&
			!!params.id,
		refetchOnWindowFocus: false,
		...CACHE_OPTIONS,
	});

	const updatedChartData = useMemo(() => {
		if (!assetChartData) {
			return [];
		}

		return updateAssetChartPnlData(assetChartData);
	}, [assetChartData]);

	useEffect(() => {
		if (timelineData?.interval && timelineData?.period && targetAddress) {
			refetchAssetChartData();
			setSelectedPoint(null);
		}
	}, [timelineData?.interval, timelineData?.period, targetAddress, params.id]);

	const toggleTooltip = (key: string) => {
		postEvent("web_app_trigger_haptic_feedback", {
			type: "impact",
			impact_style: "light",
		});

		setTooltip(key);
		setTimeout(() => {
			setTooltip(null);
		}, 3000);
	};

	const handleSelectPoint = (data: SelectedPoint) => {
		setSelectedPoint(data);
	};
	const lastChartData = useMemo(
		() => updatedChartData?.[updatedChartData?.length - 1],
		[updatedChartData]
	);

	const currentPnlData = selectedPoint
		? selectedPoint.pnlData
		: {
				pnl_percentage: lastChartData?.pnl_percentage,
				pnl_usd: lastChartData?.pnl_usd,
		};
	const currentTimestamp = selectedPoint
		? selectedPoint.timestamp
		: lastChartData?.timestamp;

	const [showConnectBtn, setShowConnectBtn] = useState(false);
	const userFriendlyAddress = useTonAddress();

	useEffect(() => {
		console.log("showConnectBtn", showConnectBtn);
		console.log("location?.pathname", location.pathname);
		console.log(
			"show on index",
			(location?.pathname !== "/connect" && location?.pathname === "/friend") ||
				showConnectBtn
		);
		if (!userFriendlyAddress.length) {
			setShowConnectBtn(true);
			return;
		}
		setShowConnectBtn(false);
	}, [location?.pathname]);

	return (
		<div className={`h-screen bg-gray-800`}>
			<div className="flex flex-col h-72">
				<AssetInfo
					icon={state.icon}
					name={state.name}
					amount={selectedPoint?.balance ?? lastChartData?.balance}
					price={selectedPoint?.totalPrice ?? lastChartData?.total_price}
					pnl_usd={currentPnlData?.pnl_usd}
					pnl_percentage={currentPnlData?.pnl_percentage}
					timestamp={currentTimestamp}
				/>
				<div className="max-w-full mt-auto">
					{updatedChartData ? (
						<Chart
							onSelectPoint={handleSelectPoint}
							worth_chart={updatedChartData}
						/>
					) : null}
					<TimelineToolbar onTimelineSelect={handleTimelineSelect} />
				</div>
			</div>

			<div className="h-full bg-gray-50 rounded-t-3xl relative">
				<ul className="gap-3 p-7 text-base">
					<li className="flex justify-between mb-5">
						<div className="text-black font-semibold">Price</div>
						<div className="font-semibold flex items-center text-gray-500">
							{formatNumber(state.price, false) ?? (
								<Skeleton className="w-12 ml-1 h-4 bg-gray-200" />
							)}
							$
						</div>
					</li>
					<li className="flex justify-between mb-5 relative">
						<div className="text-black font-semibold flex items-center">
							Average price{" "}
							<MdOutlineInfo
								className="ml-1 text-gray-500 cursor-pointer"
								onClick={() => toggleTooltip("averagePrice")}
							/>
							{tooltip === "averagePrice" && (
								<div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
									The average price is the mean price of the asset over a
									certain period.
								</div>
							)}
						</div>
						{/* <div className="font-semibold flex items-center text-gray-500">{jettonData?.average_price ? formatNumber(jettonData?.average_price, false) : <Skeleton className="w-12 ml-1 h-4 bg-gray-200" />}$</div> */}
						<div className="font-semibold flex items-center text-gray-500">
							{"\u2014"} $
						</div>
					</li>
					<li className="flex justify-between mb-5 relative">
						<div className="text-black font-semibold flex items-center">
							Commissions{" "}
							<MdOutlineInfo
								className="ml-1 text-gray-500 cursor-pointer"
								onClick={() => toggleTooltip("commissions")}
							/>
							{tooltip === "commissions" && (
								<div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
									Commissions are fees charged for transactions.
								</div>
							)}
						</div>
						{/* <div className="font-semibold flex items-center text-gray-500">{jettonData?.commisions ? formatNumber(jettonData?.commisions, false) : <Skeleton className="w-12 ml-1 h-4 bg-gray-200" />}$</div> */}
						<div className="font-semibold flex items-center text-gray-500">
							{"\u2014"} $
						</div>
					</li>
					<li className="flex justify-between mb-5 relative">
						<div className="text-black font-semibold flex items-center">
							Market Cap{" "}
							<MdOutlineInfo
								className="ml-1 text-gray-500 cursor-pointer"
								onClick={() => toggleTooltip("marketCap")}
							/>
							{tooltip === "marketCap" && (
								<div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
									Market Cap is the total market value of a company`s
									outstanding shares.
								</div>
							)}
						</div>
						<div className="font-semibold text-gray-500">{"\u2014"} $</div>
					</li>
					{!showConnectBtn && (
						<button
							onClick={() => navigate("/swap")}
							className="flex bg-yellow-400 p-2 h-[51px] items-center justify-center rounded-xl w-full"
						>
							<SwapToken />
							<span className="ml-3">Swap token</span>
						</button>
					)}
				</ul>
				<span className="w-full border-b"></span>
			</div>
		</div>
	);
};

export default AssetItemPage;
