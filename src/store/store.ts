import { NFT } from '@/types';
import create from 'zustand';

interface MainStore {
  nfts: NFT[];
  setNfts: (nfts: NFT[]) => void;
  netWorth: number; // Добавляем переменную netWorth в интерфейс
  setNetWorth: (value: number) => void; // Функция для обновления netWorth
}

export const useStore = create<MainStore>((set) => ({
  nfts: [],
  setNfts: (nfts) => set(() => ({ nfts })),
  netWorth: 0, // Инициализируем netWorth
  setNetWorth: (value) => set(() => ({ netWorth: value })), // Функция для обновления netWorth
}));
