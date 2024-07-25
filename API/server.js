import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/api.routes.js";

// Import des routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cvGeneretedRoutes from "./routes/cvGenereted.routes.js";
import otherInfosRoutes from "./routes/otherInfos.routes.js";
import professionalsRoutes from "./routes/professionals.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import trainingRoutes from "./routes/training.routes.js";
import userCompletRoutes from "./routes/userComplet.routes.js";
import userDetailsRoutes from "./routes/userDetails.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cvGenereted", cvGeneretedRoutes);
app.use("/api/otherInfos", otherInfosRoutes);
app.use("/api/professionals", professionalsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/usercomplet", userCompletRoutes);
app.use("/api/userdetails", userDetailsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
