import React, { useState } from "react";
import axios from "axios";

const UserCompletForm = () => {
  const [formData, setFormData] = useState({
    birthday: "",
    gender: "",
    phone: "",
    userId: "", // Assure-toi d'obtenir l'ID utilisateur approprié
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/usercomplet",
        formData
      );
      console.log("Response:", response.data);
      // Traite la réponse comme nécessaire
    } catch (error) {
      console.error("Error:", error);
      // Gère les erreurs si la requête échoue
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Birthday:
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Save User Details</button>
    </form>
  );
};

export default UserCompletForm;
