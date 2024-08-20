import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../Styles/auth/logout.scss";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); 

      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cv_id");
      localStorage.removeItem("firstname");

      navigate("/login"); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="logout-container">
      <p className="logout-message">Déconnexion en cours...</p>
    </div>
  );
};

export default Logout;
