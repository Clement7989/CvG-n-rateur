import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";

const SkillsForm = forwardRef(({ onAddSkill }, ref) => {
  const [wording, setWording] = useState("");
  const [skills, setSkills] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setWording("");
      setSkills([]);
      setCurrentId(null);
    },
  }));

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/skills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching Skills:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newSkill = { wording };
      let response;
      if (wording) {
        if (currentId) {
          response = await axios.put(
            `http://localhost:5000/api/skills/${currentId}`,
            newSkill,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const updatedSkills = skills.map((skill) =>
            skill._id === response.data._id ? response.data : skill
          );
          setSkills(updatedSkills);
          setCurrentId(null);
        } else {
          response = await axios.post(
            "http://localhost:5000/api/skills",
            newSkill,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSkills([...skills, response.data]);
          if (onAddSkill) {
            onAddSkill(response.data);
          }
        }
      }
      setWording("");
    } catch (error) {
      console.error("Error creating or updating skills:", error);
    }
  };

  const handleEditSkill = (skill) => {
    setWording(skill.wording);
    setCurrentId(skill._id);
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/skills/${skillId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedSkills = skills.filter((skill) => skill._id !== skillId);
      setSkills(updatedSkills);
    } catch (error) {
      console.error("Error deleting skills:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Atouts : </label>
          <input
            type="text"
            value={wording}
            onChange={(e) => setWording(e.target.value)}
          />
        </div>
        <button type="submit"> Ajoutez ou modifier</button>
      </form>

      <ul>
        <h2>Atouts</h2>
        {skills.map((skill) => (
          <li key={skill._id}>
            <strong>{skill.wording}</strong>
            <br />
            <button onClick={() => handleEditSkill(skill)}> Modifier</button>
            <button onClick={() => handleDeleteSkill(skill._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SkillsForm;
