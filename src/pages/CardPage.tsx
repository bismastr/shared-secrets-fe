import { GroupChat } from "@/components/GroupChat";
import { QuestionCard } from "@/components/QuestionCard";
import { getAnswerByCardId, submitAnswer, submitVote, type SubmitAnswerRequest } from "@/service/cardService";
import type { Answer } from "@/types/chat";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

interface LocationState {
    question: string;
}
export const CardPage: React.FC = () => {
    const navigate = useNavigate();
    const { cardId } = useParams<{ cardId: string }>();
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [inputValue, setInputValue] = useState("");

    const location = useLocation();
    const state = location.state as LocationState;
    const question = state?.question || "";

    const handleBack = () => {
        navigate(-1);
    };

    const fetchAnswers = async () => {
        try {
            if (!cardId) return;
            const fetchedAnswers = await getAnswerByCardId(cardId);
            setAnswers(fetchedAnswers);
        } catch (error) {
            console.error("Error fetching answers:", error);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!cardId) return;
        if (inputValue.trim() === "") return;

        const request: SubmitAnswerRequest = {
            cardId: cardId,
            answerText: inputValue
        }

        try {
            await submitAnswer(request);
            const newAnswer: Answer = {
                id: `temp-${Date.now()}`,
                answerText: request.answerText,
                voteCounts: []
            };

            setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
            setInputValue("");
        } catch (error) {
            console.error("Error submitting answer:", error);
            setInputValue("");
        }
    };

    const handleVote = (answerId: string, emoticon: string) => {
        console.log(`Handling vote for answerId: ${answerId} with emoticon: ${emoticon}`);
        setAnswers((prevAnswers) =>
            prevAnswers.map((answer) => {
                if (answer.id !== answerId) return answer;
                const existingVote = answer.voteCounts.find(vc => vc.emoticon === emoticon);

                let updatedVoteCounts;
                if (existingVote) {
                    updatedVoteCounts = answer.voteCounts.map(vc =>
                        vc.emoticon === emoticon
                            ? { ...vc, count: vc.count + 1 }
                            : vc
                    );
                } else {
                    updatedVoteCounts = [...answer.voteCounts, { emoticon, count: 1 }];
                }

                return {
                    ...answer,
                    voteCounts: updatedVoteCounts,
                };
            })
        );
        if (cardId) {
            submitVote({ answerId, emoji: emoticon, voteType: "UPVOTE" });
        }
    };

    useEffect(() => {
        fetchAnswers();
    }, [cardId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex flex-col">
            {/* Back Button */}
            <div className="px-4 py-4">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                    aria-label="Go back"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span className="font-medium">Kembali</span>
                </button>
            </div>

            {/* Question Card Section */}
            <div className="px-4 mb-6">
                <QuestionCard question={question} className="w-full max-w-4xl mx-auto" />
            </div>

            {/* Answers Section */}
            <div className="flex-1 px-4 pb-32 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <GroupChat answers={answers} onVote={handleVote} />
                </div>
            </div>

            {/* Answer Input - Fixed at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-red-600 shadow-2xl">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            placeholder="Tulis jawabanmu di sini..."
                            className="flex-1 px-4 py-3 border-2 border-red-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Kirim
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};