import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SkillInputForm.css";


const SkillInputForm = () => {
    const [skills, setSkills] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [response, setResponse] = useState(""); // Declare state for response
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            skills: skills.trim(),
            job_role: jobRole.trim(),
        };

        console.log("Data being sent:", data);

        try {
            const res = await axios.post("http://127.0.0.1:5000/analyze", data);
            console.log("API Response:", res.data);
            setResponse(res.data.response); // Set the response to state

            // Pass the response and other data to the dashboard
            navigate("/dashboard", {
                state: {
                    skills: skills.trim(),
                    jobRole: jobRole.trim(),
                    analysisResult: res.data.response
                },
            });
        } catch (error) {
            console.error("Error analyzing skills:", error.response?.data || error.message);
            setResponse("An error occurred while analyzing skills.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto py-10">
            <label className="block mb-2 text-lg">Enter Your Skills</label>
            <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="E.g., Python, Data Analysis"
                className="w-full mb-4 p-2 border rounded"
            />

            <label className="block mb-2 text-lg">Job Role or Industry</label>
            <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            >
                <option value="">Select a Job Role</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
            </select>


            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Analyze
            </button>

            {response && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-bold mb-2">Analysis Result:</h2>
                    <p>{response}</p>
                </div>
            )}
        </form>
    );
};

export default SkillInputForm;
