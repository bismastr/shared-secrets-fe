import React from "react";
import { useNavigate } from "react-router-dom";

type QuestionCardProps = {
    question: string;
    questionId?: string;
    className?: string;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionId, className = "" }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(questionId ? `/cards/${questionId}` : '/cards', {
            state: { question }
        });
    }

    return (
        <div onClick={handleClick} className={`bg-white rounded-2xl shadow-md/30 flex items-center min-h-[220px] justify-center ${className}`}>
            <div className="text-red-600 font-bold text-2xl text-center">
                {question.toUpperCase()}
            </div>
        </div>
    );
};
