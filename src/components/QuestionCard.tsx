import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type QuestionCardProps = {
    question: string;
    questionId?: string;
    className?: string;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionId, className = "" }) => {
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [hasFlipped, setHasFlipped] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasFlipped(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        navigate(questionId ? `/cards/${questionId}` : '/cards', {
            state: { question }
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const mouseX = event.clientX - cardCenterX;
        const mouseY = event.clientY - cardCenterY;

        // Calculate rotation angles (max 15 degrees)
        const maxRotation = 20;
        const rotateYValue = (mouseX / (rect.width / 2)) * maxRotation;
        const rotateXValue = -(mouseY / (rect.height / 2)) * maxRotation;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            role="button"
            aria-label={`Question card: ${question}`}
            className={`bg-red-600 rounded-2xl shadow-lg flex items-center min-h-[240px] justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 transition-all p-8 ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${hasFlipped ? rotateX : -90}deg) rotateY(${hasFlipped ? rotateY : 0}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                opacity: hasFlipped ? 1 : 0,
                border: isHovered ? '2px solid #ffffff' : '2px solid transparent',
                transition: hasFlipped
                    ? 'transform 0.2s ease-out, opacity 0.1s ease-out, border-color 0.2s ease-out'
                    : 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out, border-color 0.6s ease-out',
            }}
        >
            <div
                className="text-white font-bold text-2xl text-center leading-relaxed px-4"
                style={{
                    transform: 'translateZ(20px)',
                }}
            >
                {question.toUpperCase()}
            </div>
        </div>
    );
};
