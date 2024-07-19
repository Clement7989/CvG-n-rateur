import React, { useState } from "react";
import axios from "axios";

const SkillsForm = () => {
  const [wording, setWording] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  const handleAddSkill = () => {
    if (wording.trim()) {
      setSkills([...skills, wording.trim()]);
      setWording("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Iterate through skills array and send each skill separately to backend
      for (let skill of skills) {
        const response = await axios.post(
          "http://localhost:5000/api/skills",
          {
            wording: skill, // Send each skill as a separate request with 'wording' parameter
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cv_id = response.data.cv_id;
        localStorage.setItem("cv_id", cv_id);
      }

      // Clear skills array after successfully sending all skills
      setSkills([]);
    } catch (error) {
      console.error("Error creating Skills:", error);
      setError(error.response.data.message); // Set detailed error message from API response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message if exists */}
      <div>
        <label>Compétences</label>
        <input
          type="text"
          value={wording}
          onChange={(e) => setWording(e.target.value)}
        />
        <button type="button" onClick={handleAddSkill}>
          Ajouter
        </button>
      </div>
      <div>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <button type="submit" disabled={skills.length === 0}>
        Sauvegarder
      </button>
    </form>
  );
};

export default SkillsForm;
