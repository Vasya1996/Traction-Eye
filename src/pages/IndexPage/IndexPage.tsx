import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AssetList from "@/components/AssetList";
import TELogo from "@/pages/IndexPage/TELogo.svg";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import NFTList from "@/components/NFTList";
import { IoStatsChart } from "react-icons/io5";
import { IoDiamondOutline } from "react-icons/io5";
import { postEvent } from "@telegram-apps/sdk";

import LiquidityPoolCard from "@/components/LiquidityPoolCard";
import { useTonAddress } from "@tonconnect/ui-react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { API } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { ChartHome } from "@/components/ChartHome";

export const IndexPage: FC = () => {
	const navigate = useNavigate();
	const walletAdress =
		useTonAddress() || "UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO";
	const { initDataRaw } = retrieveLaunchParams();

	const { data } = useQuery({
		queryKey: ["login"],
		queryFn: () => API.login(initDataRaw!),
		enabled: !!initDataRaw,
	});

	console.log("token", data);

	const handlePremiumClick = () => {
		postEvent("web_app_trigger_haptic_feedback", {
			type: "impact",
			impact_style: "medium",
		});
	};

	useEffect(() => {
		if (walletAdress) return;
		setTimeout(() => {
			navigate("connect");
		}, 100);
	}, [walletAdress]);

	return (
		<div className="h-screen bg-gray-800">
			<div className="hero h-56 px-3 flex flex-col">
				<div className="userdata flex justify-between items-center">
					<Link to={"/profiles"}>
						<div className="flex items-center">
							<img
								className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3"
								src={TELogo}
								alt=""
							/>
							<div className="mr-2 items=center">
								<p className="text-gray-400 font-light">N1uQ...D4sQ</p>
							</div>
							<MdOutlineKeyboardArrowRight className="text-zinc-400 my-auto size-5" />
						</div>
					</Link>

					<Link
						onClick={handlePremiumClick}
						className="flex text-sm items-center text-yellow-300 shadow-md shadow-yellow-500/40 mr-1 px-3 bg-black border rounded-xl h-9"
						to={"/premium"}
					>
						<IoDiamondOutline className="mr-2" />
						Get Premium
					</Link>
				</div>
				<div className="mt-auto mb-4">
					<ChartHome />
				</div>
			</div>
			<div className="p-5 rounded-t-3xl data bg-gray-50">
				<AssetList />
				<NFTList />
				<div className="tools">
					<p className="font-semibold flex items-center text-xl">
						<IoStatsChart className="mr-1" /> Tools
					</p>
					<LiquidityPoolCard poolName="stonfi" />
					<LiquidityPoolCard poolName="dedust" />
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
