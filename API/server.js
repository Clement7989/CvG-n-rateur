import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// import authRoutes from './routes/authRoutes.js';
// import userCompletRoutes from './routes/userCompletRoutes.js';
// import userDetailsRoutes from './routes/userDetailsRoutes.js';
// import cvGeneratedRoutes from './routes/cvGeneratedRoutes.js';
// import otherInfosRoutes from './routes/otherInfosRoutes.js';
// import trainingRoutes from './routes/trainingRoutes.js';
// import professionalsRoutes from './routes/professionalsRoutes.js';
// import skillsRoutes from './routes/skillsRoutes.js';
// import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/usersComplet', userCompletRoutes);
// app.use('/api/userDetails', userDetailsRoutes);
// app.use('/api/cvGenerated', cvGeneratedRoutes);
// app.use('/api/otherInfos', otherInfosRoutes);
// app.use('/api/training', trainingRoutes);
// app.use('/api/professionals', professionalsRoutes);
// app.use('/api/skills', skillsRoutes);
// app.use('/api/contact', contactRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
