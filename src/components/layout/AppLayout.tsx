import React from "react";

type AppLayoutProps = {
    children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
            <div className="flex flex-col w-full max-w-[420px] h-full overflow-auto bg-white shadow-lg">
                <main className="p-4 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
