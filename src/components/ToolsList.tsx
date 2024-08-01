

import { FC } from "react";
import LiquidityPoolCard from "./LiquidityPoolCard";

const ToolsList: FC = () => {
    
    return (
        <div>
            <LiquidityPoolCard poolName="stonfi" />
            <LiquidityPoolCard poolName="dedust" />
        </div>
    )
};

export default ToolsList;