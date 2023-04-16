import { createBrowserRouter } from "react-router-dom";

import LayoutPublic from "../layout/LayoutPublic";
import LayoutPrivate from "../layout/LayoutPrivate"


import Cotizador from "../pages/Cotizador";
import Historial from "../pages/Historial";

import NotFound from "../pages/NotFound";



import Login from "../pages/Login";
import Register from "../pages/Register";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <LayoutPublic />,
        errorElement:<NotFound />,
        children:[
            {
                index: true,
                element: <Cotizador />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "dashboard",
                element: <LayoutPrivate />,
                children: [
                    {
                        index: true,
                        element: <Historial />
                    }
                ]
            }
        ]

    },


])