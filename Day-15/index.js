import express from "express";
import mongoose from "mongoose";
import dotnev from "dotenv";
import PorductSchema from "./schemas/product.schema.js";

const app = express();
dotnev.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working..");
});

app.post("/add-product", async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price || !quantity) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const newProduct = new PorductSchema({
      name: name,
      category: category,
      price: price,
      quantity: quantity,
    });
    await newProduct.save();
    return res.json({ success: true, error: "Product successfully stored." });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Db connected.");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
