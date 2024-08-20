import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";

const OtherInfosForm = forwardRef(({ onAddOtherInfo }, ref) => {
  const [permit, setPermit] = useState(false);
  const [hobbies, setHobbies] = useState("");
  const [languages, setLanguages] = useState("");
  const [otherInfos, setOtherInfos] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    reset() {
      setOtherInfos([]);
      setPermit(false);
      setHobbies("");
      setLanguages("");
      setCurrentId(null);
      setErrors({});
    },
  }));

  useEffect(() => {
    fetchOtherInfos();
  }, []);

  const fetchOtherInfos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/otherinfos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOtherInfos(response.data);
    } catch (error) {
      console.error("Error fetching Other Infos:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const stringRegex = /^.{1,100}$/;

    // Valider hobbies
    if (!hobbies.match(stringRegex)) {
      newErrors.hobbies =
        "Les loisirs doivent contenir entre 5 et 100 caractères.";
    }

    // Valider languages
    if (!languages.match(stringRegex)) {
      newErrors.languages =
        "Les langues doivent contenir entre 5 et 100 caractères.";
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
      const newOtherInfo = {
        permit,
        hobbies,
        languages,
      };
      let response;
      if (permit && hobbies && languages) {
        if (currentId) {
          response = await axios.put(
            `http://localhost:5000/api/otherinfos/${currentId}`,
            newOtherInfo,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const updatedOtherInfos = otherInfos.map((other) =>
            other._id === response.data._id ? response.data : other
          );
          setOtherInfos(updatedOtherInfos);
          setCurrentId(null);
        } else {
          response = await axios.post(
            "http://localhost:5000/api/otherinfos",
            newOtherInfo,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOtherInfos([...otherInfos, response.data]);
          if (onAddOtherInfo) {
            onAddOtherInfo(response.data);
          }
        }
      }
      setPermit(false);
      setHobbies("");
      setLanguages("");
      setErrors({});
    } catch (error) {
      console.error("Error creating or updating other infos:", error);
    }
  };

  const handleEditOtherInfo = (otherInfo) => {
    setPermit(otherInfo.permit);
    setHobbies(otherInfo.hobbies);
    setLanguages(otherInfo.languages);
    setCurrentId(otherInfo._id);
    setErrors({});
  };

  const handleDeleteOtherInfo = async (otherInfoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/otherinfos/${otherInfoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedOtherInfos = otherInfos.filter(
        (otherInfo) => otherInfo._id !== otherInfoId
      );
      setOtherInfos(updatedOtherInfos);
    } catch (error) {
      console.error("Error deleting other infos:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Permis :</label>
          <input
            type="checkbox"
            className="form-input"
            checked={permit}
            onChange={(e) => setPermit(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Langues : </label>
          <input
            type="text"
            className="form-input"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
          {errors.languages && <p className="form-error">{errors.languages}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Loisirs : </label>
          <input
            type="text"
            className="form-input"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          {errors.hobbies && <p className="form-error">{errors.hobbies}</p>}
        </div>

        <button type="submit" className="form-button form-button--primary">
          Ajoutez ou modifier
        </button>
      </form>

      <ul className="form-list">
        <h2 className="form-title">Autres informations</h2>
        {otherInfos.map((otherInfo) => (
          <li key={otherInfo._id} className="form-list-item">
            <strong>
              {otherInfo.permit ? "Permit : Oui" : "Permit : Non"}
            </strong>
            <br />
            {otherInfo.languages}
            <br />
            {otherInfo.hobbies}
            <div className="form-actions">
              <button
                className="form-button form-button--success"
                onClick={() => handleEditOtherInfo(otherInfo)}
              >
                Modifier
              </button>
              <button
                className="form-button form-button--danger"
                onClick={() => handleDeleteOtherInfo(otherInfo._id)}
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

export default OtherInfosForm;
