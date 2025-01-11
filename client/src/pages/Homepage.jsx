import React from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css" ;

const Homepage = () => {
    return (
        <div className="homepage min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-100 text-gray-800">
            <div className="max-w-3xl text-center px-4">
                <h1 className="text-5xl font-extrabold mb-6 text-indigo-600">
                    Welcome to <span className="text-blue-600">SkillGapAnalyzer</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-700">
                    Bridge the gap between your current skills and your dream job. Discover tailored resources to boost your career growth.
                </p>


                <Link
                    to="/skill-input"
                    className="inline-block bg-blue-500 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                >
                    Get Started
                </Link>

            </div>
        </div>
    );
};

export default Homepage;