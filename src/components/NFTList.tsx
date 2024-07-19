// components/NFTList.tsx
import { FC } from "react";
import { Link } from 'react-router-dom';
import NFTCard from "@/components/NFTCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PiImages } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import { NFT } from '@/types/types';
import { useQuery } from "@tanstack/react-query";
// import { useTonWallet } from "@tonconnect/ui-react";
import { fetchNFTsByWallet } from "@/pages/NFTListPage/NFTListPage";


const NFTList: FC = () => {
    // const wallet = useTonWallet();
    // const userFriendlyAddress = wallet?.address || 'UQCHNmmeeo4v1k92G0Wj5edo_hhEH2quRlwp0w652oljJxzW';

    const userFriendlyAddress =  'UQCHNmmeeo4v1k92G0Wj5edo_hhEH2quRlwp0w652oljJxzW'
    const { data, isFetching, error } = useQuery({
        queryKey: ["nfts", userFriendlyAddress],
        queryFn: () => fetchNFTsByWallet(userFriendlyAddress),
        enabled: !!userFriendlyAddress
    });

    const nfts = data?.nfts || [];

    if (isFetching) {
        return (
            <div className="bg-white shadow-sm h-36 rounded-lg p-3">
                <p className="font-semibold text-xl items-center flex">
                    <PiImages className="mr-1" /> NFTs
                </p>
                <div className="nft-preview py-5">
                    <div className="flex justify-center items-center gap-3">
                        <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                        <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                        <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                        <span className="h-12 w-12 items-center flex justify-center bg-gray-200 rounded-xl">
                            <FaArrowRight className="text-gray-700" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching NFTs</div>;
    }

    return (
        <div className="nfts mb-4">
            {nfts.length !== 0 ? (
                <div className="bg-white shadow-sm h-36 rounded-lg p-3">
                    <p className="font-semibold text-xl items-center flex">
                        <PiImages className="mr-1" /> NFTs <span className="ml-1 text-gray-400 text-base">({nfts.length})</span>
                    </p>
                    <div className="nft-preview py-5">
                        <div className="flex justify-center items-center gap-3">
                            {nfts.slice(0, 3).map((nft: NFT) => (
                                <NFTCard key={nft.id} nft={nft} />
                            ))}
                            <Link to={'/nfts'}>
                                <span className="h-16 shadow-md w-16 items-center flex justify-center bg-gray-200 rounded-xl">
                                    <FaArrowRight className="text-gray-700" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-sm h-36 rounded-lg p-3">
                    <p className="font-semibold text-xl items-center flex">
                        <PiImages className="mr-1" /> NFTs
                    </p>
                    <div className="nft-preview py-5">
                        <div className="flex justify-center items-center gap-3">
                            <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                            <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                            <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                            <Link to={'/nfts'}>
                                <span className="h-12 w-12 items-center flex justify-center bg-gray-200 rounded-xl">
                                    <FaArrowRight className="text-gray-700" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NFTList;
