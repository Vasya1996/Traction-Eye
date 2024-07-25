import React from 'react';
import { Link } from 'react-router-dom';
import { NFT } from '@/types/index';

interface NFTCardProps {
    nft: NFT;
}


const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
    return (
        <div className="h-16 w-16 shadow-md rounded-xl bg-slate-200">
            <Link to={`/nft/${nft.nft_address}`}>
                <img src={nft.image_url} alt={nft.name} className="h-full w-full object-cover rounded-xl" />
            </Link>
        </div>
    );
};

export default NFTCard;
