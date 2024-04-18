import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

const UserSchema = mongoose.model("User", userSchema);

export default UserSchema;

// /awdiz-6 -> /User - > {name : "", email :""} ,{name :"", email :""}
//             /Payment
//             /admin
//             /products
