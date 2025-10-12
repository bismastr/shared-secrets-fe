import { AnswerForm } from "@/components/AnswerForm";
import { GroupChat } from "@/components/GroupChat";
import { QuestionCard } from "@/components/QuestionCard";
import { getAnswerByCardId, submitAnswer, type SubmitAnswerRequest } from "@/service/cardService";
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

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

    useEffect(() => {
        fetchAnswers();
    }, [cardId]);

    return (
        <div className="relative">
            <div className="pb-20">
                <QuestionCard question={question} className="mb-4" />
                <GroupChat answers={answers} />
                <AnswerForm
                    inputValue={inputValue}
                    onInputChange={(event) => setInputValue(event.target.value)}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};