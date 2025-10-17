import React from 'react';
import { Routes, Route } from "react-router"
import {privateRoutes, publicRoutes} from "../router";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {privateRoutes.map(route =>
                <Route key={route.path}
                       path={route.path}
                       element={route.element}/>
            )}
            {publicRoutes.map(route =>
                <Route key={route.path}
                       path={route.path}
                       element={route.element}/>
            )}
        </Routes>
    );
};

export default AppRouter;