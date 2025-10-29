import React from "react";
import LoginPage from "../pages/LoginPage.tsx";
import Stats from "../components/Stats.tsx";
import MainPage from "../pages/MainPage.tsx";
import ProblemSetPage from "../pages/ProblemSetPage.tsx";
import ProblemPage from "../pages/ProblemPage.tsx";
import ProblemSubmissionPage from "../pages/ProblemSubmissionPage.tsx";
import ProblemResultsPage from "../pages/ProblemResultsPage.tsx"; // Импортируем новый компонент

export interface IRoute {
    path: string;
    element: React.ReactNode;
}

export enum RouteNames {
    LOGIN = '/login',
    PROBLEM_SET = '/problemset',
    USER_STATS = '/stats',
    MAIN = '/',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: <LoginPage/>},
    {path: RouteNames.PROBLEM_SET, element: <ProblemSetPage/>},
    {path: RouteNames.USER_STATS, element: <Stats/>},
    {path: RouteNames.MAIN, element: <MainPage/>},
    {path: RouteNames.PROBLEM_SET + '/task/:id', element: <ProblemPage/>},
    {path: RouteNames.PROBLEM_SET + '/submit/:id', element: <ProblemSubmissionPage/>},
    {path: RouteNames.PROBLEM_SET + '/results/:id', element: <ProblemResultsPage/>},

];

export const privateRoutes: IRoute[] = []