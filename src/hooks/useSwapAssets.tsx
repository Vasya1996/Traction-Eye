import { useAssetList } from "@ston-fi/omniston-sdk-react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { convertToUserFriendlyAddress } from "@/utils/convertToUserFriendlyAddress";
import { useMemo } from "react";
import { Asset } from "@/types";

export const useSwapAssets = () => {
  // Get asset list from the hook
  const { data: assetList } = useAssetList();
  const userFriendlyAddress = useTonAddress();

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
    image_url: item.image_url,
  })),[externalData]);

  // Merge data based on address
  const mergedAssetList = useMemo(() => assetList?.assets.map((asset) => {

    const matchingExternalData = formattedExternalData?.find(
      (externalAsset) => externalAsset.address === asset.address?.address
    );

    if (matchingExternalData) {
      return {
        ...asset,
        amount: matchingExternalData.amount,
        price: matchingExternalData.price,
      };
    }

    // Return original asset if no match is found
    return asset;
  }), [assetList, formattedExternalData]);

  return mergedAssetList;
};
