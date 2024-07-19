import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainingForm = ({ onAddTraining }) => {
  const [diploma, setDiploma] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");
  const [trainings, setTrainings] = useState([]);
  const [currentId, setCurrentId] = useState(null); // State to track the current editing training ID

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/trainings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrainings(response.data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newTraining = {
        diploma,
        establishment,
        date_start,
        date_end,
      };
      let response;
      if (diploma && establishment && date_start && date_end) {
        if (currentId) {
          // Update existing training
          response = await axios.put(
            `http://localhost:5000/api/trainings/${currentId}`,
            newTraining,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Update the trainings state with the updated training
          const updatedTrainings = trainings.map((train) =>
            train._id === response.data._id ? response.data : train
          );
          setTrainings(updatedTrainings);
          setCurrentId(null); // Reset current ID after updating
        } else {
          // Add new training
          response = await axios.post(
            "http://localhost:5000/api/trainings",
            newTraining,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Add the new training to the trainings state
          setTrainings([...trainings, response.data]);

          // Call the onAddTraining function to update the global state if needed
          if (onAddTraining) {
            onAddTraining(response.data);
          }
        }
      }

      // Reset form fields after adding or updating
      setDiploma("");
      setEstablishment("");
      setDate_start("");
      setDate_end("");
    } catch (error) {
      console.error("Error creating or updating training:", error);
    }
  };

  const handleEditTraining = (training) => {
    // Fill the form with the information of the training to edit
    setDiploma(training.diploma);
    setEstablishment(training.establishment);
    setDate_start(training.date_start.split("T")[0]); // Ensure date format is correct
    setDate_end(training.date_end.split("T")[0]); // Ensure date format is correct
    setCurrentId(training._id); // Set the current ID to track the editing training
  };

  const handleDeleteTraining = async (trainingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/trainings/${trainingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTrainings = trainings.filter(
        (training) => training._id !== trainingId
      );
      setTrainings(updatedTrainings);
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Diplome : </label>
          <input
            type="text"
            value={diploma}
            onChange={(e) => setDiploma(e.target.value)}
          />
        </div>
        <div>
          <label> Etablissement : </label>
          <input
            type="text"
            value={establishment}
            onChange={(e) => setEstablishment(e.target.value)}
          />
        </div>
        <div>
          <label> Début : </label>
          <input
            type="date"
            value={date_start}
            onChange={(e) => setDate_start(e.target.value)}
          />
        </div>
        <div>
          <label>Fin : </label>
          <input
            type="date"
            value={date_end}
            onChange={(e) => setDate_end(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter ou modifier </button>
      </form>

      <ul>
        <h2>Formations</h2>
        {trainings.map((training) => (
          <li key={training._id}>
            <strong>{training.diploma}</strong> chez {training.establishment}{" "}
            <br />
            {training.date_start.split("T")[0]} -{" "}
            {training.date_end.split("T")[0]} <br />
            <button onClick={() => handleEditTraining(training)}>
              Modifier
            </button>
            <button onClick={() => handleDeleteTraining(training._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingForm;
