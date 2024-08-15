import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AssetList from "@/components/AssetList";
import TELogo from "@/pages/IndexPage/TELogo.svg";


import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import NFTList from "@/components/NFTList";
import ProtocolsList from "@/components/ProtocolsList";
import { IoDiamondOutline } from "react-icons/io5";
import { postEvent } from "@telegram-apps/sdk";

import { useTonAddress } from "@tonconnect/ui-react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { API } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { ChartHome } from "@/components/ChartHome";

export const IndexPage: FC = () => {
	const navigate = useNavigate();
	const walletAdress = useTonAddress();
	const { initDataRaw } = retrieveLaunchParams();

	const { data } = useQuery({
		queryKey: ["login"],
		queryFn: () => API.login(initDataRaw!),
		enabled: !!initDataRaw,
	});

	useEffect(() => {
    if (data?.token) {
        localStorage.setItem('token', data?.token);
    }
	}, [data])

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
		}, 300);
	}, [walletAdress]);

	const shortenWallet = (wallet: string, startLength: number = 4, endLength: number = 4): string => {
		const start = wallet.substring(0, startLength);
		const end = wallet.substring(wallet.length - endLength);
		return `${start}...${end}`;
	};

	return (
		<div className=" bg-gray-800">
			<div className="hero h-56 flex flex-col">
				<div className="userdata px-4 flex justify-between items-center">
					<Link to={"/profiles"}>
						<div className="flex items-center">
							<img
								className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3"
								src={TELogo}
								alt=""
							/>
							<div className=" items=center">
								<p className="text-gray-400 font-light">{shortenWallet(walletAdress)}</p>
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

			<div className="p-5 rounded-t-3xl h-full data bg-gray-50">
				<AssetList />
				
				<NFTList />

				<ProtocolsList />
			</div>
		</div>
	);
};

export default IndexPage;
