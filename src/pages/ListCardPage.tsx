import { QuestionCard } from "@/components/QuestionCard";
import { getAllCards, type Card } from "@/service/cardService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const ListCardPage = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const navigate = useNavigate();

    const fetchAllCards = async () => {
        try {
            const cards = await getAllCards();
            setCards(cards);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        fetchAllCards();
    }, []);

    return (
        <div>
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

            {cards.map(card => (
                <div key={card.id} className="p-4 border-b">
                    <QuestionCard question={card.question} questionId={card.id} />
                </div>
            ))}
        </div>
    )
}

export default ListCardPage;