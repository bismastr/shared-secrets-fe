import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/cards');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex flex-col">
            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-5xl mx-auto w-full gap-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-red-600 tracking-tight" style={{ fontFamily: 'cursive' }}>
                        Shared Secrets
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 italic font-light max-w-2xl mx-auto">
                        Walau tak semua tanya, datang berserta jawabnya
                    </p>
                </div>

                {/* Featured Question Card */}
                <div className="w-full max-w-3xl">
                    <QuestionCard
                        question="KAPAN TERAKHIR KAMU TERTIDUR TENANG?"
                        className="w-full"
                    />
                </div>

                {/* Call to Action */}
                <div className="text-center space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <Button
                            variant="default"
                            className="bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 w-20 h-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center p-0"
                            onClick={handleRedirect}
                            aria-label="Go to questions"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Button>
                    </div>
                    <p className="text-base text-gray-500">
                        Bagikan cerita, temukan jawaban
                    </p>
                </div>

            </div>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-400">
                <p>Tempat berbagi rahasia dan menemukan jawaban bersama</p>
            </footer>
        </div>
    );
};

export default HomePage;