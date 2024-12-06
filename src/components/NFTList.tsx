import { FC } from "react";
import { Link } from "react-router-dom";
import NFTCard from "@/components/NFTCard";
import { PiImages, FaArrowRight } from "@/components/icons";
import { NFT } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { useTonAddress } from "@tonconnect/ui-react";
import NFTSkeletons from "./skeletons/NFTSkeletons";
import { API } from "@/api/api";
import { CACHE_OPTIONS_FAST } from "@/constants";
import { GoogleAnalytics } from "@/services";

interface NFTListProps {
    friendWalletAddress?: string;
}

const NFTList: FC<NFTListProps> = ({ friendWalletAddress }) => {
    const userFriendlyAddress = useTonAddress();

    const targetAddress = friendWalletAddress || userFriendlyAddress;

    const { data, isFetching, error } = useQuery({
        queryKey: ["nfts", targetAddress],
        queryFn: () => API.getNftsByWallet(targetAddress),
        enabled: !!targetAddress,
        ...CACHE_OPTIONS_FAST,
    });

    const nfts = data?.nfts ?? [];

	const handleClickNFTsLink = () => {
        GoogleAnalytics.openNFTsListPage();
    }

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
                    <PiImages size={16} className="mr-1" /> NFTs{" "}
                    <span className="ml-1 text-gray-400 text-base">({nfts.length})</span>
                </p>
                <div className="nft-preview py-5">
                    <div className="flex justify-center items-center gap-3">
                        {nfts.slice(0, 3).map((nft: NFT) => (
                            <NFTCard key={nft.nft_address} nft={nft} />
                        ))}

                        {nfts.length === 0 ? (
                            <span className="text-gray-400 items-center mt-5">No NFTs in Your Wallet</span>
                        ) : (
                            <Link to={"/nfts"} onClick={handleClickNFTsLink}>
                                <span className="h-16 shadow-md w-16 items-center flex justify-center bg-gray-200 rounded-xl">
                                    <FaArrowRight size={16} className="text-gray-700" />
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTList;
