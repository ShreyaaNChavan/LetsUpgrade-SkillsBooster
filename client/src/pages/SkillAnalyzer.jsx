import React, { useState } from "react";
import axios from "axios";

const SkillAnalyzer = () => {
  const [skills, setSkills] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      skills: skills,
      job_role: jobRole,
    };

    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", data);
      setResponse(res.data.response); // Display the response in the UI
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while analyzing skills.");
    }
  };

  return (
    <div>
      <h1>Skill Gap Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Your Skills:
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="E.g., Python, Data Analysis"
          />
        </label>
        <br />
        <label>
          Job Role:
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="E.g., Data Scientist"
          />
        </label>
        <br />
        <button type="submit">Analyze</button>
      </form>
      {response && <div><h2>Analysis Result:</h2><p>{response}</p></div>}
    </div>
  );
};

export default SkillAnalyzer;
