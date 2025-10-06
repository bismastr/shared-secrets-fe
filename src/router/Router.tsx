import { AppLayout } from "@/components/layout/AppLayout";
import { CardPage } from "../pages/CardPage";
import ListCardPage from "@/pages/ListCardPage";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";



const routes = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "cards",
                element: <ListCardPage />
            },
            {
                path: "cards/:cardId",
                element: <CardPage />
            }
        ]
    }
]

export const router = createBrowserRouter(routes);