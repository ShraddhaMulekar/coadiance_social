import express from "express";
import ChatModel from "../models/chat.model.js";
import auth from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

// send a message
chatRouter.post("/sent", auth, async (req, res) => {
  try {
    const { userId, receiver, message } = req.body;

    if (!userId || !receiver || !message) {
      res.json({ msg: "All feilds are required" });
    }
    const newChat = new ChatModel({
      sender: userId,
      receiver,
      message,
    });
    await newChat.save();
    req.app.get("socketio").emit("receive message", newChat)
    res.json({ msg: "new chat send", newChat });
  } catch (error) {
    console.log("error in Chat Router", error);
    res.json({ msg: "error in Chat Router", error });
  }
});

chatRouter.get("/", async (req, res) => {
  try {
    const { userId, receiver } = req.query;
    if (!userId || !receiver) {
      res.json({ msg: "userId & receiver both required" });
    }
    let allChat = await ChatModel.find({
      $or: [
        { sender: userId, receiver: receiver },
        { receiver: receiver, receiver: userId },
      ],
    }).sort({ createdAt: 1 });
    console.log("your chat ", allChat);
    res.json({ msg: "your chat", allChat });
  } catch (error) {
    res.json({ msg: "error in chat get router", error });
  }
});

export default chatRouter;
