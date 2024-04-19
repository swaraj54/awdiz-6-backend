import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./models/user.schema.js";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Workgin..");
});

app.get("/filter-users", async (req, res) => {
  try {
    const { age } = req.body;
    // const users = await UserSchema.find(); // return all documents
    // const users = await UserSchema.find({ name: "Rohit", email :"rohit@gmail.com" });
    // const users = await UserSchema.find({ age: 20 });
    // const users = await UserSchema.find({ age: { $eq: 30 } });
    // const users = await UserSchema.find({ age: { $ne: 30 } });
    // const users = await UserSchema.find({ age: { $gt: 20 } });
    // const users = await UserSchema.find({ age: { $gte: 20 } });
    // const users = await UserSchema.find({ age: { $lt: 20 } });
    // const users = await UserSchema.find({ age: { $lte: 20 } });
    // const users = await UserSchema.find({ age: { $in: [30, 40] } });
    // const users = await UserSchema.find({ age: { $nin: [30, 40] } });
    const users = await UserSchema.find({ contact: { $exists: true } });
    
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB connected.");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
