import { useUtils } from '@telegram-apps/sdk-react';

export const useTelegramShare = () => {
  const utils = useUtils(); // Initialize utilities

  const shareContent = (url: string, text: string) => {
    utils.shareURL(
      url, // The URL you want to share
      text, // Optional text message
    );
  };

  return { shareContent };
};
