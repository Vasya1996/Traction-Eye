import { useState } from "react";
import { postEvent } from "@telegram-apps/sdk";
import { useTonAddress } from "@tonconnect/ui-react";
import { TIMELINES } from "@/constants";

interface TimelineToolbarProps {
    onTimelineSelect: (timeline: string) => void;
}

export const TimelineToolbar = ({onTimelineSelect}: TimelineToolbarProps) => {
    const walletAddress = useTonAddress();
    // State for selected timeline
    const [selectedTimeline, setSelectedTimeline] = useState<string>("MAX");

    const handleTimelineSelect = (timeline: string) => {
        setSelectedTimeline(timeline);
        onTimelineSelect(timeline);
        // Call postEvent to setup swipe behavior
        postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'rigid' });

    };

    if(!walletAddress) {
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
