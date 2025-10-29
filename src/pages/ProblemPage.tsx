import React, { useEffect, useState } from 'react';
import Problem from "../components/Problem.tsx";
import Navbar from "../components/Navbar.tsx";
import type IProblem from "../types";
import TabsNavigation from "../components/TabsNavigation.tsx";
import { Link } from "react-router-dom";
import { DownloadSolutionTemplate } from "../components/DownloadSolutionTemplate.tsx";

const ProblemPage: React.FC = () => {
    const [problem, setProblem] = useState<IProblem | null>(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/tasks/6901d40da193662393825c47");
                if (!response.ok) throw new Error("Failed to load problem");
                const data = await response.json();
                setProblem(data);
                console.log(data);
            } catch (error) {
                console.error("Error loading problem:", error);
            }
        };
        fetchProblem();
    }, []);

    if (!problem) return <div>Loading...</div>;

    return (
        <>
            <Navbar/>
            <Link to='/problemset' className="decoration-none text-2xl ml-60 mt-2 font-bold text-black no-underline">
                CSES Problem Set
            </Link>

            <TabsNavigation options={[
                { value: 'tasks', path: '/problemset' },
                { value: 'submit', path: `/problemset/submit/${problem.id}` },
                { value: 'result', path: `/problemset/results/${problem.id}` },
                { value: 'statistics', path: '/problemset/statistics' },
            ]}/>

            <div className="max-w-3xl mx-auto p-6">
                <Problem
                    title={problem.title}
                    statement={problem.statement}
                    timeRestriction={problem.timeRestriction}
                    memoryRestriction={problem.memoryRestriction}
                    submissionsNumberLimit={problem.submissionsNumberLimit}
                />
            </div>

            {problem.solutionTemplateFileId && (
                <div className="ml-90 mt-1">
                    <DownloadSolutionTemplate solutionTemplateFileId={problem.solutionTemplateFileId}/>
                </div>
            )}
        </>
    );
};

export default ProblemPage;
