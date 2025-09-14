import { useEffect, useState } from 'react';
import { getFeaturedCards } from './service/cardService';
import type { Card, ApiError } from './service/cardService';


function App() {
    // Initialize with empty array to prevent undefined
    const [featuredCards, setFeaturedCards] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleFetchCards = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const cards = await getFeaturedCards();
            console.log('Received cards:', cards);
            setFeaturedCards(cards || []); // Ensure we always set an array even if API returns undefined
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'An unknown error occurred');
            console.error('Failed to fetch cards:', apiError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleFetchCards();
    }, []);

    const handleRetry = () => {
        handleFetchCards();
    };

    const handleCardClick = (cardId: string) => {
        console.log(`Card clicked: ${cardId}`);
        // Add navigation or modal opening logic here
    };

    const handleCardKeyDown = (event: React.KeyboardEvent, cardId: string) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick(cardId);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Shared Secrets</h1>
            </header>

            <main className="container mx-auto px-4">
                <section aria-labelledby="featured-cards-heading">
                    <h2
                        id="featured-cards-heading"
                        className="text-2xl font-semibold mb-4 text-gray-700"
                    >
                        Featured Cards
                    </h2>

                    {isLoading && (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {error && !isLoading && (
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRetry}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                aria-label="Retry fetching featured cards"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {!isLoading && !error && featuredCards && featuredCards.length === 0 && (
                        <p className="text-gray-500 text-center p-8">No featured cards available.</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCards && featuredCards.map((card) => (
                            <div
                                key={card.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => handleCardClick(card.id)}
                                onKeyDown={(e) => handleCardKeyDown(e, card.id)}
                                tabIndex={0}
                                role="button"
                                aria-label={`View card: ${card.question}`}
                            >
                                <h3 className="font-medium text-lg text-gray-800 mb-2">{card.question}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                        Featured
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(card.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
