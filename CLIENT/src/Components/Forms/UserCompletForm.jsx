import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";

const UserCompletForm = forwardRef(({ onAddUserComplet }, ref) => {
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [userComplet, setUserComplet] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setBirthday("");
      setGender("");
      setPhone("");
      setCurrentId(null);
    },
  }));

  useEffect(() => {
    fetchUserComplet();
  }, []);

  const fetchUserComplet = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/usercomplet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserComplet(response.data);
    } catch (error) {
      console.error("Error fetching user complet:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newUserComplet = {
        birthday,
        gender,
        phone,
      };
      let response;
      if (birthday && gender && phone) {
        if (currentId) {
          // Update existing UserComplet
          response = await axios.put(
            `http://localhost:5000/api/usercomplet/${currentId}`,
            newUserComplet,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Update the userComplet state with the updated data
          const updatedUserComplet = userComplet.map((item) =>
            item._id === response.data._id ? response.data : item
          );
          setUserComplet(updatedUserComplet);
          setCurrentId(null); // Reset current ID after updating
        } else {
          // Add new UserComplet
          response = await axios.post(
            "http://localhost:5000/api/usercomplet",
            newUserComplet,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Add the new UserComplet to the state
          setUserComplet([...userComplet, response.data]);

          // Call the onAddUserComplet function if needed
          if (onAddUserComplet) {
            onAddUserComplet(response.data);
          }
        }
      }

      // Reset form fields after adding or updating
      setBirthday("");
      setGender("");
      setPhone("");
    } catch (error) {
      console.error("Error creating or updating user complet:", error);
    }
  };

  const handleEditUserComplet = (user) => {
    setBirthday(user.birthday || ""); // Ensure default empty string
    setGender(user.gender || ""); // Ensure default empty string
    setPhone(user.phone || ""); // Ensure default empty string
    setCurrentId(user._id); // Set the current ID to track the editing user
  };

  const handleDeleteUserComplet = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/usercomplet/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUserComplet = userComplet.filter(
        (user) => user._id !== userId
      );
      setUserComplet(updatedUserComplet);
    } catch (error) {
      console.error("Error deleting user complet:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Date de Naissance : </label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div>
          <label> Genre : </label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div>
          <label> Téléphone : </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter ou modifier</button>
      </form>

      <ul>
        <h2>Utilisateurs Complets</h2>
        {userComplet.map((user) => (
          <li key={user._id}>
            <strong>Date de Naissance : {user.birthday.split("T")[0]}</strong>
            <br />
            Genre : {user.gender}
            <br />
            Téléphone : {user.phone}
            <br />
            <button onClick={() => handleEditUserComplet(user)}>
              Modifier
            </button>
            <button onClick={() => handleDeleteUserComplet(user._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default UserCompletForm;
