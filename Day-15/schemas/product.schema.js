import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  tags: [String],
});

const PorductSchema = mongoose.model("Product", productSchema);

export default PorductSchema;
