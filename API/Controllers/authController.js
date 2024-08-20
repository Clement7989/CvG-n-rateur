import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema, loginSchema } from "../validation/userValidation.js";

/**
 * Register a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */
export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

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
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email incorrect" });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Authenticate a user and log them in.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with JWT token.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validation des données d'entrée
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Répondre avec le token et les informations utilisateur
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Log out the user.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating successful logout.
 */
// Middleware de déconnexion
// authController.js
export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Déconnexion réussie" });
};

/**
 * Get the current user based on the provided JWT token.
 * @param {Object} req - Express request object containing the token in headers.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with user information.
 */
