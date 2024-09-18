import { MutableRefObject, useMemo, useEffect } from 'react';
import { PiApproximateEqualsBold } from "react-icons/pi";
import { getDateAndTime, formatNumber, downgradeFontSize } from "@/utils";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useElementIntersection } from "@/hooks";

interface AssetInfoProps {
    icon: string;
    name: string;
    amount?: number;
    price?: number;
    pnl_percentage?: number;
    pnl_usd?: number;
    timestamp: number | null;
}

export const AssetInfo = ({
    icon,
    name,
    amount,
    pnl_percentage,
    pnl_usd,
    price,
    timestamp
}: AssetInfoProps) => {
    const navigate = useNavigate();
    const { element1Ref, element2Ref, fontSizeCounter, checkIntersection } = useElementIntersection();
    const { element1Ref: element3Ref, element2Ref: element4Ref, fontSizeCounter: bottomFontSizeCounter } = useElementIntersection();

    useEffect(() => {
        if(amount || pnl_percentage || pnl_usd || price) {
            checkIntersection();
        }
    },[amount, pnl_percentage, pnl_usd, price]);

    const pnl =  useMemo(() => {
        if(pnl_percentage === undefined || pnl_usd === undefined) {
            return `0.00% $(0.00)`;
        }

        return `${pnl_percentage >= 0 ? "+" : ""}${formatNumber(pnl_percentage, false)}% $(${formatNumber(pnl_usd, false)})`;
    },[pnl_percentage, pnl_usd])

    return (
        <div className="hero px-0.5 sticky top-0 py-3.5 bg-opacity-90 rounded-b-2xl backdrop-blur-sm">
            <div className="userdata">
                <div className="flex items-center justify-start">
                    <div className="flex flex-shrink-0">
                        <button
                            className="flex items-center text-gray-500 rounded"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >

                            <MdOutlineKeyboardArrowLeft size={8} className="text-zinc-400 my-auto w-8 h-8" />
                        </button>
                        <img
                            className="h-13 w-13 mr-2 rounded-full"
                            src={icon}
                            alt={name}
                        />
                    </div>
                    <div className="items-start w-full pr-5">
                        <div className="flex flex-col items-start">
                            <div className="flex justify-between items-center w-full">
                                <h1 ref={element1Ref as MutableRefObject<HTMLHeadingElement | null>} className={`${downgradeFontSize("text-lg", fontSizeCounter)} whitespace-nowrap flex justify-start text-white font-semibold leading-extra-tight`}>
                                    {formatNumber(amount)}
                                </h1>
                                <span ref={element2Ref as MutableRefObject<HTMLHeadingElement | null>} className={`${downgradeFontSize("text-base", fontSizeCounter)} whitespace-nowrap ${(Number(pnl_percentage) >= 0 || !pnl_percentage) ? "text-green-600" : "text-red-600"} flex items-center justify-end leading-extra-tight`}>
                                    {pnl}
                                </span>
                            </div>
                            <div  className="flex justify-between items-center w-full">
                                <span ref={element3Ref} className={`${downgradeFontSize("text-base", bottomFontSizeCounter)} whitespace-nowrap text-gray-400 justify-center items-center flex font-semibold leading-extra-tight`}>
                                    <PiApproximateEqualsBold className="mr-1" /> {formatNumber(price, false)}$
                                </span>
                                <span className={`${downgradeFontSize("text-sm", bottomFontSizeCounter)} whitespace-nowrap text-gray-400 flex justify-end leading-extra-tight`}>{getDateAndTime(timestamp)}</span>
                            </div>
                            <p ref={element4Ref as MutableRefObject<HTMLParagraphElement | null>} className="text-gray-300 text-xs font-extralight mt-1">{name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
