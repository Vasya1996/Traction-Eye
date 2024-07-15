import { FC } from "react";
import { Link } from 'react-router-dom';
import AssetList from "@/components/AssetList";
import { Skeleton } from "@/components/ui/skeleton";
import TONLogo from '@/pages/IndexPage/ton_symbol.svg';
import TELogo from '@/pages/ConnectPage/Logo.svg';
import ExampleNFT from '../NFTListPage/ExampleNFT.jpg';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbCircleDotted } from "react-icons/tb";
import { PiImages } from "react-icons/pi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";

// Interfaces
import NFTCard from "@/components/NFTCard";

const assets = [
	{ icon: TONLogo, name: 'Toncoin', amount: 96.4293, price: 1, usdValue: 96.43 },
	{ icon: TONLogo, name: 'TonUP', amount: 26.9361, price: 1, usdValue: 26.94 },
	{ icon: TONLogo, name: 'Tgram', amount: 0.0169, price: 553.1, usdValue: 9.33 },
	{ icon: TONLogo, name: 'Duck Coin', amount: 0.0027, price: 3300.22, usdValue: 9.03 },
	{ icon: TONLogo, name: 'ANON', amount: 0.0006, price: 3300.22, usdValue: 1.93 },
  ];


export const nfts = [
    {   
        id: 0,
        nft_address: 'DdfjJDKSH3dkvDLKDslkfd',
        name: '3D TON',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aut saepe aliquid expedita temporibus tempora voluptatibus ipsa.',
        image_url: ExampleNFT,
        collection_name: 'TONFT'
    },
    {   
        id: 1,
        nft_address: 'SLDvg234vvDKf4llDc1m',
        name: '3D TON',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aut saepe aliquid expedita temporibus tempora voluptatibus ipsa.',
        image_url: ExampleNFT,
        collection_name: 'TONFT'
    },
    {   
        id: 2,
        nft_address: 'DdfjJDKSH3dkvDLKDslkfd',
        name: 'Example NFT',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aut saepe aliquid expedita temporibus tempora voluptatibus ipsa.',
        image_url: ExampleNFT,
        collection_name: 'TONFT'
    },
    {   
        id: 3,
        nft_address: 'DdfjJDKSH3dkvDLKDslkfd',
        name: '3D TON',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aut saepe aliquid expedita temporibus tempora voluptatibus ipsa.',
        image_url: ExampleNFT,
        collection_name: 'TONFT'
    },
    { 
        id: 4,
        nft_address: 'DdfjJDKSH3dkvDLKDslkfd',
        name: '3D TON',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aut saepe aliquid expedita temporibus tempora voluptatibus ipsa.',
        image_url: ExampleNFT,
        collection_name: 'TONFT'
    }
];


export const IndexPage: FC = () => {

	return <div className="h-screen bg-gray-800">

		<div className="hero h-56 px-3">
				<div className="userdata flex">
			<Link to={'/profiles'}>
			<div className="flex items-center">
					<img className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3" src={TELogo} alt="" />

					<div className="mr-2 items=center">
						<p className="text-gray-300 font-semibold">WhalePanda</p>
						<p className="text-gray-400 font-light">N1uQ...D4sQ</p>
					</div>
					<MdOutlineKeyboardArrowRight className="text-zinc-400 my-auto size-5"/>
					</div>
			</Link>
				</div>
			{/* <span className="mt-10"><Link to={'/connect'} className="bg-yellow-300 p-3 rounded-xl">Connect Page</Link></span> */}

		</div>


		<div className="p-5 rounded-t-3xl data bg-gray-50">

			<div className="assets mb-4">
				<p className="font-semibold flex items-center text-xl mb-3"><TbCircleDotted className="mr-2 text-yellow-700 size-5"/>Assets<span className="ml-1">{assets.length === 0 ? "" : `(${assets.length})`}</span></p>
				
				{assets.length === 0 ? 
					<div className="flex items-center space-x-4 py-4">
					<Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
					<div className="space-y-2">
					<Skeleton className="h-3 w-56 bg-gray-200" />
					<Skeleton className="h-3 w-40 bg-gray-200" />
					</div>
				</div>
					: <AssetList></AssetList>	
				}

			</div>
      
           <div className="nfts mb-4">
            {nfts.length !== 0 ?
                <div className="bg-white shadow-sm h-36 rounded-lg p-3">
                    <p className="font-semibold text-xl items-center flex">
                        <PiImages className="mr-1"/> NFTs
                    </p>

      <div className="nft-preview py-5">
        <div className="flex justify-center items-center gap-3">
          {nfts.slice(0, 3).map((nft) => (
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
                :
                <div className="bg-white shadow-sm h-36 rounded-lg p-3">
                    <p className="font-semibold text-xl items-center flex">
                        <PiImages className="mr-1"/>NFTs
                    </p>
                    <div className="nft-preview py-5">
                        <div className="flex justify-center items-center gap-3">
                            <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                            <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                            <Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
                            <Link to={'/nfts'}>
                                <span className="h-12 w-12 items-center flex justify-center bg-gray-200 rounded-xl">
                                    <FaArrowRight className="text-gray-700"/>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
                <div className="tools">
                    <p className="font-semibold flex items-center text-xl">
                        <IoAnalyticsOutline className="mr-2"/>Tools
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
