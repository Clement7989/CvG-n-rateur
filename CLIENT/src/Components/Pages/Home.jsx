import React, { useEffect, useState } from "react";
import axios from "axios";
import CvGenereted from "../Forms/CvGeneretedForm";
import VideoYt from "../Media/VideoYt";
import "../../Styles/pages/home.scss";

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
      <h1 className="h1-welcome">Bienvenue sur notre générateur de CV !</h1>

      {firstname ? (
        <p className="p-firstname">
          {" "}
          Heureux de vous voir,{" "}
          <span className="firstname-highlight">{firstname}</span> !
        </p>
      ) : (
        <p>Heureux de vous voir sur notre site!</p>
      )}

      <h2 className="h2-tip">Voici quelques conseils rapides ! 😁 </h2>
      <VideoYt
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        title="Présentation de l'éco-conception"
      />

      <CvGenereted />
    </div>
  );
};

export default Home;
