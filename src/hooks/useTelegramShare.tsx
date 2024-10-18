/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMiniApp } from '@telegram-apps/sdk-react';

// telegram-webapp.d.ts
interface Window {
  Telegram: {
    WebApp: {
      showPopup: (params: {
        title: string;
        message: string;
        buttons: { id: string; type: string; text: string }[];
        onButtonClicked?: (buttonId: string) => void;
      }) => void;
      sendData?: (content: string) => void;
    };
  };
}

// export const useTelegramShare = () => {
//   const miniApp = useMiniApp();

//   const shareContent = (content: string) => {
//     if ((window as unknown as Window)?.Telegram && (window as unknown as Window)?.Telegram?.WebApp) {
//       // Show the Telegram Share Popup
//       (window as unknown as Window).Telegram.WebApp.showPopup({
//         title: 'Share this content',
//         message: content,
//         buttons: [
//           { id: 'share', type: 'ok', text: 'Share' },
//           { id: 'cancel', type: 'cancel', text: 'Cancel' },
//         ],
//         onButtonClicked: (buttonId: string) => {
//           if (buttonId === 'share') {
//             // You can also use miniApp.sendData or other logic to send the data to the bot if needed.
//             miniApp.sendData(content); // Or whatever your sharing mechanism is.
//           }
//         },
//       });
//     }
//   };

//   return { shareContent };
// };

export const useTelegramShare = () => {
  // Use Telegram's sendData to communicate with the bot
  const shareContent = (content: string) => {
    if ((window as unknown as Window).Telegram?.WebApp?.sendData) {
      (window as unknown as Window).Telegram.WebApp.sendData?.(content);
    } else {
      console.log("Telegram WebApp API not found");
    }
  };

  return { shareContent };
};

