import { FC } from "react";
import copy from "clipboard-copy";
import { postEvent } from "@telegram-apps/sdk";
import { FaRegCopy } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useStore } from "@/store/store";
// import { API } from "@/api/api";

const NFTItemPage: FC = () => {
	const { id } = useParams();
	const nfts = useStore((state) => state.nfts);

	const nft = nfts.filter((nft) => nft.nft_address === id)[0];

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

	// const assetMarketCap = API.getJettonCap(nft.nft_address);

	return (
		<div className="bg-gray-50 flex flex-col h-full p-5">
			<img
				className="rounded-3xl shadow-lg w-full"
				src={nft.image_url}
				alt={nft.name}
			/>
			<h1 className="text-3xl flex py-5 text-start font-bold">{nft.name}</h1>
			<span className="w-full border-b"></span>
			<ul className="gap-3 mt-5 text-base">
				<li className="flex justify-between mb-4">
					<div className="text-gray-400 font-semibold">Last Price</div>
					<div className="font-semibold">$0.1</div>
				</li>
				<li className="flex justify-between mb-4">
					<div className="text-gray-400 font-semibold">Collection</div>
					<div className="font-semibold justify-end flex text-end">{nft.collection_name}</div>
				</li>
				<li className="flex justify-between mb-5">
					<div className="text-gray-400 font-semibold">Purchase Date</div>
					<div className="font-semibold">23 / 12 / 2024</div>
				</li>
				<li className="flex justify-between">
					<div className="text-gray-400 font-semibold">TON Address</div>
					<div
						className="font-light font-mono cursor-pointer flex items-center"
						onClick={() => copyToClipboard(nft.nft_address)}
					>
						<FaRegCopy className="mr-2 text-gray-700" />{" "}
						{shortenAddress(nft.nft_address)}
					</div>
				</li>
			</ul>
		</div>
	);
};

export default NFTItemPage;
