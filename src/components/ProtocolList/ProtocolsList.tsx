import { FC } from "react";
import {LiquidityPoolCard } from "./components";
import { IoMdGitNetwork, SettleTon } from "@/components/icons";
// import { MdOutlineKeyboardArrowRight } from "@/components/icons"; 
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import dedustLogo from "@/pages/IndexPage/dedustlogo.png";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { ProtocolNames } from "@/constants";
import { SETTLE_API } from "@/api/settleTonApi";
// import { Link } from "react-router-dom";
// import { postEvent } from "@telegram-apps/sdk";

export const ProtocolsList: FC = () => {
    const userFriendlyAddress = useTonAddress();
    const wallet = useTonWallet();
    console.log('---wallet',wallet?.account.address, userFriendlyAddress);

  
      const { data: dedustData } = useQuery({
          queryFn: () => API.getDedustInfo("UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO"),
          queryKey: ["dedust"],
      });

      const { data: stonFiData } = useQuery({
          queryFn: () => API.getStonfiInfo("UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO"),
          queryKey: ["stonfi"],
      });
    
      const { data: settleTonData } = useQuery({
          queryFn: () => SETTLE_API.getSettleTonJettons("0:6087260ed4f4aa8873bbd0534213936953de2b4c4de97f18c6a73076683e9f59"),
          queryKey: ["settleTon"],
      });
    
    return (
        <div className="tools mt-7">
            <p className="font-semibold flex items-center text-xl mb-6">
                <IoMdGitNetwork className="mr-2" /> Protocols
            </p>

            <ul>
                <li><LiquidityPoolCard poolName={ProtocolNames.StonFi} icon={STONLogo} poolData={stonFiData ?? []} /></li>
                <li className="mt-10"><LiquidityPoolCard poolName={ProtocolNames.DeDust} icon={dedustLogo} poolData={dedustData ?? []} /></li>
                <li className="mt-10"><LiquidityPoolCard poolName={ProtocolNames.SettleTON} icon={<SettleTon/>} poolData={settleTonData?.vaults ?? []} /></li>
                <li><LiquidityPoolCard poolName={ProtocolNames.SettleTON} icon={<SettleTon/>} hasIcon={false} poolData={settleTonData?.indexes ?? []} /></li>
            </ul>
        </div>
    )
};
