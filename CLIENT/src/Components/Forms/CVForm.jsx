import React, { useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import TrainingForm from "./TrainingForm";
import OtherInfosForm from "./OtherInfosForm";
import ProfessionalsForm from "./ProfessionalsForm";
import SkillsForm from "./SkillsForm";

const CVForm = () => {
  const [title, setTitle] = useState("Titre du CV");
  const [trainings, setTrainings] = useState([]);
  const [otherInfos, setOtherInfos] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [skills, setSkills] = useState([]);
  const [cvData, setCvData] = useState(null);

  const skillsFormRef = useRef(null);

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

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(title, 20, 20);

    doc.setFontSize(16);
    doc.text(`Name: ${cvData.firstName || "Nom non spécifié"}`, 20, 30);
    doc.text(`Email: ${cvData.email || "Email non spécifié"}`, 20, 40);

    if (cvData.trainings && cvData.trainings.length > 0) {
      doc.setFontSize(18);
      doc.text("Trainings:", 20, 50);
      cvData.trainings.forEach((training, index) => {
        doc.setFontSize(14);
        doc.text(`Diploma: ${training.diploma}`, 20, 60 + index * 30);
        doc.text(
          `Establishment: ${training.establishment}`,
          20,
          70 + index * 30
        );
        doc.text(`Start Date: ${training.date_start}`, 20, 80 + index * 30);
        doc.text(`End Date: ${training.date_end}`, 20, 90 + index * 30);
      });
    }

    if (cvData.otherInfos && cvData.otherInfos.length > 0) {
      doc.setFontSize(18);
      doc.text("Other Infos:", 20, 230);
      cvData.otherInfos.forEach((otherInfo, index) => {
        doc.setFontSize(14);
        doc.text(
          `Permit: ${otherInfo.permit ? "Yes" : "No"}`,
          20,
          240 + index * 30
        );
        doc.text(`Hobbies: ${otherInfo.hobbies}`, 20, 250 + index * 30);
        doc.text(`Languages: ${otherInfo.languages}`, 20, 260 + index * 30);
      });
    }

    if (cvData.professionals && cvData.professionals.length > 0) {
      doc.setFontSize(18);
      doc.text("Professionals:", 20, 120);
      cvData.professionals.forEach((professional, index) => {
        doc.setFontSize(14);
        doc.text(`Position: ${professional.title}`, 20, 130 + index * 30);
        doc.text(`Company: ${professional.business}`, 20, 140 + index * 30);
        doc.text(
          `Start Date: ${professional.date_start}`,
          20,
          150 + index * 30
        );
        doc.text(`End Date: ${professional.date_end}`, 20, 160 + index * 30);
        doc.text(
          `Description: ${professional.description}`,
          20,
          170 + index * 30
        );
      });
    }

    if (cvData.skills && cvData.skills.length > 0) {
      doc.setFontSize(18);
      doc.text("Skills:", 20, 280);
      cvData.skills.forEach((skill, index) => {
        doc.setFontSize(14);
        doc.text(`Skill: ${skill.wording}`, 20, 290 + index * 10);
      });
    }

    doc.save("cv.pdf");

    // Réinitialiser les états après la génération du PDF
    setTitle("Titre du CV");
    setTrainings([]);
    setOtherInfos([]);
    setProfessionals([]);
    setSkills([]);
    setCvData(null);

    if (skillsFormRef.current) {
      skillsFormRef.current.reset();
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

      <TrainingForm onAddTraining={addTraining} />
      <OtherInfosForm onAddOtherInfo={addOtherInfo} />
      <ProfessionalsForm onAddProfessional={addProfessional} />
      <SkillsForm ref={skillsFormRef} onAddSkill={addSkill} />

      <button onClick={handleSubmit}>Générer le CV complet</button>

      {cvData && (
        <button onClick={generatePDF}>Télécharger le CV en PDF</button>
      )}
    </div>
  );
};

export default CVForm;
