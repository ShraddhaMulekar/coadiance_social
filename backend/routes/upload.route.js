import express from "express";
import UploadModel from "../models/upload.model.js";
import multer from "multer";
import auth from "../middlewares/auth.middleware.js";

const uploadRouter = express.Router();

//multer storage config
const storage = multer.diskStorage({
  destination: "upload/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadMulter = multer({ storage });

uploadRouter.post("/", auth, uploadMulter.single("file"), async (req, res) => {
  try {
    const newUpload = new UploadModel({
      fileName: req.file.filename,
      filePath: `/upload/${req.file.fieldname}`,
      uploadedBy: req.body.userId,
    });
    await newUpload.save();
    res.json({ msg: "upload file successful!", newUpload });
  } catch (error) {
    res.json({ msg: "error in upload post router", error });
  }
});

uploadRouter.get("/", async (req, res) => {
  let alluploadfile = await UploadModel.find();
  res.json({ msg: "upload files", alluploadfile });
});

export default uploadRouter;
