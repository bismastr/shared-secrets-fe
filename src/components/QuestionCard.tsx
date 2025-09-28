import React from "react";

type QuestionCardProps = {
    question: string;
    className?: string;
};



export const QuestionCard: React.FC<QuestionCardProps> = ({ question, className = "" }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-md/30 flex items-center min-h-[220px] justify-center ${className}`}>
            <div className="text-red-600 font-bold text-2xl text-center">
                {question.toUpperCase()}
            </div>
        </div>
    );
};
