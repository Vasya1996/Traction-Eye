import { FC, useEffect, useState } from "react";
import { LiquidityPoolCard } from "./components";
import { IoMdGitNetwork } from "@/components/icons";
// import { MdOutlineKeyboardArrowRight } from "@/components/icons";
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import dedustLogo from "@/pages/IndexPage/dedustlogo.png";
import stormTradeLogo from "@/pages/IndexPage/stormTradeLogo.png";
import SettleTonLogo from "@/components/icons/SettleTon.svg";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { CACHE_OPTIONS, ProtocolNames } from "@/constants";
import { SETTLE_API } from "@/api/settleTonApi";

import { Address } from "ton";
import { STORM_API } from "@/api/stormApi";
import { StormPoolCard } from "./components/StormTradeCard";

// import { Link } from "react-router-dom";
// import { postEvent } from "@telegram-apps/sdk";

interface ProtocolsListProps {
	friendWalletAdress?: string; //ref adress
}

export const ProtocolsList: FC<ProtocolsListProps> = ({
	friendWalletAdress,
}) => {
	const userFriendlyAddress = useTonAddress();
	const [rawAdress, setRawAdress] = useState("");

	const targetAddress = friendWalletAdress || userFriendlyAddress;
	console.log(targetAddress, friendWalletAdress);

	useEffect(() => {
		if (targetAddress.length) {
			setRawAdress(Address.parse(targetAddress).hash.toString("hex"));
		}
	}, [targetAddress]);

	const { data: dedustData } = useQuery({
		queryFn: () => API.getDedustInfo(targetAddress),
		queryKey: ["dedust", targetAddress],
		enabled: !!targetAddress,
		...CACHE_OPTIONS,
	});

	const { data: stonFiData } = useQuery({
		queryFn: () => API.getStonfiInfo(targetAddress),
		queryKey: ["stonfi", targetAddress],
		enabled: !!targetAddress,
		...CACHE_OPTIONS,
	});

	const { data: settleTonData } = useQuery({
		queryFn: () => SETTLE_API.getSettleTonJettons(`0:${rawAdress}`),
		queryKey: ["settleTon", rawAdress],
		enabled: !!rawAdress,
		...CACHE_OPTIONS,
	});

	const { data: stormData } = useQuery({
		queryFn: () => STORM_API.getStormPositions(`0:${rawAdress}`),
		queryKey: ["stormTon", rawAdress],
		enabled: !!rawAdress,
		...CACHE_OPTIONS,
	});

	console.log("stormdata:", stormData);

	return (
		<div className="tools mt-7">
			<p className="font-semibold flex items-center text-xl mb-6">
				<IoMdGitNetwork className="mr-2" /> Protocols
			</p>

			<ul>
				<li>
					<LiquidityPoolCard
						poolName={ProtocolNames.StonFi}
						icon={STONLogo}
						poolData={stonFiData ?? []}
					/>
				</li>
				<li className="mt-10">
					<LiquidityPoolCard
						poolName={ProtocolNames.DeDust}
						icon={dedustLogo}
						poolData={dedustData ?? []}
					/>
				</li>
				<li className="mt-10">
					<LiquidityPoolCard
						poolName={ProtocolNames.SettleTON}
						icon={SettleTonLogo}
						poolData={settleTonData?.vaults ?? []}
					/>
				</li>
				<li>
					<LiquidityPoolCard
						poolName={ProtocolNames.SettleTON}
						icon={SettleTonLogo}
						hasIcon={false}
						poolData={settleTonData?.indexes ?? []}
					/>
				</li>
				<li className="mt-10">
					<StormPoolCard
						poolName={ProtocolNames.StormTrade}
						icon={stormTradeLogo}
						poolData={dedustData ?? []}
					/>
				</li>
			</ul>
		</div>
	);
};
