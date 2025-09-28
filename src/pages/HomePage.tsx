import { AppLayout } from "@/components/layout/AppLayout";


const HomePage = () => {
    return (
        <div>
            <AppLayout>
                <div className="flex flex-col gap-4 items-center">
                    <button className="p-2 bg-blue-500 text-white rounded-lg">
                        Utarakan
                    </button>
                    <div>Walau tak semua tanya, datang berserta jawabnya</div>
                </div>

            </AppLayout>

        </div>
    );
};

export default HomePage
