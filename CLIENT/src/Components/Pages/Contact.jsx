import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!email.match(emailRegex)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    
    if (!message || message.length < 15) {
      newErrors.message = "Le message doit contenir au moins 15 caractères.";
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
      const newContact = {
        date: new Date(),
        email,
        message,
      };

      const response = await axios.post(
        "http://localhost:5000/api/contact",
        newContact
      );

      
      setSuccessMessage("Votre message a été envoyé avec succès.");

      
      setEmail("");
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div className="contact-container">
      <form onSubmit={handleSubmit}>
        <div className="form-email">
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-message">
          <label>Message :</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button type="submit" className="form-btn-contact">
          Envoyer
        </button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default ContactForm;
