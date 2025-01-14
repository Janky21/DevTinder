import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  try {
    //console.log("Cookies:", req.cookies);
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj = jwt.verify(token, "DEV@Tinder$123");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found.");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

export default userAuth;
