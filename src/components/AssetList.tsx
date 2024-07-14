// src/components/AssetList.tsx
import { type FC } from 'react';
import AssetItem from './AssetItem';

// interfaces
import { AssetListProps } from '../types/types';
import { Asset } from '../types/types';

const AssetList: FC<AssetListProps> = ({ assets }) => {
  return (
    <div className="">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ASSET / AMOUNT</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</th>
            <th className="py-2 px-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">USD VALUE</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset: Asset, index) => (
            <AssetItem
              key={index}
              icon={asset.icon}
              name={asset.name}
              amount={asset.amount}
              price={asset.price}
              usdValue={asset.usdValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
