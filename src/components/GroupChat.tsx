import React from "react";
import type { Answer } from "../types/chat";
import { MessageBubble } from "./MessageBubble";

type GroupChatProps = {
    answers: Answer[];
    onVote: (answerId: string, emoticon: string) => void;
};

export const GroupChat: React.FC<GroupChatProps> = ({ answers, onVote }) => {
    const [openPickerAnswerId, setOpenPickerAnswerId] = React.useState<string | null>(null);

    const handleOpenPicker = (answerId: string) => {
        setOpenPickerAnswerId(answerId);
    };

    const handleClosePicker = () => {
        setOpenPickerAnswerId(null);
    };

    const handleReactionClick = (answerId: string, emoticon: string) => {
        handleClosePicker();
        onVote(answerId, emoticon);
        console.log(`Voted with ${emoticon} on answer ${answerId}`);
    };

    if (!answers || answers.length === 0) {
        return (
            <div
                className="text-gray-400 text-center py-8"
                aria-label="No messages yet"
            >
                No messages yet.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-3">
            {answers.map((answer) => (
                <div
                    key={answer.id}
                    className="flex"
                    tabIndex={0}
                    aria-label={`Message: ${answer.answerText}`}
                    role="region"
                >
                    <MessageBubble
                        key={answer.id}
                        text={answer.answerText}
                        voteCounts={answer.voteCounts}
                        isPickerOpen={openPickerAnswerId === answer.id}
                        onOpenPicker={() => handleOpenPicker(answer.id)}
                        onClosePicker={handleClosePicker}
                        onReactionClick={(emoticon) => handleReactionClick(answer.id, emoticon)}
                    />
                </div>
            ))}
        </div>
    );
};
