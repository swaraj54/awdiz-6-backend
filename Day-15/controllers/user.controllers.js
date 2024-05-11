import UserSchema from "../schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body.userData;
    if (!name || !email || !password || !confirmPassword || !role) {
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

    const newUser = new UserSchema({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();

    return res.json({ success: true, message: "Registeration Completed." });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
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

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Password is wrong.",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token, "token");
    // token -> cookie -> localStorage, cookies
    // userData  -> context -> context, redux
    // compare user password with stored password in db
    res.cookie("token", token);
    return res.json({
      success: true,
      message: "Login Successfull.",
      userData: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
};

export const validateToken = async (req, res) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found.",
      });
    }
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);
    if (!decodedData.id) {
      return res.json({
        success: false,
        message: "Token is expired.",
      });
    }

    const user = await UserSchema.findById(decodedData.id);

    // console.log(user);
    if (!user) {
      return res.json({
        success: false,
        message: "Token is not valid.",
      });
    }

    return res.json({ user, success: true });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
};
