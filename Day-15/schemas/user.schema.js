import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // string -> productId
  wishlist: [String],
});

const UserSchema = model("User", userSchema);

export default UserSchema;
