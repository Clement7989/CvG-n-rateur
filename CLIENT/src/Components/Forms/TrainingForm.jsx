import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";

const TrainingForm = forwardRef(({ onAddTraining }, ref) => {
  const [diploma, setDiploma] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");
  const [trainings, setTrainings] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});

 
  useImperativeHandle(ref, () => ({
    reset() {
      setTrainings([]);
      setDiploma("");
      setEstablishment("");
      setDate_start("");
      setDate_end("");
      setCurrentId(null);
      setErrors({});
    },
  }));

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

  const validateForm = () => {
    const newErrors = {};
    const diplomaRegex = /^.{5,50}$/;
    const establishmentRegex = /^.{5,50}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!diploma.match(diplomaRegex)) {
      newErrors.diploma = "Le diplôme doit contenir entre 5 et 50 caractères.";
    }

    if (!establishment.match(establishmentRegex)) {
      newErrors.establishment =
        "L'établissement doit contenir entre 5 et 50 caractères.";
    }

    if (!date_start.match(dateRegex)) {
      newErrors.date_start = "La date de début doit être au format YYYY-MM-DD.";
    }

    if (!date_end.match(dateRegex)) {
      newErrors.date_end = "La date de fin doit être au format YYYY-MM-DD.";
    }

    if (date_start && date_end && new Date(date_end) <= new Date(date_start)) {
      newErrors.date_end = "La date de fin doit être après la date de début.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation errors:", errors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const newTraining = {
        diploma,
        establishment,
        date_start,
        date_end,
      };
      let response;
      if (currentId) {
        response = await axios.put(
          `http://localhost:5000/api/trainings/${currentId}`,
          newTraining,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTrainings(
          trainings.map((train) =>
            train._id === response.data._id ? response.data : train
          )
        );
        setCurrentId(null);
      } else {
        response = await axios.post(
          "http://localhost:5000/api/trainings",
          newTraining,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTrainings([...trainings, response.data]);
        if (onAddTraining) {
          onAddTraining(response.data);
        }
      }

      setDiploma("");
      setEstablishment("");
      setDate_start("");
      setDate_end("");
      setErrors({});
    } catch (error) {
      console.error("Error creating or updating training:", error);
    }
  };

  const handleEditTraining = (training) => {
    setDiploma(training.diploma);
    setEstablishment(training.establishment);
    setDate_start(training.date_start.split("T")[0]);
    setDate_end(training.date_end.split("T")[0]);
    setCurrentId(training._id);
    setErrors({});
  };

  const handleDeleteTraining = async (trainingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/trainings/${trainingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrainings(trainings.filter((training) => training._id !== trainingId));
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Diplôme:</label>
          <input
            type="text"
            className="form-input"
            value={diploma}
            onChange={(e) => setDiploma(e.target.value)}
          />
          {errors.diploma && <p className="form-error">{errors.diploma}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Établissement:</label>
          <input
            type="text"
            className="form-input"
            value={establishment}
            onChange={(e) => setEstablishment(e.target.value)}
          />
          {errors.establishment && (
            <p className="form-error">{errors.establishment}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Début:</label>
          <input
            type="date"
            className="form-input"
            value={date_start}
            onChange={(e) => setDate_start(e.target.value)}
          />
          {errors.date_start && (
            <p className="form-error">{errors.date_start}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Fin:</label>
          <input
            type="date"
            className="form-input"
            value={date_end}
            onChange={(e) => setDate_end(e.target.value)}
          />
          {errors.date_end && <p className="form-error">{errors.date_end}</p>}
        </div>

        <button type="submit" className="form-button form-button--primary">
          Ajouter ou modifier
        </button>
      </form>

      <ul className="form-list">
        <h2 className="form-title">Formations</h2>
        {trainings.map((training) => (
          <li key={training._id} className="form-list-item">
            <strong>{training.diploma}</strong> chez {training.establishment}
            <br />
            {new Date(training.date_start).toLocaleDateString()} -{" "}
            {new Date(training.date_end).toLocaleDateString()}
            <br />
            <div className="form-actions">
              <button
                className="form-button form-button--success"
                onClick={() => handleEditTraining(training)}
              >
                Modifier
              </button>
              <button
                className="form-button form-button--danger"
                onClick={() => handleDeleteTraining(training._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TrainingForm;
