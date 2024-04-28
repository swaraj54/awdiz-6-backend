import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AllRoutes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Workoing..");
});

app.use("/api/v1", AllRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB connected.");
});

app.listen(3001, () => {
  console.log("Listening on port 3001.");
});
