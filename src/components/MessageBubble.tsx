import React from "react";
import type { VoteCount } from "../types/chat";
import { ReactionPopup } from "./ReactionPopup";
import { ReactionBadge } from "./ReactionBadge";

type MessageBubbleProps = {
    text: string;
    voteCounts: VoteCount[];
    isPickerOpen: boolean;
    onOpenPicker: () => void;
    onClosePicker: () => void;
    onReactionClick: (emoticon: string) => void;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    text,
    voteCounts,
    isPickerOpen,
    onOpenPicker,
    onClosePicker,
    onReactionClick
}) => {
    return (
        <div className="flex flex-col items-start mb-4 max-w-[85%]">
            {/* Message Bubble */}
            <div className="relative bg-white border-2 border-red-600 rounded-3xl rounded-bl-md px-5 py-3 shadow-md">
                <p className="text-gray-800 text-[15px] leading-relaxed break-words">
                    {text}
                </p>
            </div>

            {/* Reactions Container */}
            <div className="flex flex-wrap gap-2 mt-2 ml-2 items-center">
                {voteCounts && voteCounts.length > 0 &&
                    voteCounts.map((vote) => (
                        <ReactionBadge
                            key={vote.emoticon}
                            emoticon={vote.emoticon}
                            count={vote.count}
                            onReactionClick={onReactionClick}
                        />
                    ))
                }

                {/* Add Reaction Button */}
                <button
                    className="flex items-center justify-center text-xs bg-red-50 border border-red-200 rounded-full px-2 py-0.5 hover:bg-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                    tabIndex={0}
                    aria-label="Open reaction picker"
                    onClick={onOpenPicker}
                >
                    <span className="text-red-500 font-medium text-sm">
                        +
                    </span>
                </button>
            </div>

            {/* Reaction Popup */}
            {isPickerOpen && (
                <div
                    className="absolute left-0 mt-2 z-20"
                    role="dialog"
                    aria-modal="true"
                >
                    <ReactionPopup onClick={onReactionClick} onClose={onClosePicker} />
                </div>
            )}
        </div>
    );
};