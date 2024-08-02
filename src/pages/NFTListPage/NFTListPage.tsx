import { FC } from "react";
import { Link } from "react-router-dom";
import TONLogo from "./ton_symbol.svg";
import { NFT } from "@/types/index";
import { useStore } from "@/store/store";

const NFTListPage: FC = () => {
	const nfts = useStore((state) => state.nfts);

  console.log("nfts", nfts);

	if (nfts.length === 0) {
		return (
			<div className="h-screen p-4 bg-gray-50 flex justify-center items-center">
				<p className="text-center text-2xl">No NFTs in Your Wallet</p>
			</div>
		);
	}

	return (
		<div className="p-4 bg-gray-50 flex flex-col items-center h-full">
			<div className="flex justify-start mb-5 w-full">
				<span className="font-semibold flex items-center text-center text-lg">
					The Open Network
					<span className="flex ml-2 items-center text-gray-500 text-base">
						({nfts.length})
						<img className="ml-2 h-7" src={TONLogo} alt="TON Logo" />
					</span>
				</span>
			</div>
			<ul className="grid grid-cols-2 flex-col gap-5 mx-auto">
				{nfts.map((nft: NFT) => (
					<li className="w-50 h-50 bg-gray-300 rounded-xl" key={nft.nft_address}>
						<Link to={`/nft/${nft.nft_address}`}>
							<img
								className=" rounded-xl"
								src={nft.image_url}
								alt={nft.name}
							/>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NFTListPage;
