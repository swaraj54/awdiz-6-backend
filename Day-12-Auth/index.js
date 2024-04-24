import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AllRoutes from "./routes/index.js";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Workoing..");
});

app.use("/api/v1", AllRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB connected.");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
