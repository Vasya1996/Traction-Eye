import { useUtils } from '@telegram-apps/sdk-react';

export const useTelegramShare = () => {
  const utils = useUtils(); // Initialize utilities

  const shareContent = (url: string, text: string) => {
    utils.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
  };

  return { shareContent };
};
