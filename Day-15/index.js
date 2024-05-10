import express from "express";
import mongoose from "mongoose";
import dotnev from "dotenv";
import PorductSchema from "./schemas/product.schema.js";
import UserSchema from "./schemas/user.schema.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
var corsOptions = {
  origin: ["http://localhost:3000", "https://myntra.com"],
  credentials: true,
};
app.use(cors(corsOptions));
dotnev.config();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Working..");
});

app.post("/add-product", async (req, res) => {
  try {
    const { name, category, price, quantity, tags } = req.body.productData;
    const { userId } = req.body;
    if (!name || !category || !price || !quantity || !tags || !userId) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const newProduct = new PorductSchema({
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      tags: tags,
      user: userId,
    });
    await newProduct.save();
    return res.json({ success: true, message: "Product successfully stored." });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

app.post("/get-products-by-category-price", async (req, res) => {
  try {
    const { category, price } = req.body;
    const aggretaiton = [
      {
        // $match: { category: "electronics", price: { $gt: 30000 } },
        $match: { category: category, price: { $gt: price } },
      },
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
          totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ];
    const filteredProducts = await PorductSchema.aggregate(aggretaiton);
    console.log(filteredProducts, "filteredProducts");
    res.send(true);
  } catch (error) {
    return res.json({ success: false, error });
  }
});

app.post("/unwind-projecting", async (req, res) => {
  try {
    const aggreatation = [
      { $unwind: "$tags" },
      { $project: { name: 1, price: 1 } },
    ];
    const filteredProducts = await PorductSchema.aggregate(aggreatation);
    console.log(filteredProducts);
    res.send(true);
  } catch (error) {
    return res.json({ success: false, error });
  }
});

app.post("/get-products-by-user", async (req, res) => {
  try {
    const { userId } = req.body;
    const products = await PorductSchema.find({ user: userId }).populate(
      "user"
    );
    res.send(products);
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body.userData;
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
});

app.get("/get-products", async (req, res) => {
  try {
    const products = await PorductSchema.find({});
    return res.json({ success: true, products: products });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
});

app.post("/login", async (req, res) => {
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
      userData: user,
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
});
app.get("/validate-token", async (req, res) => {
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
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Db connected.");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
