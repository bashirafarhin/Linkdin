import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.send("Server is running");
});

export default app;
