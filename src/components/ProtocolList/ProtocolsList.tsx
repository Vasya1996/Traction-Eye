import { FC } from "react";
import {LiquidityPoolCard } from "./components";
import { IoMdGitNetwork } from "@/components/icons";
// import { MdOutlineKeyboardArrowRight } from "@/components/icons"; 
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import dedustLogo from "@/pages/IndexPage/dedustlogo.png";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { ProtocolNames } from "@/constants";
// import { Link } from "react-router-dom";
// import { postEvent } from "@telegram-apps/sdk";

const ProtocolsList: FC = () => {
    const userFriendlyAddress = useTonAddress();
  
      const { data: dedustData } = useQuery({
          queryFn: () => API.getDedustInfo(userFriendlyAddress),
          queryKey: ["dedust"],
            staleTime: Infinity,
      });

      const { data: stonFiData } = useQuery({
          queryFn: () => API.getStonfiInfo(userFriendlyAddress),
          queryKey: ["stonfi"],
          staleTime: Infinity,
      });
    
    return (
        <div className="tools mt-7">
            <p className="font-semibold flex items-center text-xl mb-6">
                <IoMdGitNetwork className="mr-2" /> Protocols
            </p>

            <ul>
                <li><LiquidityPoolCard poolName={ProtocolNames.StonFi} icon={STONLogo} poolData={stonFiData ?? []} /></li>
                <li className="mt-10"><LiquidityPoolCard poolName={ProtocolNames.DeDust} icon={dedustLogo} poolData={dedustData ?? []} /></li>
            </ul>
            
        </div>
    )
};

export default ProtocolsList;