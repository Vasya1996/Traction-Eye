import React from 'react';
import { NFT } from '@/types/index';
import { NFTImage } from "./NFTImage";

interface NFTCardProps {
    nft: NFT;
}


const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {

    return (
        <div className="h-16 w-16 shadow-md rounded-xl bg-slate-200 flex items-center justify-center">
            <NFTImage nft={nft} linkClassName="h-full w-full" imgClassName="h-full w-full object-cover rounded-xl"/>
        </div>
    );
};

export default NFTCard;
