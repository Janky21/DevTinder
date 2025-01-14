import Router from "express";
import validateSignUpData from "../utils/validation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Validating the user inputs
    validateSignUpData(req);

    //Encrypting the paasword
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //console.log(passwordHash);

    // Creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //Creat a JWT token

      const token = await user.getJWT();

      //Add the token to cookie and send the response back to user.
      res.cookie("token", token, {
        expires: new Data(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: true, // Required for SameSite=None
        sameSite: "None", // Allows cross-site cookies
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out successfully");
});

export default authRouter;
