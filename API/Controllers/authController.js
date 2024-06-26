import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema, loginSchema } from "../validation/userValidation.js";

export const register = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  // Valider les données avec le schéma Joi
  const { error } = userSchema.validate({
    firstname,
    lastname,
    email,
    password,
    role: "user",
  });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Vérifier si l'utilisateur existe déjà avec cet email
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email incorrect" });
    }

    // Validation du mot de passe avec regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre",
      });
    }
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await newUser.save();

    // Génération du token JWT avec la clé secrète
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Réponse avec le token JWT
    res.status(201).json({ token });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Valider les données avec le schéma Joi
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Mot de passe hashé:", user.password);
    console.log("mot de passe en clair:", password);
    console.log("Comparaison de mot de passe (isMatch) :", isMatch);
    if (!isMatch) {
      console.log("La comparaison de mot de passe a échoué.");
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token JWT avec la clé secrète
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Réponse avec le token JWT
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  // Vous pouvez ajouter une logique de déconnexion ici si nécessaire
  res.status(200).json({ message: "Déconnexion réussie" });
};
