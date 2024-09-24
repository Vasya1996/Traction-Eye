import { NFT } from "@/types";
import { create } from "zustand";

interface MainStore {
	nfts: NFT[];
	hasFetchedAssets: boolean;
	hasFetchedDedust: boolean;
	hasFetchedStonfi: boolean;
	setNfts: (nfts: NFT[]) => void;
	netWorth: number; // Добавляем переменную netWorth в интерфейс
	setNetWorth: (value: number) => void; // Функция для обновления netWorth
	incrementNetWorth: (value: number) => void; // Функция для обновления netWorth,
	setHasFetchedAssets: (value: boolean) => void;
	setHasFetchedStonfi: (value: boolean) => void;
	setHasFetchedDedust: (value: boolean) => void;
}

//todo Установить флаги отдельно для всей группы ассетов и тд. Складывать все части и получать нетворс

export const useStore = create<MainStore>((set) => ({
	nfts: [],
	setNfts: (nfts) => set(() => ({ nfts })),
	netWorth: 0,
	setNetWorth: (value) => set(() => ({ netWorth: value })),
	incrementNetWorth: (value) => set((state) => ({ netWorth: state.netWorth + value })),
	hasFetchedAssets: false,
	setHasFetchedAssets: (value) => set(() => ({ hasFetchedAssets: value })),
	hasFetchedDedust: false,
	setHasFetchedDedust: (value) => set(() => ({ hasFetchedDedust: value })),
	hasFetchedStonfi: false,
	setHasFetchedStonfi: (value) => set(() => ({ hasFetchedStonfi: value })),
}));
