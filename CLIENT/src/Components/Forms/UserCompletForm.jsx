import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";


const UserCompletForm = forwardRef(({ onAddUserComplet }, ref) => {
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [userComplet, setUserComplet] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserComplet();
  }, []);

  const fetchUserComplet = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/usercomplet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserComplet(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur :",
        error
      );
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/; 
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 

    if (!birthday.match(dateRegex)) {
      newErrors.birthday =
        "La date de naissance doit être au format YYYY-MM-DD.";
    }

    if (!gender) {
      newErrors.gender = "Le genre est requis.";
    }

    if (!phone.match(phoneRegex)) {
      newErrors.phone = "Le téléphone doit être un numéro de 10 chiffres.";
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
      const userCompletData = { birthday, gender, phone };
      let response;

      if (currentId) {
        
        response = await axios.put(
          `http://localhost:5000/api/usercomplet/${currentId}`,
          userCompletData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        
        const updatedUserComplet = userComplet.map((user) =>
          user._id === response.data._id ? response.data : user
        );
        setUserComplet(updatedUserComplet);
        setCurrentId(null); 
      } else {
       
        response = await axios.post(
          "http://localhost:5000/api/usercomplet",
          userCompletData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        
        setUserComplet([...userComplet, response.data]);
        if (onAddUserComplet) onAddUserComplet(response.data); 
      }

      
      setBirthday("");
      setGender("");
      setPhone("");
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  const handleEditUserComplet = (user) => {
    setBirthday(user.birthday.split("T")[0]); 
    setGender(user.gender || "");
    setPhone(user.phone || "");
    setCurrentId(user._id); 
    setErrors({});
  };

  const handleDeleteUserComplet = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/usercomplet/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUserComplet = userComplet.filter(
        (user) => user._id !== userId
      );
      setUserComplet(updatedUserComplet);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des informations utilisateur :",
        error
      );
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Date de Naissance:</label>
          <input
            type="date"
            className="form-input"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          {errors.birthday && <p className="form-error">{errors.birthday}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Genre:</label>
          <select
            className="form-input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Sélectionnez un genre</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.gender && <p className="form-error">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Téléphone:</label>
          <input
            type="tel"
            className="form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <button type="submit" className="form-button form-button--primary">
          Ajouter ou Modifier
        </button>
      </form>

      <ul className="form-list">
        <h2 className="form-title">Informations Utilisateur Complètes</h2>
        {userComplet.map((user) => (
          <li key={user._id} className="form-list-item">
            <strong>Date de Naissance:</strong>{" "}
            {new Date(user.birthday).toLocaleDateString()} <br />
            <strong>Genre:</strong> {user.gender} <br />
            <strong>Téléphone:</strong> {user.phone} <br />
            <div className="form-actions">
              <button
                className="form-button form-button--success"
                onClick={() => handleEditUserComplet(user)}
              >
                Modifier
              </button>
              <button
                className="form-button form-button--danger"
                onClick={() => handleDeleteUserComplet(user._id)}
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

export default UserCompletForm;
