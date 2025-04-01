import { LogOutModel } from "../models/logOut.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let auth = async (req, res, next) => {
  try {
    // check token is created or not
    const token = req.headers.authorization?.split(" ")[1];
    console.log('token auth recd', token)
    if (!token) {
      res.json({ msg: "please log in first!" });
    }

    // check user is log out or log in
    const logOutToken = await LogOutModel.findOne({ token });
    if (logOutToken) {
      res.json({ msg: "user is log out! please Log in first!" });
    }

    // verify token
    const decoaded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoaded", decoaded);

    req.userId = decoaded.userId;

    next();
    
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token has expired. Please log in again." });
    }

    return res.status(500).json({ msg: "Error in auth middleware", error });
  }
};

export default auth;
