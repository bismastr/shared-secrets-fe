import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";


const HomePage = () => {
    return (
        <div>
            <AppLayout>
                <div className="flex flex-col gap-4 items-center">
                    <Button variant="default">Utarakan</Button>
                    <div>Walau tak semua tanya, datang berserta jawabnya</div>
                </div>
            </AppLayout>

        </div>
    );
};

export default HomePage
