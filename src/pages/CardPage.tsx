import { AnswerForm } from "@/components/AnswerForm";
import { GroupChat } from "@/components/GroupChat";
import { QuestionCard } from "@/components/QuestionCard";
import { getAnswerByCardId, submitAnswer, submitVote, type SubmitAnswerRequest } from "@/service/cardService";
import type { Answer } from "@/types/chat";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface LocationState {
    question: string;
}
export const CardPage: React.FC = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [inputValue, setInputValue] = useState("");

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
        <div className="relative">
            <div className="pb-20">
                <QuestionCard question={question} className="mb-4" />
                <GroupChat answers={answers} onVote={handleVote} />
                <AnswerForm
                    inputValue={inputValue}
                    onInputChange={(event) => setInputValue(event.target.value)}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};