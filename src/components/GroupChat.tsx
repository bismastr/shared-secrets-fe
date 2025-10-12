import React from "react";
import type { Answer } from "../types/chat";
import { MessageBubble } from "./MessageBubble";

type GroupChatProps = {
    answers: Answer[];
};

export const GroupChat: React.FC<GroupChatProps> = ({ answers }) => {
    const [openPickerMessageId, setOpenPickerMessageId] = React.useState<string | null>(null);

    const handleOpenPicker = (messageId: string) => {
        setOpenPickerMessageId(messageId);
    };

    const handleClosePicker = () => {
        setOpenPickerMessageId(null);
    };

    const handleReactionClick = (messageId: string, emoticon: string) => {
        handleClosePicker();
        // Add your reaction logic here
        console.log(`Reacted to message ${messageId} with ${emoticon}`);
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
                        isPickerOpen={openPickerMessageId === answer.id}
                        onOpenPicker={() => handleOpenPicker(answer.id)}
                        onClosePicker={handleClosePicker}
                        onReactionClick={(emoticon) => handleReactionClick(answer.id, emoticon)}
                    />
                </div>
            ))}
        </div>
    );
};
