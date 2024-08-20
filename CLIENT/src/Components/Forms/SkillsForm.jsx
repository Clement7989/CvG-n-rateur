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
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    reset() {
      setWording("");
      setSkills([]);
      setCurrentId(null);
      setErrors({});
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

  const validateForm = () => {
    const newErrors = {};
    const wordingRegex = /^.{3,30}$/; 

    if (!wording.match(wordingRegex)) {
      newErrors.wording =
        "Les atouts doivent contenir entre 3 et 30 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

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
        setWording("");
        setErrors({});
      }
    } catch (error) {
      console.error("Error creating or updating skills:", error);
    }
  };

  const handleEditSkill = (skill) => {
    setWording(skill.wording);
    setCurrentId(skill._id);
    setErrors({});
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
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Atouts:</label>
          <input
            type="text"
            className="form-input"
            value={wording}
            onChange={(e) => setWording(e.target.value)}
          />
          {errors.wording && <p className="form-error">{errors.wording}</p>}
        </div>
        <button type="submit" className="form-button form-button--primary">
          Ajouter ou modifier
        </button>
      </form>

      <ul className="form-list">
        <h2 className="form-title">Atouts</h2>
        {skills.map((skill) => (
          <li key={skill._id} className="form-list-item">
            <strong>{skill.wording}</strong>
            <div className="form-actions">
              <button
                className="form-button form-button--success"
                onClick={() => handleEditSkill(skill)}
              >
                Modifier
              </button>
              <button
                className="form-button form-button--danger"
                onClick={() => handleDeleteSkill(skill._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SkillsForm;
