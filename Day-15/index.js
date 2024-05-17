import express from "express";
import mongoose from "mongoose";
import dotnev from "dotenv";
import PorductSchema from "./schemas/product.schema.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import AllRoutes from "./routes/index.js";

const app = express();
var corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://myntra.com",
    "https://awdiz-6-react.vercel.app",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
dotnev.config();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Working..");
});

app.use("/api/v1", AllRoutes);

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
