import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AssetList from "@/components/AssetList";
import TELogo from "@/pages/ConnectPage/Logo.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import NFTList from "@/components/NFTList";
import { IoStatsChart } from "react-icons/io5";

import LiquidityPoolCard from "@/components/LiquidityPoolCard";
import { useTonAddress } from "@tonconnect/ui-react";

export const IndexPage: FC = () => {
	const navigate = useNavigate();
  const walletAdress = useTonAddress();

  useEffect(() => {
    if (walletAdress) return;
    setTimeout(() => {
      navigate("connect");
    }, 100)
  }, [walletAdress])

	return (
		<div className="h-screen bg-gray-800 py-4">
      <button onClick={() => {navigate('/connect')}}>ds</button>
			<div className="hero h-56 px-3">
				<div className="userdata flex">
					<Link to={"/profiles"}>
						<div className="flex items-center">
							<img
								className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3"
								src={TELogo}
								alt=""
							/>
							<div className="mr-2 items=center">
								<p className="text-gray-300 font-semibold">WhalePanda</p>
								<p className="text-gray-400 font-light">N1uQ...D4sQ</p>
							</div>
							<MdOutlineKeyboardArrowRight className="text-zinc-400 my-auto size-5" />
						</div>
					</Link>
				</div>
			</div>
			<div className="p-5 rounded-t-3xl data bg-gray-50">
				<AssetList />
				<NFTList />
				<div className="tools">
					<p className="font-semibold flex items-center text-xl">
						<IoStatsChart className="mr-1" /> Tools
					</p>
					<LiquidityPoolCard />
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
