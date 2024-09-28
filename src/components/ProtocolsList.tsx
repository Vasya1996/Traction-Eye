import { FC } from "react";
import LiquidityPoolCard from "./LiquidityPoolCard";
import { IoMdGitNetwork } from "@/components/icons";

const ProtocolsList: FC = () => {
    
    return (
        <div className="tools mt-7">
            <p className="font-semibold flex items-center text-xl mb-6">
                <IoMdGitNetwork className="mr-2" /> Protocols
            </p>

            <ul>
                <li><LiquidityPoolCard poolName="stonfi" /></li>
                <li className="mt-10"><LiquidityPoolCard poolName="dedust" /></li>
            </ul>
            
        </div>
    )
};

export default ProtocolsList;