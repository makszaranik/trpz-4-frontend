import React from 'react';
import Login from "../components/Login.tsx";
import Navbar from "../components/Navbar.tsx";

const LoginPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <Login />
        </>
    );
};

export default LoginPage;