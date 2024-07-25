import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const UserDetailsForm = forwardRef(({ onAddUserDetail }, ref) => {
  const [address, setAddress] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [country, setCountry] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setUserDetails([]);
      setAddress("");
      setZip_code("");
      setCountry("");
      setCurrentId(null);
    },
  }));

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/userdetails");
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching User Details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newUserDetail = {
        address,
        zip_code,
        country,
      };
      let response;
      if (address && zip_code && country) {
        if (currentId) {
          response = await axios.put(
            `http://localhost:5000/api/userdetails/${currentId}`,
            newUserDetail,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const updateUserDetails = userDetails.map((detail) =>
            detail._id === response.data._id ? response.data : detail
          );
          setUserDetails(updateUserDetails);
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
      setZip_code("");
      setCountry("");
    } catch (error) {
      console.error("Error creating or updating User Detail:", error);
    }
  };

  const handleEditUserDetail = (userDetail) => {
    setAddress(userDetail.address);
    setZip_code(userDetail.zip_code);
    setCountry(userDetail.country);
    setCurrentId(userDetail._id);
  };

  const handleDeleteUserDetail = async (userDetailId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/userdetails/${userDetailId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updateUserDetails = userDetails.filter(
        (userDetail) => userDetail._id !== userDetailId
      );
      setUserDetails(updateUserDetails);
    } catch (error) {
      console.error("Error deleting User Detail:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Adresse</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Code Postale</label>
          <input
            type="text"
            value={zip_code}
            onChange={(e) => setZip_code(e.target.value)}
          />
        </div>
        <div>
          <label>Pays</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit">Ajoutez / Modifier</button>
      </form>
      <ul>
        <h2>Détails Personnels</h2>
        {userDetails.map((userDetail) => (
          <li key={userDetail._id}>
            {userDetail.address}
            <br />
            {userDetail.zip_code}
            <br />
            {userDetail.country}
            <button onClick={() => handleEditUserDetail(userDetail)}>
              Modifier
            </button>
            <button onClick={() => handleDeleteUserDetail(userDetail._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default UserDetailsForm;
