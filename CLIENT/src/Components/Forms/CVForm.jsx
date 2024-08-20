import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import TrainingForm from "./TrainingForm";
import OtherInfosForm from "./OtherInfosForm";
import ProfessionalsForm from "./ProfessionalsForm";
import SkillsForm from "./SkillsForm";
import UserDetailsForm from "./UserDetailsForm";
import UserCompletForm from "./UserCompletForm";

const CVForm = () => {
  const [title, setTitle] = useState("");
  const [trainings, setTrainings] = useState([]);
  const [otherInfos, setOtherInfos] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [userComplet, setUserComplet] = useState({});
  const [cvData, setCvData] = useState(null);

  const professionalsFormRef = useRef(null);
  const skillsFormRef = useRef(null);
  const userDetailsFormRef = useRef(null);
  const userCompletFormRef = useRef(null);
  const otherInfosFormRef = useRef(null);
  const trainingsFormRef = useRef(null);

  useEffect(() => {
    const fetchUserComplet = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/usercomplet",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.length > 0) {
          setUserComplet(response.data[response.data.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching user complet:", error);
      }
    };

    fetchUserComplet();
  }, []);

  const resetForm = () => {
    setTitle("");
    setTrainings([]);
    setOtherInfos([]);
    setProfessionals([]);
    setSkills([]);
    setUserDetails({});
    setUserComplet({});
    setCvData(null);

    if (skillsFormRef.current) {
      skillsFormRef.current.reset();
    }
    if (professionalsFormRef.current) {
      professionalsFormRef.current.reset();
    }
    if (userDetailsFormRef.current) {
      userDetailsFormRef.current.reset();
    }
    if (userCompletFormRef.current) {
      userCompletFormRef.current.reset();
    }
    if (otherInfosFormRef.current) {
      otherInfosFormRef.current.reset();
    }
    if (trainingsFormRef.current) {
      trainingsFormRef.current.reset();
    }
  };

  const addTraining = (trainingData) => {
    setTrainings((prev) => [...prev, trainingData]);
  };

  const addOtherInfo = (otherInfoData) => {
    setOtherInfos((prev) => [...prev, otherInfoData]);
  };

  const addProfessional = (professionalData) => {
    setProfessionals((prev) => [...prev, professionalData]);
  };

  const addSkill = (skillData) => {
    setSkills((prev) => [...prev, skillData]);
  };

  const addUserDetail = (userDetailData) => {
    setUserDetails(userDetailData);
  };

  const addUserComplet = (userCompletData) => {
    setUserComplet(userCompletData);
  };

  const generatePDF = () => {
    if (!cvData) {
      console.error("CV data is missing.");
      return;
    }

    const doc = new jsPDF();
    console.log("Generating PDF with data:", cvData);

    // En-tête : Informations personnelles
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text(`${cvData?.firstname || ""} ${cvData?.lastname || ""}`, 180, 20, {
      align: "right",
    });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

    doc.text(`${userDetails.address || "Adresse non spécifiée"}`, 180, 30, {
      align: "right",
    });
    doc.text(
      `Code Postal: ${userDetails.zip_code || "Code postal non spécifié"}`,
      180,
      40,
      {
        align: "right",
      }
    );
    doc.text(`Pays: ${userDetails.country || "Pays non spécifié"}`, 180, 50, {
      align: "right",
    });

    doc.text(`Email: ${cvData?.email || "Email non spécifié"}`, 180, 60, {
      align: "right",
    });
    doc.text(`Téléphone: ${userComplet?.phone || "Non spécifié"}`, 180, 70, {
      align: "right",
    });
    doc.text(
      `Date de Naissance: ${
        userComplet?.birthday
          ? new Date(userComplet.birthday).toLocaleDateString()
          : "Non spécifiée"
      }`,
      180,
      80,
      { align: "right" }
    );

    // Section : Expérience Professionnelle
    let yOffset = 100;
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Expérience Professionnelle", 20, yOffset);

    yOffset += 10;
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    professionals.forEach((prof) => {
      doc.text(`${prof.title || "Titre non spécifié"}`, 20, yOffset);
      yOffset += 8;
      doc.text(
        `${prof.business || "Entreprise non spécifiée"} - ${
          prof.date_start
            ? new Date(prof.date_start).toLocaleDateString()
            : "Date de début non spécifiée"
        } à ${
          prof.date_end ? new Date(prof.date_end).toLocaleDateString() : ""
        }`,
        20,
        yOffset
      );
      yOffset += 8;
      doc.text(
        `${prof.description || "Description non spécifiée"}`,
        20,
        yOffset
      );
      yOffset += 12;
    });

    // Section : Compétences
    yOffset += 10;
    doc.setFont("Helvetica", "bold");
    doc.text("Compétences", 20, yOffset);
    yOffset += 10;
    doc.setFont("Helvetica", "normal");
    skills.forEach((skill) => {
      doc.text(`- ${skill.wording || "Compétence non spécifiée"}`, 20, yOffset);
      yOffset += 8;
    });

    // Section : Formation
    yOffset += 10;
    doc.setFont("Helvetica", "bold");
    doc.text("Formation", 20, yOffset);
    yOffset += 10;
    doc.setFont("Helvetica", "normal");
    trainings.forEach((training) => {
      doc.text(`${training.diploma || "Diplôme non spécifié"}`, 20, yOffset);
      yOffset += 8;
      doc.text(
        `${training.establishment || "École non spécifiée"} - ${
          training.date_start
            ? new Date(training.date_start).getFullYear()
            : "Année non spécifiée"
        } à ${
          training.date_end
            ? new Date(training.date_end).getFullYear()
            : "Non spécifiée"
        }`,
        20,
        yOffset
      );
      yOffset += 12;
    });

    // Section : Informations Complémentaires
    yOffset += 10;
    doc.setFont("Helvetica", "bold");
    doc.text("Informations Complémentaires", 20, yOffset);

    yOffset += 10;
    doc.setFont("Helvetica", "normal");
    otherInfos.forEach((info) => {
      doc.text(`Permis: ${info.permit ? "Oui" : "Non"}`, 20, yOffset);
      yOffset += 8;
      doc.text(`Hobbies: ${info.hobbies || "Non spécifiés"}`, 20, yOffset);
      yOffset += 8;
      doc.text(`Langues: ${info.languages || "Non spécifiées"}`, 20, yOffset);
      yOffset += 12;
    });

    // Save the PDF
    doc.save("cv.pdf");

    // Réinitialiser les états après la génération du PDF
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/cvGenereted",
        {
          title,
          trainings,
          otherInfos,
          professionals,
          skills,
          userDetails,
          userComplet,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCvData(response.data);
    } catch (error) {
      console.error("Error creating CV:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre du CV - important"
        className="btn-title-cv"
      />

      <TrainingForm ref={trainingsFormRef} onAddTraining={addTraining} />
      <OtherInfosForm ref={otherInfosFormRef} onAddOtherInfo={addOtherInfo} />
      <ProfessionalsForm
        ref={professionalsFormRef}
        onAddProfessional={addProfessional}
      />
      <SkillsForm ref={skillsFormRef} onAddSkill={addSkill} />
      <UserDetailsForm
        ref={userDetailsFormRef}
        onAddUserDetail={addUserDetail}
      />
      <UserCompletForm
        ref={userCompletFormRef}
        onAddUserComplet={addUserComplet}
      />

      <button className="btn-genered-cv" onClick={handleSubmit}>
        Générer le CV complet
      </button>

      {cvData && (
        <button className="btn-download-cv" onClick={generatePDF}>
          Télécharger le CV en PDF
        </button>
      )}
    </div>
  );
};

export default CVForm;
