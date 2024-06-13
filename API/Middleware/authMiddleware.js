import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Pas de token , authorisation refusée" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token non validé" });
  }
};

export const adminMiddlware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès refusée" });
  }
};
