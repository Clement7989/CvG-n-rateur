import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.scss";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await api.post("/auth/login", userData);
      console.log("Utilisateur connecté avec succès:", response.data);
      handleLogin(); // Met à jour l'état de connexion dans App.jsx
      localStorage.setItem("token", response.data.token);
      setEmail("");
      setPassword("");
      navigate("/"); // Redirige vers la page d'accueil après la connexion
    } catch (error) {
      console.error("Erreur lors de la connexion:", error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="current-password"
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
