import React, { useEffect, useState } from "react";
import axios from "axios";

const OtherInfosForm = ({ onAddOtherInfo }) => {
  const [permit, setPermit] = useState(false);
  const [hobbies, setHobbies] = useState("");
  const [languages, setLanguages] = useState("");
  const [otherInfos, setOtherInfos] = useState([]);
  const [currentId, setCurrentId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          const updateOtherInfos = otherInfos.map((other) =>
            other._id === response.data._id ? response.data : other
          );
          setOtherInfos(updateOtherInfos);
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
    } catch (error) {
      console.error("Error creating or updating other infos:", error);
    }
  };

  const handleEditOtherInfo = (otherInfo) => {
    setPermit(otherInfo.permit);
    setHobbies(otherInfo.hobbies);
    setLanguages(otherInfo.languages);
    setCurrentId(otherInfo._id);
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
      const updateOtherInfos = otherInfos.filter(
        (otherInfo) => otherInfo._id !== otherInfoId
      );
      setOtherInfos(updateOtherInfos);
    } catch (error) {
      console.error("Error deleting other infos:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Permit :</label>
          <input
            type="checkbox"
            checked={permit}
            onChange={(e) => setPermit(e.target.checked)}
          />
        </div>

        <div>
          <label>Langues : </label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
        </div>
        <div>
          <label> Loisirs : </label>
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>

        <button type="submit">Ajoutez ou modifier</button>
      </form>
      <ul>
        <h2>Autres informations</h2>
        {otherInfos.map((otherInfo) => (
          <li key={otherInfo._id}>
            <strong>{otherInfo.permit}</strong>
            <br />
            {otherInfo.languages}
            <br />
            {otherInfo.hobbies}
            <button onClick={() => handleEditOtherInfo(otherInfo)}>
              Modifier
            </button>
            <button onClick={() => handleDeleteOtherInfo(otherInfo._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OtherInfosForm;
