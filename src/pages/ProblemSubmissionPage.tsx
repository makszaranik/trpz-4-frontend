import React from 'react';
import Navbar from "../components/Navbar.tsx";
import {Link, useLocation} from "react-router-dom";
import TabsNavigation from "../components/TabsNavigation.tsx";
import {useFileUpload} from "../hooks/useFileUpload.tsx";


const ProblemSubmissionPage: React.FC = () => {

    const location = useLocation();
    const taskId = location.pathname.split("/")[3];
    const { file, isUploading, onFileChange, uploadFile } = useFileUpload();

    const handleUpload = async () => {
        const result = await uploadFile('/upload');
        console.log(result);
    };


    return (
        <>
            <Navbar/>
            <Link to='/problemset' className="decoration-none text-2xl ml-60 mt-2 font-bold text-black no-underline">
                CSES Problem Set
            </Link>
            <TabsNavigation options={[
                {value: 'tasks', path: '/problemset'},
                {value: 'submit', path: '/problemset/submit/:id'},
                {value: 'result', path: '/problemset/results'},
                {value: 'statistics', path: '/problemset/statistics'},
            ]}/>
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
        </>
    );
};

export default ProblemSubmissionPage;