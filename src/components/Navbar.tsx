import React from 'react';
import logo from '../assets/img.png';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <div className="w-full bg-black shadow">
            <div className="flex justify-between items-center px-4 py-2">
                <img src={logo} alt="Logo" className="ml-52 h-8" />

                <div className="flex items-center space-x-5 mr-30">
                    <Link to="/teacher-panel" className="text-white hover:underline">Teacher Panel</Link> {/* ✅ новая ссылка */}
                    <span className="text-gray-400">|</span>
                    <Link to="/login" className="text-white hover:underline">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;