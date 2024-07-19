// import CvGenereted from "../models/CvGenereted.js";
// import UserComplet from "../models/UserComplet.js";
// import UserDetails from "../models/UserDetails.js";
// import User from "../models/User.js";
// import { v4 as uuidv4 } from "uuid";

// /**
//  * Create a new generated CV.
//  *
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @returns {Object} - The created CV or an error message.
//  */
// export const createCVGenereted = async (req, res) => {
//   const { title, trainings } = req.body; // Récupérez les données de formation de la requête

//   const userId = req.user._id;
//   const cv_id = uuidv4(); // Générez un nouvel UUID pour cv_id

//   try {
//     const user = await User.findById(userId).select("firstname lastname email");

//     // Créez une nouvelle instance de CvGenereted
//     const newCV = new CvGenereted({
//       userId,
//       title,
//       firstName: user.firstname,
//       lastName: user.lastname,
//       email: user.email,
//       cv_id,
//     });

//     await newCV.save();

//     const trainingIds = trainings.map((training) => training._id);
//     newCV.trainings = trainingIds;
//     await newCV.save();

//     await newCV.populate(" trainings ");
//   } catch (error) {
//     // En cas d'erreur, répondre avec un statut 500 et un message d'erreur
//     res.status(500).json({ message: error.message });
//   }
// };
