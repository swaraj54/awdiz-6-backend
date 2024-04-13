import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
});

const BlogSchema = mongoose.model("Blog", blogSchema);

export default BlogSchema;
