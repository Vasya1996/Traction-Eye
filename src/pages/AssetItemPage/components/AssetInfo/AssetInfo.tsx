import { PiApproximateEqualsBold } from "react-icons/pi";
import { getDateAndTime, formatNumber } from "@/utils";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface AssetInfoProps {
    icon: string;
    name: string;
    amount: number;
    price: number;
    pnl_percentage?: number;
    pnl_usd?: number;
}

export const AssetInfo = ({
    icon,
    name,
    amount,
    pnl_percentage,
    pnl_usd,
    price
}: AssetInfoProps) => {
    const navigate = useNavigate();

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
                                <h1 className="flex justify-start text-lg text-white font-semibold leading-extra-tight">
                                    {formatNumber(10001231231.3321)}
                                </h1>
                                {(pnl_percentage !== undefined && pnl_usd !== undefined) ? (
                                    pnl_percentage >= 0 ? (
                                        <span className="text-green-600 flex items-center justify-end leading-extra-tight">
                                            +{formatNumber(pnl_percentage, false)}% (${formatNumber(pnl_usd, false)})
                                        </span>
                                    ) : (
                                        <span className="text-red-600 flex items-center ml justify-end leading-extra-tight text-sm">
                                            -{formatNumber(pnl_percentage, false)}% (${formatNumber(pnl_usd, false)})
                                        </span>
                                    )
                                ) : (
                                    <span className="text-gray-400 flex items-center justify-end text-sm">
                                        Loading...
                                    </span>
                                )}
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <span className="text-gray-400 justify-center items-center flex text-base font-semibold leading-extra-tight">
                                    <PiApproximateEqualsBold className="mr-1" /> {formatNumber(amount * price, false)}$
                                </span>
                                <span className="text-gray-400 flex justify-end text-sm leading-extra-tight">{getDateAndTime()}</span>
                            </div>
                            <p className="text-gray-300 text-xs font-extralight mt-1">{name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
