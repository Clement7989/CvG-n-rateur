import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../Styles/Register.scss";

const Register = ({ toggleForm }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { firstname, lastname, email, password };
      const response = await api.post("/auth/register", userData);
      console.log("Utilisateur enregistré avec succès:", response.data);
      localStorage.setItem("firstname", firstname); // Stocke le prénom dans le local storage
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      navigate("/"); // Redirige vers la page d'accueil après l'inscription
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="current-email"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
