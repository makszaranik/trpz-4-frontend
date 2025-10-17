import React from 'react';
import Problem from "../components/Problem.tsx";
import Navbar from "../components/Navbar.tsx";
import type IProblem from "../types";
import TabsNavigation from "../components/TabsNavigation.tsx";
import {Link} from "react-router-dom";



const ProblemPage: React.FC = () => {

    const testProblem: IProblem = {
        id: "1068",
        title: "Weird Algorithm",
        statement: `Consider an algorithm that takes as input a positive integer n.If n is even, the algorithm divides it by two, and if n is odd, the algorithm multiplies it by three and adds one.The algorithm repeats this until n is one.`,
        timeRestriction: 1,
        memoryRestriction: 512,
        submissionsNumberLimit: 100
    }

    return (
        <>
            <Navbar/>
            <Link to='/problemset' className="decoration-none text-2xl ml-60 mt-2 font-bold text-black no-underline">
                CSES Problem Set
            </Link>
            <TabsNavigation options={[
                {value: 'tasks', path: '/problemset'},
                {value: 'submit', path: `/problemset/submit/${testProblem.id}`},
                {value: 'result', path: `/problemset/results/${testProblem.id}`},
                {value: 'statistics', path: '/problemset/statistics'}
            ]}/>
            <div className="max-w-3xl mx-auto p-6">
                <Problem
                    title={testProblem.title}
                    statement={testProblem.statement}
                    timeRestriction={testProblem.timeRestriction}
                    memoryRestriction={testProblem.memoryRestriction}
                    submissionsNumberLimit={testProblem.submissionsNumberLimit}
                />
            </div>
        </>

    );
};

export default ProblemPage;
