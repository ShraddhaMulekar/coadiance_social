import express from "express";
import { dbconnect } from "./dbConfing.js";
// import { UserModel } from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/users.route.js";
import postRouter from "./routes/post.route.js";
import chatRouter from "./routes/chat.route.js";
import uploadRouter from "./routes/upload.route.js";
import { Server } from "socket.io";
import http from "http"
import cors from "cors";

const Port = process.env.PORT || 5000;
let app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/chat", chatRouter);
app.use("/upload", uploadRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log("socket info : ", socket)
  console.log(`user is connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`user Id: ${socket.id}, join room Id : ${data}`);
  });

  socket.on("send_message", (data)=>{
    console.log(data)
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected : ${socket.id}`);
  });
});

server.listen(Port, async () => {
  await dbconnect();
  console.log(`Server is running on http://localhost:${Port}`);
});
