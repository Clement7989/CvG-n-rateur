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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <img src="path/to/logo.png" alt="Logo" className="logo" />
        </header>
        <nav className="navigation">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link">
                Se connecter
              </Link>
              <Link to="/register" className="nav-link">
                S'inscrire
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/" className="nav-link">
                Accueil
              </Link>
              <Link to="/setting" className="nav-link">
                Paramètres
              </Link>

              <button onClick={handleLogout} className="logout-btn">
                Déconnexion
              </button>
            </>
          )}
        </nav>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/register"
            element={
              !isLoggedIn ? (
                <Register handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/setting"
            element={
              isLoggedIn ? <Setting /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
