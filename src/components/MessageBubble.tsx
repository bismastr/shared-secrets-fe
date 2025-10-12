import React from "react";
import type { VoteCount } from "../types/chat";

type MessageBubbleProps = {
    text: string;
    voteCounts: VoteCount[];
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, voteCounts }) => {
    return (
        <div className="relative bg-blue-500 text-white rounded-[1.25rem] px-4 py-[10px] max-w-[80%] shadow-sm">
            <div
                className="absolute -left-[8px] bottom-[8px] w-4 h-4 overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute w-4 h-4 bg-blue-500 rotate-45 transform origin-bottom-right"></div>
            </div>

            <span className="block text-[15px] font-normal leading-[22px]">{text}</span>

            {voteCounts && voteCounts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5 justify-end">
                    {voteCounts.map((vote) => (
                        <ReactionBadge key={vote.emoticon} emoticon={vote.emoticon} count={vote.count} />
                    ))}
                </div>
            )}
        </div>
    );
};

type ReactionBadgeProps = {
    emoticon: string;
    count: number;
};

const ReactionBadge: React.FC<ReactionBadgeProps> = ({ emoticon, count }) => {
    return (
        <span
            className="flex items-center text-xs bg-black/10 backdrop-blur-sm rounded-full px-1.5 py-0.5"
            aria-label={`${emoticon} ${count}`}
        >
            <span className="mr-1">{emoticon}</span>
            <span className="font-medium">{count}</span>
        </span>
    );
};
