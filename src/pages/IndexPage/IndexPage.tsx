import type { FC } from "react";
import { Link } from 'react-router-dom';
import AssetList from "@/components/AssetList";

import { Skeleton } from "@/components/ui/skeleton"

import TONLogo from '@/pages/IndexPage/ton_symbol.svg';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const assets = [
	{ icon: TONLogo, name: 'Toncoin', amount: 96.4293, price: 1, usdValue: 96.43 },
	{ icon: TONLogo, name: 'TonUP', amount: 26.9361, price: 1, usdValue: 26.94 },
	{ icon: TONLogo, name: 'Tgram', amount: 0.0169, price: 553.1, usdValue: 9.33 },
	{ icon: TONLogo, name: 'Duck Coin', amount: 0.0027, price: 3300.22, usdValue: 9.03 },
	{ icon: TONLogo, name: 'ANON', amount: 0.0006, price: 3300.22, usdValue: 1.93 },
  ];

export const IndexPage: FC = () => {
	return <div className="h-screen bg-gray-800">

		<div className="hero h-56 px-3">
				<div className="userdata flex">
			<Link to={'/connect'}>
			<div className="flex items=center">
					<img className="w-10 h-10 mr-4" src={TONLogo} alt="" />

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


		<div className="h-screen p-5 rounded-t-3xl data bg-white">
			<div className="assets">
				<p className="font-semibold text-xl mb-3">Assets</p>
				
				{assets.length === 0 ? 
					<div className="flex items-center space-x-4 py-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
					<Skeleton className="h-3 w-56" />
					<Skeleton className="h-3 w-40" />
					</div>
				</div>
					: <AssetList assets={assets}></AssetList>	
				}

			</div>
			
			<div className="nfts">
				<p className="font-semibold text-xl mb-5">NFTs</p>
			</div>

			<div className="tools">
				<p className="font-semibold text-xl">Tools</p>
			</div>
		</div>
	</div>;
};
