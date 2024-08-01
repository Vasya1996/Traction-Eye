import { NFT } from '@/types'
import { create } from 'zustand'


interface MainStore {
  nfts: NFT[],
  setNfts: (nfts: NFT[]) => void;
}

export const useStore = create<MainStore>((set) => ({
  nfts: [],
  setNfts: (nfts: NFT[]) => set(() => ({ nfts })),
}))
