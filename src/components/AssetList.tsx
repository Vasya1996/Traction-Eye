import AssetItem from "./AssetItem";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { TbCircleDotted, IoIosArrowDown } from "@/components/icons";
import { useTonAddress } from "@tonconnect/ui-react";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { postEvent } from '@telegram-apps/sdk';
import { CACHE_OPTIONS_FAST } from "@/constants";

const AssetList = () => {
	const userFriendlyAddress = useTonAddress();
	const { incrementNetWorth, hasFetchedAssets, setHasFetchedAssets } = useStore();
	const [showAllAssets, setShowAllAssets] = useState(false);


	const { data, isFetching } = useQuery({
		queryKey: ["assets", userFriendlyAddress],
		queryFn: () => API.getAssetsByWallet(userFriendlyAddress),
		...CACHE_OPTIONS_FAST
	});

	useEffect(() => {
		if (data && data.assets && !hasFetchedAssets) {
			const totalNetWorth = data.assets.reduce(
				(acc, asset) => acc + ((asset?.name === "Tether USD" ? asset?.amount / Math.pow(10, 6) : asset?.amount / Math.pow(10, asset?.decimals)) * asset.price_usd),
				0
			);
			incrementNetWorth(totalNetWorth);
      setHasFetchedAssets(true)
		}
	}, [data]);

	const assetsArr = data?.assets;

	if (isFetching && !assetsArr) {
		return (
			<div>
				{/* Skeleton loaders */}
				{[...Array(3)].map((_, index) => (
					<div key={index} className="flex items-center space-x-4 py-4">
						<Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
						<div className="space-y-2">
							<Skeleton className="h-3 w-56 bg-gray-300" />
							<Skeleton className="h-3 w-40 bg-gray-300" />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (!assetsArr) return <div>No assets</div>;

	// Sort assets by USD value in descending order
	const sortedAssets = [...assetsArr].sort((a, b) => {
		const aValue = (a.name === "Tether USD" ? a.amount / Math.pow(10, a.decimals) : a.amount / Math.pow(10, a.decimals)) * a.price_usd;
		const bValue = (b.name === "Tether USD" ? b.amount / Math.pow(10, b.decimals) : b.amount / Math.pow(10, b.decimals)) * b.price_usd;
		return bValue - aValue;
	});

	const visibleAssets = showAllAssets ? sortedAssets : sortedAssets.slice(0, 5);

	// Calculate the total value of the hidden assets
	const hiddenAssets = sortedAssets.slice(5);
	const hiddenAssetsValue = hiddenAssets.reduce(
		(acc, asset) => acc + ((asset.name === "Tether USD" ? asset.amount / Math.pow(10, asset.decimals) : asset.amount / Math.pow(10, asset.decimals)) * asset.price_usd),
		0
	);

	const handleCollapseClick = () => {
		setShowAllAssets(prevState => !prevState);
		postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'soft' });	
	};

	return (
		<div className="relative">
			<div className="assets mb-4">
				<p className="font-semibold flex items-center text-xl mb-3">
					<TbCircleDotted className="mr-2 text-yellow-700 size-5" />
					Assets
					<span className="ml-1 text-gray-400 text-base">
						{sortedAssets.length === 0 ? "" : `(${sortedAssets.length})`}
					</span>
				</p>
				<table className="min-w-full rounded-lg overflow-hidden">
					<thead>
						<tr>
							<th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ASSET / AMOUNT
							</th>
							<th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								PRICE
							</th>
							<th className="py-2 px-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">
								USD VALUE
							</th>
						</tr>
					</thead>

					<tbody>
						{visibleAssets.map((asset, index) => (
							<AssetItem
								key={asset.symbol}
								id={index}
								address={asset.address}
								icon={asset?.image_url}
								name={asset?.symbol}
								amount={asset?.name === "Tether USD" ? asset?.amount / Math.pow(10, asset.decimals) : asset?.amount / Math.pow(10, asset.decimals)}
								price={asset?.price_usd}
							/>
						))}
					</tbody>
				</table>
			</div>

			{/* Button Container */}
			<div className="items-center mb-9 pl-2 pr-3">
				{!showAllAssets && sortedAssets.length > 5 && (
					<div className="flex justify-between items-center w-full">
						<button
							className="flex items-center w-full text-gray-500 rounded"
							onClick={handleCollapseClick}
						>
							<IoIosArrowDown className="bg-gray-200 p-1 rounded-full size-8 mr-4" />
							<span>{hiddenAssets.length} assets are hidden</span>
						</button>
						{hiddenAssets.length > 0 && (
							<span className="text-gray-600">
								${hiddenAssetsValue.toFixed(2)}
							</span>
						)}
					</div>
				)}

				{showAllAssets && (
					<button
						className="flex w-full items-center text-gray-500 rounded"
						onClick={handleCollapseClick}
					>
						<IoIosArrowDown className=" rotate-180 bg-gray-200 p-1 rounded-full size-8 mr-4" />
						Show less
					</button>
				)}
			</div>
		</div>
	);
};

export default AssetList;
