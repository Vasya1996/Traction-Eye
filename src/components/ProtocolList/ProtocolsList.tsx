import { FC, useMemo, Fragment } from "react";
import {LiquidityPoolCard } from "./components";
import { IoMdGitNetwork } from "@/components/icons";
// import { MdOutlineKeyboardArrowRight } from "@/components/icons"; 
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import dedustLogo from "@/pages/IndexPage/dedustlogo.png";
import SettleTonLogo from "@/components/icons/SettleTon.svg";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { CACHE_OPTIONS, ProtocolNames } from "@/constants";
import { SETTLE_API } from "@/api/settleTonApi";
import { v4 as uuidv4 } from 'uuid';
import { PoolsData } from "@/types/pools";
import { calculatePoolSum } from "@/utils";

export const ProtocolsList: FC = () => {
    const userFriendlyAddress = useTonAddress();
    const wallet =useTonWallet();
  
    const { data: dedustData } = useQuery({
        queryFn: () => API.getDedustInfo(userFriendlyAddress),
        queryKey: ["dedust", userFriendlyAddress],
        enabled: !!userFriendlyAddress,
        ...CACHE_OPTIONS
    });

    const { data: stonFiData } = useQuery({
        queryFn: () => API.getStonfiInfo(userFriendlyAddress),
        queryKey: ["stonfi", userFriendlyAddress],
        enabled: !!userFriendlyAddress,
        ...CACHE_OPTIONS
    });

    const { data: settleTonData } = useQuery({
        queryFn: () => SETTLE_API.getSettleTonJettons(wallet?.account.address),
        queryKey: ["settleTon",wallet?.account.address],
        enabled: !!wallet?.account.address,
        ...CACHE_OPTIONS
    });
    

    const poolsData: PoolsData = useMemo(() => {
        const stonFiPool = {
            id: uuidv4(),
            poolName: ProtocolNames.StonFi,
            icon: STONLogo,
            poolData: stonFiData ?? [],
            indexes: [],
            vaults: [],
            sum: calculatePoolSum(stonFiData ?? [])
        }

        const dedustPool = {
            id: uuidv4(),
            poolName: ProtocolNames.DeDust,
            icon: dedustLogo,
            poolData: dedustData ?? [],
            indexes: [],
            vaults: [],
            sum: calculatePoolSum(dedustData ?? [])
        }

        const settleTonDataMerged = [...(settleTonData?.vaults ?? []), ...(settleTonData?.indexes ?? [])];
        const settleTonPool = {
            id: uuidv4(),
            poolName: ProtocolNames.SettleTON,
            icon: SettleTonLogo,
            poolData: [],
            indexes: settleTonData?.indexes ?? [],
            vaults: settleTonData?.vaults ?? [],
            sum: calculatePoolSum(settleTonDataMerged)
        }

        return [stonFiPool, dedustPool, settleTonPool].sort((a, b) => b.sum - a.sum);
    },[stonFiData, dedustData, settleTonData?.vaults, settleTonData?.indexes])
    

    return (
        <div className="tools mt-7">
            <p className="font-semibold flex items-center text-xl mb-6">
                <IoMdGitNetwork className="mr-2" /> Protocols
            </p>

            <ul>
                {(poolsData ?? []).map(({id, poolName, icon, poolData, indexes = [], vaults = []}, index) => {
                    const hasMargin = (index !== 0 || index !== poolsData.length - 1);
                    if(poolName === ProtocolNames.SettleTON) {
                        return (
                            <Fragment key={id}>
                                <li className={(hasMargin && indexes?.length > 0) ? "mt-10" : ""}><LiquidityPoolCard poolName={poolName} icon={icon} poolData={vaults} /></li>
                                <li className={(hasMargin && indexes?.length === 0) ? "mt-10" : ""}><LiquidityPoolCard poolName={ProtocolNames.SettleTON} icon={icon} hasIcon={vaults?.length > 0 ? false : true} poolData={indexes} /></li>
                            </Fragment>
                        )
                    }

                    return (
                        <li key={id} className={hasMargin ? "mt-10" : ""}><LiquidityPoolCard poolName={poolName} icon={icon} poolData={poolData ?? []} /></li>
                    )
                })}
            </ul>
        </div>
    )
};
