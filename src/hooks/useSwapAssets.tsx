import { useAssetList } from "@ston-fi/omniston-sdk-react";
import { RefetchOptions, useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { convertToUserFriendlyAddress } from "@/utils/convertToUserFriendlyAddress";
import { useMemo } from "react";
import { Asset } from "@/types";
import { formatNumber } from "@/utils";
import { CACHE_OPTIONS_FAST, OMNISTON_ASSETS } from "@/constants";

export interface SwapAsset {
  address: string;
  amount: number;
  price: number;
  name: string;
  symbol: string;
  imageUrl: string;
  decimals: number;
}

interface SwapAssetsResponse {
  assets: SwapAsset[],
  refetchBalances: (options?: RefetchOptions) => void;
}

export const useSwapAssets = (): SwapAssetsResponse => {
  // Get asset list from the hook
  const { data: assetList } = useAssetList();

  const omnistonAssets = useMemo(() => assetList && assetList?.assets && assetList.assets?.length > 0 ? assetList : OMNISTON_ASSETS, [assetList?.assets]);

  const userFriendlyAddress = useTonAddress();

  // Get additional data (similar to the screenshot format)
  const { data: externalData, refetch } = useQuery({
    queryKey: ["assets", userFriendlyAddress],
    queryFn: () => API.getAssetsByWallet(userFriendlyAddress),
    ...CACHE_OPTIONS_FAST
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

  // Merge data based on address
  const mergedAssetList = useMemo(() => omnistonAssets?.assets.map((asset) => {

    const matchingExternalData = formattedExternalData?.find(
      (externalAsset) => externalAsset.address === asset.address?.address
    );

    if (matchingExternalData) {
      const amount = +matchingExternalData.amount / Math.pow(10, +asset.decimals);
      return {
        ...asset,
        address: asset.address?.address,
        amount: amount,
        price: formatNumber(matchingExternalData.price * Number(amount), false),
      };
    }

    // Return original asset if no match is found
    return {
      ...asset,
      address: asset.address?.address
    };
  }), [omnistonAssets, formattedExternalData]);

  return {
    assets: mergedAssetList ?? [],
    refetchBalances: refetch,
  };
};
