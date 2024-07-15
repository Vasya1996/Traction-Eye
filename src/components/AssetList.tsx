import AssetItem from "./AssetItem";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";

const AssetList = () => {
	const { data: assets, isFetching } = useQuery({
		queryKey: ["assets"],
		queryFn: () =>
			API.getAssetsByWallet("UQAJlIVSPGnTXUiDxlv1MPtNrD3qMEWXywFJzCVUh15jduCD"),
	});

	if (isFetching && !assets) return <div>Loading</div>;

	if (!assets) return <div>No assets</div>;
	console.log(assets.assets);

	return (
		<div className="">
			<table className="min-w-full rounded-lg overflow-hidden">
				<thead className="">
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
					{assets.assets?.map((asset, index) => (
						<AssetItem
							key={index}
							icon={asset?.image_url}
							name={asset?.name}
							amount={asset?.amount / Math.pow(10, 9)}
							price={asset?.price_usd}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AssetList;
