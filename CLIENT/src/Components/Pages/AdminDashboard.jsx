import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      setIsAuthorized(false);
      navigate("/");
    } else {
      fetchMessages();
      fetchUsers();
    }
  }, [navigate]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non trouvé");
      }
      const response = await api.get("contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la récupération des messages."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non trouvé");
      }
      const response = await api.get("users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la récupération des utilisateurs."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `contact/${id}/mark-read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(
        messages.map((msg) => (msg._id === id ? { ...msg, statut: "lu" } : msg))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      setError("Erreur lors de la mise à jour du statut.");
    }
  };

  const handleValidateContact = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `contact/${id}/validate`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(
        messages.map((msg) =>
          msg._id === id ? { ...msg, statut: "validé" } : msg
        )
      );
    } catch (error) {
      console.error("Erreur lors de la validation du contact:", error);
      setError("Erreur lors de la validation du contact.");
    }
  };

  const handleRespond = async () => {
    if (!selectedContact) return;
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `contact/${selectedContact}/respond`,
        { response },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(
        messages.map((msg) =>
          msg._id === selectedContact ? { ...msg, response } : msg
        )
      );
      setResponse("");
      setSelectedContact(null);
    } catch (error) {
      console.error("Erreur lors de l’envoi de la réponse:", error);
      setError("Erreur lors de l’envoi de la réponse.");
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du message:", error);
      setError("Erreur lors de la suppression du message.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
      setMessages(messages.filter((msg) => msg.userId !== userId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      setError("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  if (!isAuthorized) {
    return (
      <p className="dashboard-error">
        Vous n'avez pas l'autorisation d'accéder à cette page.
      </p>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Admin</h1>
      {loading && (
        <p className="dashboard-loading">
          Chargement des messages et utilisateurs...
        </p>
      )}
      {error && <p className="dashboard-error">{error}</p>}
      {!loading && !error && (
        <div className="dashboard-content">
          <div className="dashboard-table-container">
            <h2 className="dashboard-subtitle">Liste des Utilisateurs</h2>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Date d'inscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="dashboard-btn"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Supprimer l'utilisateur
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-table-container">
            <h2 className="dashboard-subtitle">Liste des Messages</h2>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Réponse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id}>
                    <td>{new Date(msg.date).toLocaleDateString()}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message}</td>
                    <td>{msg.statut}</td>
                    <td>{msg.response}</td>
                    <td>
                      {msg.statut !== "lu" && (
                        <button
                          className="dashboard-btn"
                          onClick={() => handleMarkAsRead(msg._id)}
                        >
                          Marquer comme lu
                        </button>
                      )}
                      <button
                        className="dashboard-btn"
                        onClick={() => {
                          setSelectedContact(msg._id);
                          setResponse(msg.response || "");
                        }}
                      >
                        Répondre
                      </button>
                      {msg.statut !== "validé" && (
                        <button
                          className="dashboard-btn"
                          onClick={() => handleValidateContact(msg._id)}
                        >
                          Valider
                        </button>
                      )}
                      <button
                        className="dashboard-btn"
                        onClick={() => handleDeleteMessage(msg._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedContact && (
            <div className="dashboard-response-form">
              <h2>Note</h2>
              <textarea
                className="dashboard-textarea"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <button className="dashboard-btn" onClick={handleRespond}>
                Envoyer
              </button>
              <button
                className="dashboard-btn"
                onClick={() => setSelectedContact(null)}
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
