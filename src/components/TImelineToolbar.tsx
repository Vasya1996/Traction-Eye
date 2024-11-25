import { useState } from "react";
import { postEvent } from "@telegram-apps/sdk";
import { useTonAddress } from "@tonconnect/ui-react";
import { TimelineKeys, TIMELINES, TIMELINES_INTERVALS_SECONDS } from "@/constants";

interface TimelineToolbarProps {
    onTimelineSelect: (timeline: keyof typeof TIMELINES_INTERVALS_SECONDS) => void;
    friendWalletAddress?: string;
}

export const TimelineToolbar = ({onTimelineSelect, friendWalletAddress}: TimelineToolbarProps) => {
    const walletAddress = useTonAddress();
    console.log(walletAddress, friendWalletAddress)

    const [selectedTimeline, setSelectedTimeline] = useState<keyof typeof TIMELINES_INTERVALS_SECONDS>(TimelineKeys.Month);

    const handleTimelineSelect = (timeline: keyof typeof TIMELINES_INTERVALS_SECONDS) => {
        setSelectedTimeline(timeline);
        onTimelineSelect(timeline);
        postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'rigid' });

    };

    if(!walletAddress || !friendWalletAddress) {
         return null;
    }

    return (
        <div className="mt-3 flex justify-center text-sm">
            <ul className="flex gap-1 bg-black py-1 px-1 rounded-xl">
                {TIMELINES.map((timeline) => (
                    <li
                        key={timeline}
                        onClick={() => handleTimelineSelect(timeline)}
                        className={`flex items-center justify-center cursor-pointer w-12 rounded-lg py-1 text-gray-500 transition-colors duration-300 ${selectedTimeline === timeline ? "bg-gray-600 text-white" : " text-gray-300"}`}
                    >
                        {timeline}
                    </li>
                ))}
            </ul>
        </div>
    );
};
