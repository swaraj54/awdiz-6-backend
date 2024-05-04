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
    const { name, category, price, quantity, tags } = req.body;
    if (!name || !category || !price || !quantity || !tags) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const newProduct = new PorductSchema({
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      tags: tags,
    });
    await newProduct.save();
    return res.json({ success: true, message: "Product successfully stored." });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

app.post("/get-products", async (req, res) => {
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

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Db connected.");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
