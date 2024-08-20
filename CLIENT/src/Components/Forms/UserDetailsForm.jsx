import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";

const UserDetailsForm = forwardRef(({ onAddUserDetail }, ref) => {
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    reset() {
      setAddress("");
      setZipCode("");
      setCountry("");
      setUserDetails([]);
      setCurrentId(null);
      setErrors({});
    },
  }));

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/userdetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const addressRegex = /^.{3,60}$/;
    const zipCodeRegex = /^\d{2,5}$/;
    const countryRegex = /^.{1,15}$/;

    if (!address.match(addressRegex)) {
      newErrors.address = "L'adresse doit contenir entre 3 et 60 caractères.";
    }

    if (!zipCode.match(zipCodeRegex)) {
      newErrors.zipCode = "Le code postal doit contenir entre 2 et 5 chiffres.";
    }

    if (!country.match(countryRegex)) {
      newErrors.country = "Le pays doit contenir entre 1 et 15 caractères.";
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
      const newUserDetail = {
        address,
        zip_code: zipCode,
        country,
      };
      let response;
      if (address && zipCode && country) {
        if (currentId) {
          // Update existing user detail
          response = await axios.put(
            `http://localhost:5000/api/userdetails/${currentId}`,
            newUserDetail,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          
          const updatedUserDetails = userDetails.map((detail) =>
            detail._id === response.data._id ? response.data : detail
          );
          setUserDetails(updatedUserDetails);
          setCurrentId(null); 
        } else {
          
          response = await axios.post(
            "http://localhost:5000/api/userdetails",
            newUserDetail,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUserDetails([...userDetails, response.data]);

          if (onAddUserDetail) {
            onAddUserDetail(response.data);
          }
        }
      }

      setAddress("");
      setZipCode("");
      setCountry("");
      setErrors({});
    } catch (error) {
      console.error("Error creating or updating user detail:", error);
    }
  };

  const handleEditUserDetail = (userDetail) => {
    setAddress(userDetail.address);
    setZipCode(userDetail.zip_code);
    setCountry(userDetail.country);
    setCurrentId(userDetail._id);
    setErrors({});
  };

  const handleDeleteUserDetail = async (userDetailId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/userdetails/${userDetailId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUserDetails = userDetails.filter(
        (detail) => detail._id !== userDetailId
      );
      setUserDetails(updatedUserDetails);
    } catch (error) {
      console.error("Error deleting user detail:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Adresse :</label>
          <input
            type="text"
            className="form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <p className="form-error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Code Postal :</label>
          <input
            type="text"
            className="form-input"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          {errors.zipCode && <p className="form-error">{errors.zipCode}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Pays :</label>
          <input
            type="text"
            className="form-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {errors.country && <p className="form-error">{errors.country}</p>}
        </div>

        <button type="submit" className="form-button form-button--primary">
          Ajouter / Modifier
        </button>
      </form>

      <ul className="form-list">
        <h2 className="form-title">Détails Utilisateur</h2>
        {userDetails.map((detail) => (
          <li key={detail._id} className="form-list-item">
            <strong>Adresse:</strong> {detail.address} <br />
            <strong>Code Postal:</strong> {detail.zip_code} <br />
            <strong>Pays:</strong> {detail.country} <br />
            <div className="form-actions">
              <button
                className="form-button form-button--success"
                onClick={() => handleEditUserDetail(detail)}
              >
                Modifier
              </button>
              <button
                className="form-button form-button--danger"
                onClick={() => handleDeleteUserDetail(detail._id)}
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

export default UserDetailsForm;
