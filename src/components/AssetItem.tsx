// AssetItem.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import { postEvent } from '@telegram-apps/sdk';



export interface AssetItemProps {
	id: number; // Используйте уникальный идентификатор
	icon: string;
	address: string;
	name: string;
	amount: number;
	price: number;
}

const AssetItem: FC<AssetItemProps> = ({
	address,
	icon,
	name,
	amount,
	price,
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
					state={{ name, icon, amount, price }}
					className="flex items-center"
					onClick={handleAssetClick}
				>
					<img src={icon} alt={name} className="w-12 h-12 mr-2 rounded-full" />
					<div className="grid">
						<span className="text-base">{amount.toFixed(2)}</span>
						<span className="text-gray-400 font-semibold text-xs">{name}</span>
					</div>
				</Link>
			</td>
			<td className="py-2 px-3 text-base">
				<Link to={`/asset/${address}`} onClick={handleAssetClick} state={{ name, icon, amount, price }}>
					${price.toFixed(3)}
				</Link>
			</td>
			<td className="py-2 px-3 text-end text-base">
				<Link to={`/asset/${address}`} onClick={handleAssetClick} state={{ name, icon, amount, price }}>
					${usdValue.toFixed(3)}
				</Link>
			</td>
		</tr>
	);
};

export default AssetItem;
