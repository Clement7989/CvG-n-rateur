import CvGenereted from "../models/CvGenereted.js";
import OtherInfos from "../models/OtherInfos.js";
import Professionals from "../models/Professionals.js";
import Skills from "../models/Skills.js";
import Training from "../models/Training.js";
import UserComplet from "../models/UserComplet.js";
import UserDetails from "../models/UserDetails.js";
import User from "../models/User.js";

/**
 * Create a new generated CV.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created CV or an error message.
 */

export const createCVGenereted = async (req, res) => {
  const { title, cv_id } = req.body;
  const userId = req.user._id;

  try {
    const otherInfos = await OtherInfos.findOne({ cv_id });
    const professionals = await Professionals.find({ cv_id });
    const skills = await Skills.find({ cv_id });
    const trainings = await Training.find({ cv_id });
    const userDetails = await UserDetails.findOne({ cv_id });
    const user = await User.findById(userId).select("firstname lastname email");
    const userComplet = await UserComplet.findOne({ user_id: userId });

    const newCV = new CvGenereted({
      userId,
      title,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      otherInfos: otherInfos ? otherInfos._id : null,
      professionals: professionals.map((pro) => pro._id),
      skills: skills.map((skill) => skill._id),
      trainings: trainings.map((training) => training._id),
      userDetails: userDetails ? userDetails._id : null,
      userComplet: userComplet ? userComplet._id : null,
    });
    await newCV.save();

    await newCV.populate(
      "otherInfos professionals skills trainings userDetails userComplet"
    );

    res.status(201).json(newCV);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
