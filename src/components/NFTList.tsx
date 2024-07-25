import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import NFTCard from "@/components/NFTCard";
import { PiImages } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import { NFT } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { useTonAddress } from "@tonconnect/ui-react";
import NFTSkeletons from "./skeletons/NFTSkeletons";
import { API } from "@/api/api";
import { useStore } from "@/store/store";

const NFTList: FC = () => {
	const userFriendlyAddress = useTonAddress();

  const setNfts = useStore((state) => state.setNfts);

	const { data, isFetching, error } = useQuery({
		queryKey: ["nfts", userFriendlyAddress],
		queryFn: () => API.getNftsByWallet(userFriendlyAddress),
		enabled: !!userFriendlyAddress,
	});

  console.log(data);

	useEffect(() => {
		if (data?.nfts) {
			setNfts(data.nfts);
		}
	}, [data, setNfts]);

	const nfts = useStore((state) => state.nfts);


	if (isFetching) {
		return <NFTSkeletons />;
	}

	if (error) {
		return <div>Error fetching NFTs</div>;
	}

	return (
		<div className="nfts mb-4">
			<div className="bg-white shadow-sm h-36 rounded-lg p-3">
				<p className="font-semibold text-xl items-center flex">
					<PiImages className="mr-1" /> NFTs{" "}
					<span className="ml-1 text-gray-400 text-base">({nfts.length})</span>
				</p>
				<div className="nft-preview py-5">
					<div className="flex justify-center items-center gap-3">
						{nfts.slice(0, 3).map((nft: NFT) => (
							<NFTCard key={nft.name} nft={nft} />
						))}
						<Link to={"/nfts"}>
							<span className="h-16 shadow-md w-16 items-center flex justify-center bg-gray-200 rounded-xl">
								<FaArrowRight className="text-gray-700" />
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NFTList;
