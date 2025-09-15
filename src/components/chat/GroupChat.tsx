import React from "react";
import type { Answer } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";

type GroupChatProps = {
    answers: Answer[];
};

export const GroupChat: React.FC<GroupChatProps> = ({ answers }) => {
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
        <div className="flex flex-col gap-4">
            {answers.map((answer) => (
                <div
                    key={answer.id}
                    className="flex"
                    tabIndex={0}
                    aria-label={`Message: ${answer.answerText}`}
                    role="region"
                >
                    <MessageBubble
                        text={answer.answerText}
                        voteCounts={answer.voteCounts}
                    />
                </div>
            ))}
        </div>
    );
};
