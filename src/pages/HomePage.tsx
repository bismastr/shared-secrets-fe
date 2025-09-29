import { AppLayout } from "@/components/layout/AppLayout";
import { QuestionCard } from "@/components/QuestionCard";


const HomePage = () => {
    return (
        <div>
            <AppLayout>
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <QuestionCard question="UTARAKAN UTARAKAN" className=" w-full" />
                    <div>Walau tak semua tanya, datang berserta jawabnya</div>
                </div>
            </AppLayout>

        </div>
    );
};

export default HomePage
