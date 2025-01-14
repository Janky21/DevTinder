import Router from "express";
import userAuth from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import {
  validateEditProfileData,
  validatePassword,
} from "../utils/validation.js";

const profileRouter = Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile was updated sucessfully `,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// profileRouter.patch("/profile/password", userAuth, async (req, res) => {
//   try {
//     if (!validatePassword(req)) {
//       throw new Error("Invalid edit request");
//     }

//     const currentUser = req.user;
//     const currentPassword = currentUser.password;
//     console.log(currentPassword);

//     const isPasswordValid = await bcrypt.compare(
//       currentPassword,
//       req.body
//     );
//     if (!isPasswordValid) {
//       throw new Error("Password in incorrect");
//     }

//     res.send("passssss");
//   } catch (error) {
//     res.status(400).send("ERROR : " + error.message);
//   }
// });

export default profileRouter;
