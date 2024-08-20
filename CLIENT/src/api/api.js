import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error from Axios interceptor:", error);
    throw error;
  }
);

export const fetchData = () => api.get("/data");

export const loginUser = (credentials) => api.post("/auth/login", credentials);

export const registerUser = (userData) => api.post("/auth/register", userData);

export default api;
