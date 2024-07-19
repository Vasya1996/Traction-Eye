import { FC } from 'react';
import { Link } from 'react-router-dom';
// import { postEvent } from '@telegram-apps/sdk';
import { useQuery } from "@tanstack/react-query";
// import { useTonWallet } from "@tonconnect/ui-react";
import { Skeleton } from "@/components/ui/skeleton";
import TONLogo from './ton_symbol.svg';
import { NFT } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';


const handleHapticClick = (style: string) => {
    style
//   postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: style });
};

export const fetchNFTsByWallet = async (walletAddress: string) => {
    const response = await fetch('https://facegame.tw1.ru/nfts_by_wallet/', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ wallet_address: walletAddress })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const NFTListPage: FC = () => {
    // const wallet = useTonWallet();
    const userFriendlyAddress = 'UQCHNmmeeo4v1k92G0Wj5edo_hhEH2quRlwp0w652oljJxzW';

    const { data, isFetching, error } = useQuery({
        queryKey: ["nfts", userFriendlyAddress],
        queryFn: () => fetchNFTsByWallet(userFriendlyAddress),
        enabled: !!userFriendlyAddress
    });

    const nfts = data?.nfts || [];

    const nftsWithId = nfts.map((nft: NFT) => ({
        ...nft,
        uniqueId: uuidv4()  // Генерация уникального ID
    }));
    

    console.log(nfts);

    

    if (isFetching) {
        return (
            <div className='h-full p-4 bg-gray-50 flex flex-col items-center'>
                <div className="flex justify-start mb-5 w-full">
                    <span className='font-semibold flex items-center text-center text-lg' onClick={() => handleHapticClick('soft')}>
                        The Open Network
                        <span className='flex ml-2 items-center text-gray-500 text-base'>
                            <img className='ml-2 h-7' src={TONLogo} alt="TON Logo" />
                        </span>
                    </span>
                </div>

                
                <ul className='grid grid-cols-2 flex-col gap-6 mx-auto'>
                    <li><Skeleton className="h-48 w-48 rounded-xl bg-gray-300" /></li>
                    <li><Skeleton className="h-48 w-48 rounded-xl bg-gray-300" /></li>
                    <li><Skeleton className="h-48 w-48 rounded-xl bg-gray-300" /></li>
                </ul>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching NFTs</div>;
    }

    if (nfts.length === 0) {
        return (
            <div className='h-screen p-4 bg-gray-50 flex justify-center items-center'>
                <p className='text-center text-2xl'>No NFTs in Your Wallet</p>
            </div>
        );
    }

    return (
        <div className='h-full p-4 bg-gray-50 flex flex-col items-center'>
            <div className="flex justify-start mb-5 w-full">
                <span className='font-semibold flex items-center text-center text-lg' onClick={() => handleHapticClick('soft')}>
                    The Open Network
                    <span className='flex ml-2 items-center text-gray-500 text-base'>({nfts.length})
                        <img className='ml-2 h-7' src={TONLogo} alt="TON Logo" />
                    </span>
                </span>
            </div>

            <ul className='grid grid-cols-2 flex-col gap-5 mx-auto'>
                {nftsWithId.map((nft: NFT) => (
                    <li key={nft.nft_address}>
                    <Link to={`/nft/${nft.id}`} onClick={() => handleHapticClick('medium')}>
                            <img className='w-48 h-48 rounded-xl' src={nft.image_url} alt={nft.name} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NFTListPage;
