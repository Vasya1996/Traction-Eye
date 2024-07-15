
import { type FC } from 'react';
// import { Link } from 'react-router-dom';

interface AssetItemProps {
    icon: string; // URL иконки
    name: string;
    amount: number;
    price: number;
  }
  
  const AssetItem: FC<AssetItemProps> = ({ icon, name, amount, price }) => {
    const usdValue = amount * price;
    return (
      <tr className="">
        <td className="py-4 px-2 justify-items-stretch flex items-center text-xs ">
          <img src={icon} alt={name} className="w-9 h-9 mr-2" />
          <div className='grid'>
            <span className='text-base'>{amount}</span>
            <span className='text-gray-400 font-semibold text-xs'>{name}</span>
            </div>
        </td>
        <td className="py-2 px-3 text-sm">${price.toFixed(3)}</td>
        <td className="py-2 px-3 text-end">${usdValue.toFixed(3)}</td>
      </tr>

export default AssetItem;