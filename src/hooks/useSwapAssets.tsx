import { useAssetList} from "@ston-fi/omniston-sdk-react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { convertToUserFriendlyAddress } from "@/utils/convertToUserFriendlyAddress";
import { useMemo } from "react";
import { Asset } from "@/types";
import { formatNumber } from "@/utils";

export interface SwapAsset {
  address: string;
  amount: number;
  price: number;
  name: string;
  symbol: string;
  imageUrl: string;
  decimals: number;
}

export const useSwapAssets = (): SwapAsset[] => {
  // Get asset list from the hook
  const { data: assetList } = useAssetList();


  const userFriendlyAddress = "UQAINHiKgQMi0BQ-Y4C5AMFiZm_2dgvf-KPxdWJImKWArNwM";//useTonAddress();

  // Get additional data (similar to the screenshot format)
  const { data: externalData } = useQuery({
    queryKey: ["assets", userFriendlyAddress],
    queryFn: () => API.getAssetsByWallet(userFriendlyAddress),
  });

  // Transform external data to match the format of assetList for merging
  const formattedExternalData = useMemo(() => externalData?.assets.map((item: Asset) => ({
    address: item.address === "native" ? "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c" : convertToUserFriendlyAddress(item.address),
    amount: item.amount,
    price: item.price_usd,
    name: item.name,
    symbol: item.symbol,
    imageUrl: item.image_url,
  })),[externalData]);

  // console.log('--assetList',assetList, '--formattedExternalData',formattedExternalData);

  // Merge data based on address
  const mergedAssetList = useMemo(() => assetList?.assets.map((asset) => {

    const matchingExternalData = formattedExternalData?.find(
      (externalAsset) => externalAsset.address === asset.address?.address
    );

    if (matchingExternalData) {
      const amount = +matchingExternalData.amount / Math.pow(10, +asset.decimals);
      return {
        ...asset,
        address: asset.address?.address,
        amount: formatNumber(amount),
        price: formatNumber(matchingExternalData.price * Number(amount), false),
      };
    }

    // Return original asset if no match is found
    return {
      ...asset,
      address: asset.address?.address
    };
  }), [assetList, formattedExternalData]);

  return mergedAssetList ?? [];
};
