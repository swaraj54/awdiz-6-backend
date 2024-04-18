import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./models/user.schema.js";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Working..");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age)
      return res
        .status(404)
        .json({ success: false, message: "All fields are requird." });

    const user = new UserSchema({
      name: name,
      email: email,
      password: password,
      age,
    });
    console.log(user, "user");
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Registeration Successfull." });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

app.post("/get-users", (req, res) => {
  try {
    //const users = UserSchem.find({age : {$eq  : 20}}) // mongoose official documentation
    // log(users)
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB connected.");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
