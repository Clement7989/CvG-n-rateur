// src/Components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">MonSite</Link>
      </div>
      <button className="header__menu-toggle" onClick={toggleMenu}>
        <span className="header__menu-icon"></span>
        <span className="header__menu-icon"></span>
        <span className="header__menu-icon"></span>
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cvs">Mes CVs</Link>
          </li>
          <li>
            <Link to="/settings">Paramètres</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
