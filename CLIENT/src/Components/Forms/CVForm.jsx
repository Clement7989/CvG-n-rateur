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
  const [title, setTitle] = useState("Titre du CV");
  const [trainings, setTrainings] = useState([]);
  const [otherInfos, setOtherInfos] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userComplet, setUserComplet] = useState(null);
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
        const response = await axios.get(
          "http://localhost:5000/api/usercomplet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          setUserComplet(response.data[response.data.length - 1]); // Dernière entrée
        }
      } catch (error) {
        console.error("Error fetching user complet:", error);
      }
    };

    fetchUserComplet();
  }, []);
  const addTraining = (trainingData) => {
    setTrainings([...trainings, trainingData]);
  };

  const addOtherInfo = (otherInfoData) => {
    setOtherInfos([...otherInfos, otherInfoData]);
  };

  const addProfessional = (professionalData) => {
    setProfessionals([...professionals, professionalData]);
  };

  const addSkill = (skillData) => {
    setSkills([...skills, skillData]);
  };

  const addUserDetail = (userDetailData) => {
    setUserDetails([...userDetails, userDetailData]);
  };

  const addUserComplet = (userCompletData) => {
    setUserComplet(userCompletData);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Titre du CV
    doc.setFontSize(24);
    doc.setFont("Arial", "bold");
    doc.text(title, 20, 20);

    // Espacement pour la section suivante
    let yOffset = 40;

    // Informations personnelles
    doc.setFontSize(16);
    doc.setFont("Arial", "bold");
    doc.text("Personal Information", 20, yOffset);

    doc.setFontSize(14);
    doc.setFont("Arial", "normal");
    yOffset += 10;
    doc.text(
      `Name: ${cvData.firstName || "Nom non spécifié"} ${
        cvData.lastName || ""
      }`,
      20,
      yOffset
    );
    yOffset += 10;
    doc.text(`Email: ${cvData.email || "Email non spécifié"}`, 20, yOffset);
    yOffset += 10;

    if (userComplet) {
      doc.text(
        `Date de Naissance: ${
          userComplet.birthday
            ? new Date(userComplet.birthday).toLocaleDateString()
            : "Non spécifiée"
        }`,
        20,
        yOffset
      );
      yOffset += 10;
      doc.text(`Genre: ${userComplet.gender || "Non spécifié"}`, 20, yOffset);
      yOffset += 10;
      doc.text(
        `Téléphone: ${userComplet.phone || "Non spécifié"}`,
        20,
        yOffset
      );
      yOffset += 20;
    }

    // Trainings
    if (cvData.trainings && cvData.trainings.length > 0) {
      doc.setFontSize(16);
      doc.setFont("Arial", "bold");
      doc.text("Trainings", 20, yOffset);
      yOffset += 10;

      doc.setFontSize(14);
      doc.setFont("Arial", "normal");
      cvData.trainings.forEach((training, index) => {
        doc.text(`Diploma: ${training.diploma}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Establishment: ${training.establishment}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Start Date: ${training.date_start}`, 20, yOffset);
        yOffset += 10;
        doc.text(`End Date: ${training.date_end}`, 20, yOffset);
        yOffset += 20; // Espacement entre les formations
      });
    }

    // Other Infos
    if (cvData.otherInfos && cvData.otherInfos.length > 0) {
      doc.setFontSize(16);
      doc.setFont("Arial", "bold");
      doc.text("Other Infos", 20, yOffset);
      yOffset += 10;

      doc.setFontSize(14);
      doc.setFont("Arial", "normal");
      cvData.otherInfos.forEach((otherInfo, index) => {
        doc.text(`Permit: ${otherInfo.permit ? "Yes" : "No"}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Hobbies: ${otherInfo.hobbies}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Languages: ${otherInfo.languages}`, 20, yOffset);
        yOffset += 20; // Espacement entre les autres infos
      });
    }

    // Professionals
    if (cvData.professionals && cvData.professionals.length > 0) {
      doc.setFontSize(16);
      doc.setFont("Arial", "bold");
      doc.text("Professionals", 20, yOffset);
      yOffset += 10;

      doc.setFontSize(14);
      doc.setFont("Arial", "normal");
      cvData.professionals.forEach((professional, index) => {
        doc.text(`Position: ${professional.title}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Company: ${professional.business}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Start Date: ${professional.date_start}`, 20, yOffset);
        yOffset += 10;
        doc.text(`End Date: ${professional.date_end}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Description: ${professional.description}`, 20, yOffset);
        yOffset += 20; // Espacement entre les expériences professionnelles
      });
    }

    // Skills
    if (cvData.skills && cvData.skills.length > 0) {
      doc.setFontSize(16);
      doc.setFont("Arial", "bold");
      doc.text("Skills", 20, yOffset);
      yOffset += 10;

      doc.setFontSize(14);
      doc.setFont("Arial", "normal");
      cvData.skills.forEach((skill, index) => {
        doc.text(`Skill: ${skill.wording}`, 20, yOffset);
        yOffset += 10;
      });
      yOffset += 20; // Espacement après les compétences
    }

    // User Details
    if (cvData.userDetails && cvData.userDetails.length > 0) {
      doc.setFontSize(16);
      doc.setFont("Arial", "bold");
      doc.text("User Details", 20, yOffset);
      yOffset += 10;

      doc.setFontSize(14);
      doc.setFont("Arial", "normal");
      cvData.userDetails.forEach((userDetail, index) => {
        doc.text(`Address: ${userDetail.address}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Zip Code: ${userDetail.zip_code}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Country: ${userDetail.country}`, 20, yOffset);
        yOffset += 20; // Espacement après les détails personnels
      });
    }

    doc.save("cv.pdf");

    // Réinitialiser les états après la génération du PDF
    setTitle("Titre du CV");
    setTrainings([]);
    setOtherInfos([]);
    setProfessionals([]);
    setSkills([]);
    setUserDetails([]);
    setUserComplet(null);
    setCvData(null);

    if (skillsFormRef.current) {
      skillsFormRef.current.reset();
    }

    if (professionalsFormRef.current) {
      professionalsFormRef.current.reset();
    }
    if (userCompletFormRef.current) {
      userCompletFormRef.current.reset();
    }

    if (userDetailsFormRef.current) {
      userDetailsFormRef.current.reset();
    }

    if (otherInfosFormRef.current) {
      otherInfosFormRef.current.reset();
    }

    if (trainingsFormRef.current) {
      trainingsFormRef.current.reset();
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CV created:", response.data);
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
        placeholder="Titre du CV"
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
        onAddUserComplet={addUserComplet} // Passer la fonction
      />
      <button onClick={handleSubmit}>Générer le CV complet</button>

      {cvData && (
        <button onClick={generatePDF}>Télécharger le CV en PDF</button>
      )}
    </div>
  );
};

export default CVForm;
