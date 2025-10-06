import { GroupChat } from "@/components/GroupChat";
import { QuestionCard } from "@/components/QuestionCard";
import { getAnswerByCardId } from "@/service/cardService";
import type { Answer } from "@/types/chat";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface LocationState {
    question: string;
}
export const CardPage: React.FC = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const [answers, setAnswers] = useState<Answer[]>([]);
    const location = useLocation();
    const state = location.state as LocationState;
    const question = state?.question || "";

    const fetchAnswers = async () => {
        try {
            if (!cardId) return;
            const fetchedAnswers = await getAnswerByCardId(cardId);
            setAnswers(fetchedAnswers);
        } catch (error) {
            console.error("Error fetching answers:", error);
        }
    }

    useEffect(() => {
        fetchAnswers();
    }, [cardId]);

    return (
        <div className="relative">
            <div className="pb-20">
                <QuestionCard question={question} className="mb-4" />
                <GroupChat answers={answers} />

            </div>

            <form className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-200 shadow-lg">
                <div className="px-4 py-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Type your answer..."
                            className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                            aria-label="Enter your answer to the question"
                            tabIndex={0}
                        />
                        <button
                            type="submit"
                            className="flex-shrink-0 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base font-medium"
                            aria-label="Submit answer"
                            tabIndex={0}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};