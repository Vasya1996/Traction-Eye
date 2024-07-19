import { FC } from "react";
import { Link } from 'react-router-dom';
import AssetList from "@/components/AssetList";
// import { Skeleton } from "@/components/ui/skeleton";
// import TONLogo from '@/pages/IndexPage/ton_symbol.svg';
import TELogo from '@/pages/ConnectPage/Logo.svg';
// import ExampleNFT from '../NFTListPage/ExampleNFT.jpg';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { PiImages } from "react-icons/pi";
// import { IoAnalyticsOutline } from "react-icons/io5";
// import { FaArrowRight } from "react-icons/fa6";
import NFTList from "@/components/NFTList";
import { IoStatsChart } from "react-icons/io5";

import LiquidityPoolCard from "@/components/LiquidityPoolCard";

// import { fetchNFTsByWallet } from "../NFTListPage/NFTListPage";

// Interfaces
// import NFTCard from "@/components/NFTCard";s
export const IndexPage: FC = () => {
	return (
	  <div className="h-screen bg-gray-800">
		<div className="hero h-56 px-3">
		  <div className="userdata flex">
			<Link to={'/profiles'}>
			  <div className="flex items-center">
				<img className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3" src={TELogo} alt="" />
				<div className="mr-2 items=center">
				  <p className="text-gray-300 font-semibold">WhalePanda</p>
				  <p className="text-gray-400 font-light">N1uQ...D4sQ</p>
				</div>
				<MdOutlineKeyboardArrowRight className="text-zinc-400 my-auto size-5" />
			  </div>
			</Link>
		  </div>
		</div>
  
		<div className="p-5 rounded-t-3xl h-full data bg-gray-50">
		  
		  <AssetList />
		  
		  <NFTList />

		  <div className="tools">
			<p className="font-semibold flex items-center text-xl">
			  <IoStatsChart className="mr-1" /> Tools
			</p>
		  </div>
		  {/* New LiquidityPool component */}
		  <LiquidityPoolCard />
		</div>
	  </div>
	);
  };
  
  export default IndexPage;
