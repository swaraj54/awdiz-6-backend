import UserSchema from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.json({ success: false, message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confirm is not matched.",
      });
    }

    const isEmailExists = await UserSchema.findOne({ email: email });
    // console.log(isEmailExists, "isEmailExists");
    if (isEmailExists) {
      return res.json({
        success: false,
        message: "Email is alreadly exist, Please use another one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1st type to store data in mongodb
    // const newUser = await UserSchema.create({
    //   name: name,
    //   email: email,
    //   password: hashedPassword,
    // });

    // 2nd type to store data in mongodb
    const newUser = new UserSchema({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({ success: true, message: "Registeration Completed." });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required." });
    }

    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not exist, Please check your email.",
      });
    }

    // console.log(user, "user");

    // compare user password with stored password in db

    res.send("Login");
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
};
