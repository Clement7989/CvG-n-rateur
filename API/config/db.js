import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://clementfevre79:${process.env.MONGO_URL}@cluster0.1gqrlbq.mongodb.net/MaBaseDeDonnées`
    );
    console.log("Connexion MongoDB réussie");
  } catch (err) {
    console.error("Connexion MongoDB refusée :", err);
  }
}
