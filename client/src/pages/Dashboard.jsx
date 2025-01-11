import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { state } = useLocation();
  const { skills, jobRole, analysisResult } = state || {};

  // Function to highlight specific keywords in the analysis
  const highlightText = (text) => {
    const highlightKeywords = [
      "Major Gaps:",
      "Recommended Resources:",
      "Learning Strategy:",
    ];

    for (let keyword of highlightKeywords) {
      if (text.includes(keyword)) {
        return <span className="highlight-analysis">{text}</span>;
      }
    }
    return text;
  };

  return (
    <div className="dashboard">
      <div className="content-container">
        <h2>Skill Gaps Analysis for {jobRole || "your role"}</h2>

        <h3>Your Input:</h3>
        <p><strong>Skills:</strong> {skills}</p>
        <p><strong>Job Role:</strong> {jobRole}</p>

        <h3>Analysis Results:</h3>
        {analysisResult ? (
          analysisResult.split("\n").map((paragraph, index) => (
            <p key={index}>
              {highlightText(paragraph)}
            </p>
          ))
        ) : (
          <p>No analysis available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
