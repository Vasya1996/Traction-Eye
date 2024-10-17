import { useMiniApp } from '@telegram-apps/sdk-react';  // Telegram SDK

export const useTelegramShare = () => {
  const miniApp = useMiniApp();  // Use Telegram's sendData to share content

  const shareContent = (content: string) => {
    // Send data back to the Telegram bot
    miniApp.sendData(content);
  };

  return { shareContent };
};
