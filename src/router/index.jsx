import { createBrowserRouter } from "react-router-dom";

import LayoutPublic from "../layout/LayoutPublic";

import Cotizador from "../pages/Cotizador";
import Historial from "../pages/Historial";

import NotFound from "../pages/NotFound";
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
                path:'/historial',
                element: <Historial />
            },
        ]

    },


])