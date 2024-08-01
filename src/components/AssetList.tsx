import AssetItem from "./AssetItem";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";

import { TbCircleDotted } from "react-icons/tb";
import { useTonAddress } from "@tonconnect/ui-react";

const AssetList = () => {
	const userFriendlyAddress = useTonAddress() || 'UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO';

	const { data, isFetching } = useQuery({
		queryKey: ["assets"],
		queryFn: () => API.getAssetsByWallet(userFriendlyAddress),
	});

  console.log(data?.assets);

	const assetsArr = data?.assets;

	if (isFetching && !assetsArr) {
		return (
			<div>
				<div className="flex items-center space-x-4 py-4">
					<Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
					<div className="space-y-2">
						<Skeleton className="h-3 w-56 bg-gray-200" />
						<Skeleton className="h-3 w-40 bg-gray-200" />
					</div>
				</div>

				<div className="flex items-center space-x-4 py-4">
					<Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
					<div className="space-y-2">
						<Skeleton className="h-3 w-56 bg-gray-200" />
						<Skeleton className="h-3 w-40 bg-gray-200" />
					</div>
				</div>

				<div className="flex items-center space-x-4 py-4">
					<Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
					<div className="space-y-2">
						<Skeleton className="h-3 w-56 bg-gray-200" />
						<Skeleton className="h-3 w-40 bg-gray-200" />
					</div>
				</div>
			</div>
		);
	}

	if (!assetsArr) return <div>No assets</div>;
	console.log(assetsArr);

	return (
		<div>
			<div className="assets mb-4">
				<p className="font-semibold flex items-center text-xl mb-3">
					<TbCircleDotted className="mr-2 text-yellow-700 size-5" />
					Assets
					<span className="ml-1 text-gray-400 text-base">
						{assetsArr.length === 0 ? "" : `(${assetsArr.length})`}
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
						{assetsArr?.map((asset, index) => (
							<AssetItem
								key={asset.name}
								id={index}
                adress={asset.address}
								icon={asset?.image_url}
								name={asset?.name}
								amount={asset?.amount / Math.pow(10, 9)}
								price={asset?.price_usd}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AssetList;
