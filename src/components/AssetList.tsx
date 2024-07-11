// src/components/AssetList.tsx
import { type FC, useEffect, useMemo } from 'react';

import AssetItem from './AssetItem';

interface Asset {
  icon: string;
  name: string;
  amount: number;
  price: number;
  usdValue: number;
}

interface AssetListProps {
  assets: Asset[];
}

const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  return (
    <div className="">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ASSET / AMOUNT</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USD VALUE</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
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