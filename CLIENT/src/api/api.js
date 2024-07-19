import axios from "axios";

// Création d'une instance Axios avec une baseURL spécifique
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ici, tu peux gérer les erreurs globales comme les erreurs de réseau ou les erreurs spécifiques de ton API
    console.error("Error from Axios interceptor:", error);
    throw error; // Assure que l'erreur est propagée pour être gérée à l'endroit où l'appel a été effectué
  }
);

// Exemple de fonction pour récupérer des données depuis l'API
export const fetchData = () => api.get("/data");

// Exemple de fonction pour authentifier un utilisateur
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Exemple de fonction pour enregistrer un nouvel utilisateur
export const registerUser = (userData) => api.post("/auth/register", userData);

// Exporter l'instance axios configurée et d'autres fonctions d'API au besoin
export default api;
