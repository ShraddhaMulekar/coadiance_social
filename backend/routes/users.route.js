import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { LogOutModel } from "../models/logOut.model.js";

const userRouter = express.Router();

let regexPass =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|]).{8,}$/;

// user register
userRouter.post("/register", async (req, res) => {
  let { name, email, pass } = req.body;
  if (!regexPass.test(pass)) {
    res.json({
      msg: "password length should be 8 char long it should be at least one digit, one letter and one special char required",
    });
  }
  try {
    const matchEmail = await UserModel.findOne({ email });
    if (matchEmail) {
      res.json({
        msg: "You have already register with same email. Please Log in Now!",
      });
    } else {
      bcrypt.hash(pass, Number(process.env.SALT_ROUNDS), async (err, hash) => {
        if (err) {
          res.json({ msg: "register again!", err });
        } else {
          let newUser = new UserModel({ name, email, pass: hash });
          await newUser.save();
          res.json({ msg: "register successfully!" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "error here..", error });
  }
});

// user log in
userRouter.post("/logIn", async (req, res) => {
  const { email, pass } = req.body;

  console.log("pass", pass, email);
  try {
    const matchUser = await UserModel.findOne({ email });
    console.log("matchUser", matchUser);
    if (!matchUser) {
      res.json({ msg: "user not found Please register first!" });
    } else {
      bcrypt.compare(pass, matchUser.pass, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: matchUser._id, user: matchUser.name },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );
          console.log(token);
          res.json({
            msg: "log in sucessful!",
            token,
            user: {
              _id: matchUser._id,
              name: matchUser.name,
            },
          });
        } else {
          console.log("Password is incorrect!!", err);
          res.json({ msg: "Password is incorrect!!", err });
        }
      });
    }
  } catch (error) {
    console.log("log in error", error);
    res.json({ msg: "log in error", error });
  }
});

//user log out
userRouter.post("/logOut", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.json({ msg: "please provide token!" });
    }
    // add token for black list
    const logOutToken = await LogOutModel.create({ token });
    res.json({ msg: "Log out successful!", logOutToken });
  } catch (error) {
    console.log(error, "log out error");
    res.json({ msg: "error in Log out function!", error });
  }
});

userRouter.get("/alluser", async (req, res) => {
  // let {name, email, pass, skills, role, createdAt} = req.body
  let users = await UserModel.find();
  res.json({ msg: "all users here..", users });
});

export default userRouter;
