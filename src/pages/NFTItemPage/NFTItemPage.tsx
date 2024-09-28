import { FC } from "react";
import copy from "clipboard-copy";
import { postEvent } from "@telegram-apps/sdk";
import { FaRegCopy } from "@/components/icons";
import { useParams } from "react-router-dom";
import { API } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import { Colors } from "@/constants";

const NFTItemPage: FC = () => {
	const { id } = useParams();

	const { data: nft } = useQuery({
		queryFn: () => API.getAdditionalNftInfo(id!),
		queryKey: [id],
		enabled: !!id,
	});

	const nfts = useStore((state) => state.nfts);

	const nft_fromlist = nfts.filter((nft) => nft.nft_address === id)[0];

	const shortenAddress = (
		address: string,
		startLength: number = 7,
		endLength: number = 4
	): string => {
		const start = address.substring(0, startLength);
		const end = address.substring(address.length - endLength);
		return `${start}...${end}`;
	};

	const copyToClipboard = (text: string) => {
		copy(text);
		postEvent("web_app_trigger_haptic_feedback", {
			type: "impact",
			impact_style: "medium",
		});
	};
	console.log(id);
	console.log("XDEADEED", nft);

	// const assetMarketCap = API.getJettonCap(nft.nft_address);

	return (
		<div className="bg-gray-50 flex flex-col h-full p-5">
			<img
				className="rounded-3xl shadow-lg w-full"
				src={nft_fromlist?.image_url}
				alt={nft_fromlist.name}
			/>
			<h1 className="text-3xl flex py-5 text-start font-bold">{nft?.name}</h1>
			<span className="w-full border-b"></span>
			<ul className="gap-3 mt-5 text-base">
				<li className="flex justify-between mb-4">
					<div className="text-gray-400 font-semibold">Floor Price</div>
					<div className="font-semibold">${nft?.floor_price_usd}</div>
				</li>
				<li className="flex justify-between mb-4">
					<div className="text-gray-400 font-semibold">Collection</div>
					<div className="font-semibold justify-end flex text-end">
						{nft?.collection_name}
					</div>
				</li>
				<li className="flex justify-between mb-5">
					<div className="text-gray-400 font-semibold">Purchase Date</div>
					<div className="font-semibold">
						{nft?.last_transaction_date || 'unknown'}
					</div>
				</li>
				<li className="flex justify-between">
					<div className="text-gray-400 font-semibold">TON Address</div>
					<div
						className="font-light font-mono cursor-pointer flex items-center"
						onClick={() =>
							copyToClipboard(nft?.nft_address ? nft?.nft_address : "")
						}
					>
						<FaRegCopy size={16} color={Colors.gray} className="mr-2" />{" "}
						{shortenAddress(nft?.nft_address ? nft.nft_address : "")}
					</div>
				</li>
			</ul>
		</div>
	);
};

export default NFTItemPage;
