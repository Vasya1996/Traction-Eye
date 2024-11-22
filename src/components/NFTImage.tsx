import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NFT } from '@/types/index';
import { NoImageIcon } from './icons';
import { Skeleton } from '@mui/material';

interface NFTImageProps {
    nft: NFT;
    linkClassName?: string;
    imgClassName?: string;
    noImgClassName?: string;
    noImgIconClassName?: string;
    withName?: boolean;
}


export const NFTImage: React.FC<NFTImageProps> = ({ nft, linkClassName, imgClassName, noImgClassName, noImgIconClassName, withName = false }) => {
    const [isImageError, setIsImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Link to={`/nft/${nft.nft_address}`} className={linkClassName}>
            {isLoading && !isImageError && (
                <Skeleton
                    variant="rectangular"
                    className={imgClassName ?? 'h-full w-full object-cover rounded-xl'}
                    animation="wave"
                    height={181}
                />
            )}
    
            {!isImageError ? (
                <img
                    src={nft.image_url}
                    alt={nft.name}
                    className={`${imgClassName ?? 'h-full w-full object-cover rounded-xl'} ${
                        isLoading ? 'hidden' : ''
                    }`}
                    onLoad={() => setIsLoading(false)} // Hide Skeleton when the image is loaded
                    onError={() => {
                        setIsImageError(true);
                        setIsLoading(false); // Stop Skeleton on error
                    }}
                />
            ) : (
                <div
                    className={noImgClassName ?? 'h-full w-full flex items-center justify-center bg-gray-300 rounded-xl'}
                >
                    <div className="flex flex-col justify-center items-center px-2">
                    <NoImageIcon className={noImgIconClassName ?? 'h-[30px] w-[30px]'} />
                    {withName && <span style={{ textAlign: 'center' }}>{nft.name}</span>}
                    </div>
                </div>
            )}
        </Link>
    );
};

