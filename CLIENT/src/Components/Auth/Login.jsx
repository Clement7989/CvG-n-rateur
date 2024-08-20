import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../Styles/auth/login.scss";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    try {
      const userData = { email, password };
      const response = await api.post("/auth/login", userData);
      const { token, user } = response.data;

      console.log("Utilisateur connecté avec succès:", user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      handleLogin(user);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error.response);
      setErrorMessage(error.response?.data?.message || "Erreur inconnue");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Connexion</h2>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
