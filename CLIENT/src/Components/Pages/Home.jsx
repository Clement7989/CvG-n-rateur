import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Home.scss";
import CvGenereted from "../Forms/CvGeneretedForm";

const Home = () => {
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    const fetchUserFirstname = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const userId = JSON.parse(atob(token.split(".")[1])).id;

        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { firstname } = response.data;
        setFirstname(firstname);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserFirstname();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenue sur la page d'accueil</h1>
      {firstname ? (
        <p>Heureux de vous voir, {firstname}!</p>
      ) : (
        <p>Heureux de vous voir sur notre site!</p>
      )}

      <CvGenereted />
    </div>
  );
};

export default Home;
