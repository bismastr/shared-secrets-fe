import { AppLayout } from "@/components/layout/AppLayout";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";


const HomePage = () => {
    return (
        <div>
            <AppLayout>
                <div className="flex flex-col gap-4 items-center justify-center h-full">
                    <QuestionCard question="UTARAKAN UTARAKAN" className=" w-full" />
                    <Button variant="default" className="">Utarakan</Button>
                    <div>Walau tak semua tanya, datang berserta jawabnya</div>
                </div>
            </AppLayout>

        </div>
    );
};

export default HomePage
