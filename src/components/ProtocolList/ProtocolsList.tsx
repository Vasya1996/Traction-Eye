import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { LiquidityPoolCard } from "./components";
import { IoMdGitNetwork } from "@/components/icons";
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import dedustLogo from "@/pages/IndexPage/dedustlogo.png";
import stormTradeLogo from "@/pages/IndexPage/stormTradeLogo.png";
import SettleTonLogo from "@/components/icons/SettleTon.svg";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { CACHE_OPTIONS, ProtocolNames } from "@/constants";
import { SETTLE_API } from "@/api/settleTonApi";

import { v4 as uuidv4 } from "uuid";
import { PoolsData } from "@/types/pools";
import { calculatePoolSum } from "@/utils";
import { Address } from "ton";
import { STORM_API } from "@/api/stormApi";
import { StormPoolCard } from "./components/StormTradeCard";
import { StormVaultCard } from "./components/StormVaultCard";

interface ProtocolsListProps {
	friendWalletAddress?: string; //ref address
}

export const ProtocolsList: FC<ProtocolsListProps> = ({
	friendWalletAddress,
}) => {
	const userFriendlyAddress = useTonAddress();

	const [rawAddress, setRawAddress] = useState("");

	const targetAddress = friendWalletAddress || userFriendlyAddress;

	useEffect(() => {
		if (targetAddress.length) {
			setRawAddress(Address.parse(targetAddress).hash.toString("hex"));
		}
	}, [targetAddress]);

	const { data: dedustData } = useQuery({
		queryFn: () => API.getDedustInfo(targetAddress),
		queryKey: ["dedust", targetAddress],
		enabled: !!targetAddress,
		retry: 2,
		...CACHE_OPTIONS,
	});

	const { data: stonFiData } = useQuery({
		queryFn: () => API.getStonfiInfo(targetAddress),
		queryKey: ["stonfi", targetAddress],
		enabled: !!targetAddress,
		retry: 2,
		...CACHE_OPTIONS,
	});

	const { data: settleTonData } = useQuery({
		queryFn: () => SETTLE_API.getSettleTonJettons(`0:${rawAddress}`),
		queryKey: ["settleTon", rawAddress],
		enabled: !!targetAddress,
		retry: 2,
		...CACHE_OPTIONS,
	});

	const { data: stormPositionsData } = useQuery({
		queryFn: () => STORM_API.getStormPositions(`0:${rawAddress}`),
		queryKey: ["stormTonPositions", rawAddress],
		enabled: !!rawAddress,
		retry: 2,
		...CACHE_OPTIONS,
	});

	const { data: stormVautsData } = useQuery({
		queryFn: () => STORM_API.getStormVaults(`0:${rawAddress}`),
		queryKey: ["stormTonVaults", rawAddress],
		enabled: !!rawAddress,
		retry: 2,
		...CACHE_OPTIONS,
	});

	const poolsData: PoolsData = useMemo(() => {
		const stonFiPool = {
			id: uuidv4(),
			poolName: ProtocolNames.StonFi,
			icon: STONLogo,
			poolData: stonFiData ?? [],
			indexes: [],
			vaults: [],
			sum: calculatePoolSum(stonFiData ?? []),
		};

		const dedustPool = {
			id: uuidv4(),
			poolName: ProtocolNames.DeDust,
			icon: dedustLogo,
			poolData: dedustData ?? [],
			indexes: [],
			vaults: [],
			sum: calculatePoolSum(dedustData ?? []),
		};

		const settleTonDataMerged = [
			...(settleTonData?.vaults ?? []),
			...(settleTonData?.indexes ?? []),
		];
		const settleTonPool = {
			id: uuidv4(),
			poolName: ProtocolNames.SettleTON,
			icon: SettleTonLogo,
			poolData: [],
			indexes: settleTonData?.indexes ?? [],
			vaults: settleTonData?.vaults ?? [],
			sum: calculatePoolSum(settleTonDataMerged),
		};

		return [stonFiPool, dedustPool, settleTonPool].sort(
			(a, b) => b.sum - a.sum
		);
	}, [stonFiData, dedustData, settleTonData?.vaults, settleTonData?.indexes]);

	return (
		<div className="tools mt-7">
			<p className="font-semibold flex items-center text-xl mb-6">
				<IoMdGitNetwork className="mr-2" /> Protocols
			</p>

			<ul>
				{(poolsData ?? []).map(
					(
						{ id, poolName, icon, poolData, indexes = [], vaults = [] },
						index
					) => {
						const hasMargin = index !== 0 || index !== poolsData.length - 1;
						if (poolName === ProtocolNames.SettleTON) {
							return (
								<Fragment key={id}>
									<li
										className={hasMargin && indexes?.length > 0 ? "mt-10" : ""}
									>
										<LiquidityPoolCard
											poolName={poolName}
											icon={icon}
											poolData={vaults}
										/>
									</li>
									<li
										className={
											hasMargin && indexes?.length === 0 ? "mt-10" : ""
										}
									>
										<LiquidityPoolCard
											poolName={ProtocolNames.SettleTON}
											icon={icon}
											hasIcon={vaults?.length > 0 ? false : true}
											poolData={indexes}
										/>
									</li>
								</Fragment>
							);
						}

						return (
							<li key={id} className={hasMargin ? "mt-10" : ""}>
								<LiquidityPoolCard
									poolName={poolName}
									icon={icon}
									poolData={poolData ?? []}
								/>
							</li>
						);
					}
				)}
				<li className="mt-10">
					<StormPoolCard
						poolName={ProtocolNames.StormTrade}
						icon={stormTradeLogo}
						poolData={stormPositionsData?.data ?? []}
					/>
				</li>
				<li className="mt-10">
					<StormVaultCard
						poolName={ProtocolNames.StormTrade}
						icon={stormTradeLogo}
						poolData={stormVautsData?.data ?? []}
					/>
				</li>
			</ul>
		</div>
	);
};
