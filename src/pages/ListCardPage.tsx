import { QuestionCard } from "@/components/QuestionCard";
import { getAllCards, type Card } from "@/service/cardService";
import { useEffect, useState } from "react";



const ListCardPage = () => {
    const [cards, setCards] = useState<Card[]>([]);

    const fetchAllCards = async () => {

        try {
            const cards = await getAllCards();
            setCards(cards);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }

    }

    useEffect(() => {
        fetchAllCards();
    }, []);

    return (
        <div>
            {cards.map(card => (
                <div key={card.id} className="p-4 border-b">
                    <QuestionCard question={card.question} />
                </div>
            ))}
        </div>
    )
}

export default ListCardPage;