import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Home from "./Components/Pages/Home";
import Setting from "./Components/Pages/Setting";
import AdminDashboard from "./Components/Pages/AdminDashboard";
import Contact from "./Components/Pages/Contact";
import CVs from "./Components/Pages/Cvs";
import api from "./api/api";
import "./Styles/app.scss";

function App() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header"></header>
        <nav className="navigation">
          <div
            className={`burger-menu ${menuOpen ? "opened" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="nav-links">
            {!user ? (
              <>
                <Link to="/login" className="nav-link">
                  Se connecter
                </Link>
                <Link to="/register" className="nav-link">
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Accueil
                </Link>
                <Link to="/setting" className="nav-link">
                  Paramètres
                </Link>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
                <Link to="/cvs" className="nav-link">
                  Mes CV
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin/dashboard" className="nav-link">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="logout-btn">
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/register"
            element={
              !user ? (
                <Register handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !user ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/setting"
            element={user ? <Setting /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/cvs"
            element={user ? <CVs /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
