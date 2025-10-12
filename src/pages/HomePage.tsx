import { QuestionCard } from "@/components/QuestionCard";
import { ReactionPopup } from "@/components/ReactionPopup";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/cards');
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 h-full">
            <QuestionCard question="KAPAN TERAKHIR KAMU TERTIDUR TENANG?" className=" w-full" />
            <Button variant="default" className="" onClick={handleRedirect}>Utarakan</Button>
            <div>Walau tak semua tanya, datang berserta jawabnya</div>
        </div>
    );
};

export default HomePage