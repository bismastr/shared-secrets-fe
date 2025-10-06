import React from "react";
import { Outlet } from "react-router-dom";



export const AppLayout: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
            <div className="flex flex-col w-screen max-w-[420px] h-screen overflow-auto bg-white">
                <Outlet />
            </div>
        </div>
    );
};
