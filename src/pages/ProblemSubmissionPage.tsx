import React from 'react';
import Navbar from "../components/Navbar.tsx";
import {Link, useLocation} from "react-router-dom";
import TabsNavigation from "../components/TabsNavigation.tsx";
import FileUpload from "../components/FileUpload.tsx";
import {useAuthStore} from "../state";
import {SubmissionFileType} from "../types";

const ProblemSubmissionPage: React.FC = () => {

    const location = useLocation();
    const taskId = location.pathname.split("/")[3];
    const token = useAuthStore(state => state.token);


    return (
        <>
            <Navbar/>
            <Link to='/problemset' className="decoration-none text-2xl ml-60 mt-2 font-bold text-black no-underline">
                CSES Problem Set
            </Link>
            <TabsNavigation options={[
                { value: 'tasks', path: '/problemset' },
                { value: 'submit', path: `/problemset/submit/${taskId}` },
                { value: 'result', path: `/problemset/results/${taskId}` },
                { value: 'statistics', path: '/problemset/statistics' },
                { value: 'tests', path: `/problemset/tests/${taskId}` }
            ]} />


            {token ? (
                <FileUpload fileType={SubmissionFileType.SOLUTION} taskId={taskId}/>
            ) : (
                <div className="flex mt-10 ml-60 text-xl text-red-600 font-semibold">
                    Login to system to upload solution
                </div>
            )}
        </>
    );
};

export default ProblemSubmissionPage;