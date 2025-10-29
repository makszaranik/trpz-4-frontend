import React from 'react';
import logo from '../assets/img.png';
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <div className="w-full bg-black shadow">
            <div className="flex justify-between items-center px-4 py-2">
                <img src={logo} alt="Logo" className="ml-52 h-8" />
                <div className="flex items-center space-x-2">
                    <Link to="/login" className="mr-5 text-white text-decoration-underline">Login</Link>
                    <span>|</span>
                    <Link to="/register" className="mr-50 text-white text-decoration-underline">Register</Link>
                </div>
            </div>

        </div>
    );
};

export default Navbar;