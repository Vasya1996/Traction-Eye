import { FC } from "react";
import { Link } from "react-router-dom";
import { postEvent } from '@telegram-apps/sdk';
import { formatNumber } from "@/utils";

export interface AssetItemProps {
    id: number;
    icon: string;
    address: string;
    name: string;
    amount: number;
    price: number;
    friendWalletAddress?: string;
}

const AssetItem: FC<AssetItemProps> = ({
    address,
    icon,
    name,
    amount,
    price,
    friendWalletAddress
}) => {
    const usdValue = amount * price;

    const handleAssetClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'light' });
    };

    return (
        <tr>
            <td className="py-4 pr-2 flex items-center text-xs">
                <Link
                    to={`/asset/${address}`}
                    state={{ name, icon, amount, price, friendWalletAddress }}
                    className="flex items-center"
                    onClick={handleAssetClick}
                >
                    <img src={icon} alt={name} className="w-12 h-12 mr-2 rounded-full" />
                    <div className="grid">
                        <span className="text-xs">{formatNumber(amount)}</span>
                        <span className="text-gray-400 font-semibold text-xs">{name}</span>
                    </div>
                </Link>
            </td>
            <td className="py-2 px-3 text-xs">
                <Link to={`/asset/${address}`} onClick={handleAssetClick} state={{ name, icon, amount, price, friendWalletAddress }}>
                    {formatNumber(price)}$
                </Link>
            </td>
            <td className="py-2 px-3 text-end text-xs">
                <Link to={`/asset/${address}`} onClick={handleAssetClick} state={{ name, icon, amount, price, friendWalletAddress }}>
                    {formatNumber(usdValue, false)}$
                </Link>
            </td>
        </tr>
    );
};

export default AssetItem;
