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
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    reset() {
      setTitle("");
      setBusiness("");
      setDateStart("");
      setDateEnd("");
      setDescription("");
      setProfessionals([]);
      setCurrentId(null);
      setErrors({});
    },
  }));

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/professionals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfessionals(response.data);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const titleRegex = /^.{3,30}$/; 
    const businessRegex = /^.{5,20}$/; 
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 

    // Validate title
    if (!title.match(titleRegex)) {
      newErrors.title = "Le titre doit contenir entre 3 et 30 caractères.";
    }

    // Validate business
    if (!business.match(businessRegex)) {
      newErrors.business = "Le poste doit contenir entre 5 et 20 caractères.";
    }

    // Validate date_start and date_end
    if (!dateStart.match(dateRegex)) {
      newErrors.dateStart = "La date de début doit être au format YYYY-MM-DD.";
    }

    if (!dateEnd.match(dateRegex)) {
      newErrors.dateEnd = "La date de fin doit être au format YYYY-MM-DD.";
    }

    // Ensure date_end is after date_start
    if (dateStart && dateEnd && new Date(dateEnd) <= new Date(dateStart)) {
      newErrors.dateEnd = "La date de fin doit être après la date de début.";
    }

    // Validate description
    if (description.length < 10 || description.length > 50) {
      newErrors.description =
        "La description doit contenir entre 10 et 50 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const token = localStorage.getItem("token");
      const newProfessional = {
        title,
        business,
        date_start: dateStart,
        date_end: dateEnd,
        description,
      };
      let response;
      if (title && business && dateStart && dateEnd) {
        if (currentId) {
          
          response = await axios.put(
            `http://localhost:5000/api/professionals/${currentId}`,
            newProfessional,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          
          const updatedProfessionals = professionals.map((prof) =>
            prof._id === response.data._id ? response.data : prof
          );
          setProfessionals(updatedProfessionals);
          setCurrentId(null); 
        } else {
          
          response = await axios.post(
            "http://localhost:5000/api/professionals",
            newProfessional,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          
          setProfessionals([...professionals, response.data]);

          
          if (onAddProfessional) {
            onAddProfessional(response.data);
          }
        }
      }

      
      setTitle("");
      setBusiness("");
      setDateStart("");
      setDateEnd("");
      setDescription("");
      setErrors({});
    } catch (error) {
      console.error("Error creating or updating professional:", error);
    }
  };

  const handleEditProfessional = (professional) => {
    
    setTitle(professional.title);
    setBusiness(professional.business);
    setDateStart(professional.date_start.split("T")[0]); 
    setDateEnd(
      professional.date_end ? professional.date_end.split("T")[0] : ""
    ); 
    setDescription(professional.description);
    setCurrentId(professional._id); 
    setErrors({});
  };

  const handleDeleteProfessional = async (professionalId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/professionals/${professionalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProfessionals = professionals.filter(
        (professional) => professional._id !== professionalId
      );
      setProfessionals(updatedProfessionals);
    } catch (error) {
      console.error("Error deleting professional:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Titre :</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Poste :</label>
          <input
            type="text"
            className="form-input"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          />
          {errors.business && <p className="form-error">{errors.business}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Début :</label>
          <input
            type="date"
            className="form-input"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          {errors.dateStart && <p className="form-error">{errors.dateStart}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Fin :</label>
          <input
            type="date"
            className="form-input"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
          {errors.dateEnd && <p className="form-error">{errors.dateEnd}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Description :</label>
          <input
            type="text"
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </div>

        <button type="submit" className="form-button form-button--primary">
          Ajouter / Modifier
        </button>
      </form>

      <ul className="form-list">
        <h2 className="form-title">Expériences Professionnelles</h2>
        {professionals.map((professional) => (
          <li key={professional._id} className="form-list-item">
            <strong>{professional.title}</strong> chez {professional.business}
            <br />
            {new Date(professional.date_start).toLocaleDateString()} -{" "}
            {professional.date_end
              ? new Date(professional.date_end).toLocaleDateString()
              : ""}
            <br />
            {professional.description}
            <div className="form-actions">
              <button
                className="form-button form-button--success"
                onClick={() => handleEditProfessional(professional)}
              >
                Modifier
              </button>
              <button
                className="form-button form-button--danger"
                onClick={() => handleDeleteProfessional(professional._id)}
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

export default ProfessionalsForm;
