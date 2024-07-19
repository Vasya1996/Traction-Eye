import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import copy from 'clipboard-copy';
import { postEvent } from '@telegram-apps/sdk';
import { FaRegCopy } from 'react-icons/fa6';
import { IoMdDoneAll } from 'react-icons/io';

import TONLogo from './ton_symbol.svg';
import { NFT } from '@/types/types';

const fetchNFTById = async (id: string) => {
    try {
        console.log(`Fetching NFT with ID: ${id}`);
        const response = await fetch('https://facegame.tw1.ru/nfts_by_wallet/', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('Fetch NFT by ID error:', error);
        throw error;
    }
};

const NFTItemPage: FC = () => {
    const { id } = useParams<{ name: string }>();
    console.log(`Component rendered with NFT: ${id}`);

    const { data: nft, isLoading, isError } = useQuery({
        queryKey: ['nft', id],
        queryFn: () => fetchNFTById(id),
        enabled: !!id
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !nft) {
        return <div>Error: NFT not found</div>;
    }

    const shortenAddress = (address: string, startLength: number = 7, endLength: number = 4): string => {
        const start = address.substring(0, startLength);
        const end = address.substring(address.length - endLength);
        return `${start}...${end}`;
    };

    const copyToClipboard = (text: string) => {
        copy(text);
        postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'medium' });
    };

    return (
        <div className='h-screen bg-gray-50 flex flex-col p-5'>
            {nft && (
                <>
                    <img className='rounded-lg shadow-lg w-full' src={nft.image_url} alt={nft.name} />
                    <h1 className='text-3xl flex py-5 text-start font-bold'>{nft.name}</h1>
                    <span className='w-full border-b'></span>
                    <ul className='gap-3 mt-5 text-base'>
                        <li className='flex justify-between mb-4'>
                            <div className='text-gray-400 font-semibold'>Last Price</div>
                            <div className='font-semibold'>$0.31</div>
                        </li>
                        <li className='flex justify-between mb-4'>
                            <div className='text-gray-400 font-semibold'>Collection</div>
                            <div className='font-semibold'>{nft.collection_name}</div>
                        </li>
                        <li className='flex justify-between mb-5'>
                            <div className='text-gray-400 font-semibold'>Purchase Date</div>
                            <div className='font-semibold'>23 / 12 / 2024</div>
                        </li>
                        <li className='flex justify-between'>
                            <div className='text-gray-400 font-semibold'>TON Address</div>
                            <div className='font-light font-mono cursor-pointer flex items-center' onClick={() => copyToClipboard(nft.nft_address)}>
                                <FaRegCopy className='mr-2 text-gray-700' /> {shortenAddress(nft.nft_address)}
                            </div>
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default NFTItemPage;
