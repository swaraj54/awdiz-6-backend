import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
});

const UserSchema = mongoose.model("User", userSchema);

export default UserSchema;
