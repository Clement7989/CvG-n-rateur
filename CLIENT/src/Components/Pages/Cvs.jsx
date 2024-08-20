import React, { useState, useEffect } from "react";
import axios from "axios";

const CVs = () => {
  const [cvs, setCvs] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCvs, setExpandedCvs] = useState({}); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const cvResponse = await axios.get(
          "http://localhost:5000/api/cvGenereted",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCvs(cvResponse.data);
      } catch (err) {
        setError("Vous n'avez de CV pour le moment...");
      }
    };

    fetchData();
  }, []);

  const toggleCv = (cvId) => {
    setExpandedCvs((prev) => ({
      ...prev,
      [cvId]: !prev[cvId], 
    }));
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/cvGenereted/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCvs(cvs.filter((cv) => cv._id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression du CV.");
    }
  };

  return (
    <div className="cvs-container">
      <h2 className="cvs-title">Mes CV</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {cvs.map((cv) => (
          <li key={cv._id}>
            <h3 onClick={() => toggleCv(cv._id)} className="cv-title">
              {cv.title}
            </h3>
            {expandedCvs[cv._id] && (
              <div className="cv-content">
                <div className="cvs">
                  <h4>Informations Personnelles</h4>
                  <p>
                    <strong>Nom:</strong> {cv.firstName} {cv.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {cv.email}
                  </p>
                  {cv.userDetails &&
                    cv.userDetails.map((detail) => (
                      <div key={detail._id}>
                        <p>
                          <strong>Adresse:</strong> {detail.address}
                        </p>
                        <p>
                          <strong>Code Postal:</strong> {detail.zip_code}
                        </p>
                        <p>
                          <strong>Pays:</strong> {detail.country}
                        </p>
                      </div>
                    ))}
                </div>

                <div className="cvs">
                  <h4>Formations</h4>
                  <ul>
                    {cv.trainings &&
                      cv.trainings.map((training) => (
                        <li key={training._id}>
                          <p>
                            <strong>Diplôme:</strong> {training.diploma}
                          </p>
                          <p>
                            <strong>École:</strong> {training.establishment}
                          </p>
                          <p>
                            <strong>Dates:</strong>{" "}
                            {new Date(training.date_start).toLocaleDateString(
                              "fr-FR"
                            )}{" "}
                            -{" "}
                            {training.date_end
                              ? new Date(training.date_end).toLocaleDateString(
                                  "fr-FR"
                                )
                              : "En cours"}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="cvs">
                  <h4>Expériences Professionnelles</h4>
                  <ul>
                    {cv.professionals &&
                      cv.professionals.map((prof) => (
                        <li key={prof._id}>
                          <p>
                            <strong>Titre:</strong> {prof.title}
                          </p>
                          <p>
                            <strong>Poste :</strong> {prof.business}
                          </p>
                          <p>
                            <strong>Dates:</strong>{" "}
                            {new Date(prof.date_start).toLocaleDateString(
                              "fr-FR"
                            )}{" "}
                            -{" "}
                            {prof.date_end
                              ? new Date(prof.date_end).toLocaleDateString(
                                  "fr-FR"
                                )
                              : "En cours"}
                          </p>
                          <p>
                            <strong>Description:</strong> {prof.description}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="cvs">
                  <h4>Atouts</h4>
                  <ul>
                    {cv.skills &&
                      cv.skills.map((skill) => (
                        <li key={skill._id}>{skill.wording}</li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h4>Autres Informations</h4>
                  <ul>
                    {cv.otherInfos &&
                      cv.otherInfos.map((other) => (
                        <li key={other._id}>
                          <p>
                            <strong>Permis:</strong>{" "}
                            {other.permit ? "Oui" : "Non"}
                          </p>
                          <p>
                            <strong>Loisirs:</strong> {other.hobbies}
                          </p>
                          <p>
                            <strong>Langues:</strong> {other.languages}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleDelete(cv._id)}
                  className="cvs-btn"
                >
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVs;
