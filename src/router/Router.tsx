import { CardPage } from "../pages/CardPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";



const routes = [
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                index: true,
                element: <CardPage />
            },
            {
                path: ":cardId",
                children: [
                    {
                        index: true,
                        element: <CardPage />
                    }
                ]
            }
        ]
    }
]

export const router = createBrowserRouter(routes);