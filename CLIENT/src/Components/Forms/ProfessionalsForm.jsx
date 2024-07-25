import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";

const ProfessionalsForm = forwardRef(({ onAddProfessional }, ref) => {
  const [title, setTitle] = useState("");
  const [business, setBusiness] = useState("");
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");
  const [description, setDescription] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setProfessionals([]);
      setTitle("");
      setBusiness("");
      setDate_start("");
      setDate_end("");
      setDescription("");
      setCurrentId(null);
    },
  }));

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/professionals"
      );
      setProfessionals(response.data);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const newProfessional = {
        title,
        business,
        date_start,
        date_end,
        description,
      };

      let response;
      if (title && business && date_start) {
        if (currentId) {
          // Update existing professional
          response = await axios.put(
            `http://localhost:5000/api/professionals/${currentId}`,
            newProfessional,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Update the professionals state with the updated professional
          const updatedProfessionals = professionals.map((prof) =>
            prof._id === response.data._id ? response.data : prof
          );
          setProfessionals(updatedProfessionals);
          setCurrentId(null); // Reset current ID after updating
        } else {
          // Add new professional
          response = await axios.post(
            "http://localhost:5000/api/professionals",
            newProfessional,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Add the new professional to the professionals state
          setProfessionals([...professionals, response.data]);

          // Call the onAddProfessional function to update the global state if needed
          if (onAddProfessional) {
            onAddProfessional(response.data);
          }
        }
      }

      setTitle("");
      setBusiness("");
      setDate_start("");
      setDate_end("");
      setDescription("");
    } catch (error) {
      console.error("Error creating or updating Professional:", error);
    }
  };

  const handleEditProfessional = (professional) => {
    // Fill the form with the information of the professional to edit
    setTitle(professional.title);
    setBusiness(professional.business);
    setDate_start(professional.date_start.split("T")[0]); // Ensure date format is correct
    setDate_end(
      professional.date_end ? professional.date_end.split("T")[0] : ""
    ); // Ensure date format is correct
    setDescription(professional.description);
    setCurrentId(professional._id); // Set the current ID to track the editing professional
  };

  const handleDeleteProfessional = async (professionalId) => {
    try {
      const token = localStorage.getItem("token");

      // Delete the professional with a DELETE request
      await axios.delete(
        `http://localhost:5000/api/professionals/${professionalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the professionals state by removing the deleted professional
      const updatedProfessionals = professionals.filter(
        (professional) => professional._id !== professionalId
      );
      setProfessionals(updatedProfessionals);
    } catch (error) {
      console.error("Error deleting Professional:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Poste :</label>
          <input
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          />
        </div>
        <div>
          <label>Début</label>
          <input
            type="date"
            value={date_start}
            onChange={(e) => setDate_start(e.target.value)}
          />
        </div>
        <div>
          <label>Fin</label>
          <input
            type="date"
            value={date_end}
            onChange={(e) => setDate_end(e.target.value)}
          />
        </div>
        <div>
          <label>Description du poste</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter / Modifier</button>
      </form>
      <ul>
        <h2>Expériences Professionelles</h2>
        {professionals.map((professional) => (
          <li key={professional._id}>
            <strong>{professional.title}</strong> chez {professional.business}
            <br />
            {professional.date_start.split("T")[0]} -{" "}
            {professional.date_end ? professional.date_end.split("T")[0] : ""}
            <br />
            {professional.description}
            <br />
            <button onClick={() => handleEditProfessional(professional)}>
              Modifier
            </button>
            <button onClick={() => handleDeleteProfessional(professional._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ProfessionalsForm;
