// AssetItem.tsx
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface AssetItemProps {
    id: number;  // Используйте уникальный идентификатор
    icon: string;
    name: string;
    amount: number;
    price: number;
}

const AssetItem: FC<AssetItemProps> = ({ id, icon, name, amount, price }) => {
    const usdValue = amount * price;
    return (
        <tr>
            <td className="py-4 px-2 flex items-center text-xs">
                <Link to={`/asset/${id}`} className="flex items-center">
                    <img src={icon} alt={name} className="w-9 h-9 mr-2" />
                    <div className='grid'>
                        <span className='text-base'>{amount}</span>
                        <span className='text-gray-400 font-semibold text-xs'>{name}</span>
                    </div>
                </Link>
            </td>
            <td className="py-2 px-3 text-base">
                <Link to={`/asset/${id}`}>
                    ${price.toFixed(3)}
                </Link>
            </td>
            <td className="py-2 px-3 text-end text-base">
                <Link to={`/asset/${id}`}>
                    ${usdValue.toFixed(3)}
                </Link>
            </td>
        </tr>
    );
};

export default AssetItem;
