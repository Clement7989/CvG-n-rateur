import React, { useState } from "react";
import axios from "axios";

const UserDetailsForm = () => {
  const [address, setAdress] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/userDetails",
        {
          address,
          zip_code,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cv_id = response.data.cv_id;
      localStorage.setItem("cv_id", cv_id);
    } catch (error) {
      console.error("Error creating UserDetails:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Adresse Postale</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAdress(e.target.value)}
        />
      </div>
      <div>
        <label>Code Postale</label>
        <input
          type="text"
          value={zip_code}
          onChange={(e) => setZip_code(e.target.value)}
        />
      </div>
      <div>
        <label>Ville</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <button type="submit">Sauvegarder</button>
    </form>
  );
};

export default UserDetailsForm;
