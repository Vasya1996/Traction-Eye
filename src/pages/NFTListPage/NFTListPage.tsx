import { FC, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TONLogo from "./ton_symbol.svg";
import { NFT } from "@/types/index";
import { API } from "@/api/api";
import { CACHE_OPTIONS_FAST } from "@/constants";
import { NFTImage } from "@/components/NFTImage";

const NFTListPage: FC = () => {
	const userFriendlyAddress = "UQAINHiKgQMi0BQ-Y4C5AMFiZm_2dgvf-KPxdWJImKWArNwM"; //useTonAddress();

	const { data } = useQuery({
		queryKey: ["nfts", userFriendlyAddress],
		queryFn: () => API.getNftsByWallet(userFriendlyAddress),
		enabled: !!userFriendlyAddress,
		...CACHE_OPTIONS_FAST
	});

	const nfts = data?.nfts ?? [];

	useEffect(() => {
		const scrollContainer = document.querySelector('.max-h-screen');
		if (scrollContainer) {
			scrollContainer.scrollTo(0, 0);
		}
	}, []);

	if (nfts.length === 0) {
		return (
			<div className="h-screen p-4 bg-gray-50 flex justify-center items-center">
				<p className="text-center text-2xl">No NFTs in Your Wallet</p>
			</div>
		);
	}

	return (
		<div className="p-4 pb-[108px] bg-gray-50 flex flex-col items-center">
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
					<li className="w-33 h-33 min-h-[181px] rounded-xl my-auto" key={nft.nft_address}>
						<NFTImage withName nft={nft} linkClassName="w-full" imgClassName="w-full object-cover rounded-xl" noImgClassName="w-full min-h-[181px] flex items-center justify-center bg-gray-300 rounded-xl"/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NFTListPage;
