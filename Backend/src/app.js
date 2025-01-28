import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";
import requestRouter from "./routes/requestRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection is successsfully established. ");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
