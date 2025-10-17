import React from 'react';
import Navbar from "../components/Navbar.tsx";
import TabsNavigation from "../components/TabsNavigation.tsx";
import type IProblem from "../types";
import ProblemsTable from "../components/ProblemsTable.tsx";

const problemsList: IProblem[] = [
    {
        id: "0681df23245543",
        title: "XOR Recovery",
        statement: "You are given an array of integers. Restore the original array using only the bitwise XOR operation.",
        timeRestriction: 1000, // ms
        memoryRestriction: 256, // MB
        solutionTemplateFileId: "template_xor_123",
        testsFileId: "tests_xor_123",
        lintersFileId: "linters_base",
        testsPoints: 80,
        lintersPoints: 20,
        submissionsNumberLimit: 50,
    },
    {
        id: "0681df23f45543",
        title: "Distinct Elements",
        statement: "Determine if a given array contains any duplicates within k positions of each other.",
        timeRestriction: 500, // ms
        memoryRestriction: 128, // MB
        solutionTemplateFileId: "template_unique_456",
        testsFileId: "tests_unique_456",
        lintersFileId: "linters_strict",
        testsPoints: 90,
        lintersPoints: 10,
        submissionsNumberLimit: 100,
    }
];


const MainPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="text-3xl ml-60 mt-6 font-bold">CSES Problem Set</div>
            <TabsNavigation options={[
                {value: 'tasks', path: '/problemset'},
                {value: 'stats', path: '/stats'}
            ]}/>
            <ProblemsTable problems={problemsList} />
        </div>
    );
};

export default MainPage;