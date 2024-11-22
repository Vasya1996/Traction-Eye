import { useQuery } from "@tanstack/react-query";
import { NFT } from "@/types";
import { validateImageUrl } from "@/utils";
import { CACHE_OPTIONS } from "@/constants";

const fetchValidNfts = async (unfilteredNfts: NFT[]) => {
  const filteredNfts = await Promise.all(
    unfilteredNfts.map(async (item) => {
      const isValid = item.image_url ? await validateImageUrl(item.image_url) : false;
      return isValid ? item : null;
    })
  );

  return filteredNfts.filter(Boolean) as NFT[];
};

export const useFilteredNfts = (unfilteredNfts: NFT[]) => {
  const { data: nfts = [], isLoading, error } = useQuery({
    queryKey: ["filteredNfts"],
    queryFn: () => fetchValidNfts(unfilteredNfts),
    enabled: !!unfilteredNfts.length, // Only run the query if there are NFTs
    ...CACHE_OPTIONS
  });

  return { nfts, isLoading, error };
};
