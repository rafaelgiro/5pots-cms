const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  blurb: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: "beep boop" },
  url: { type: String, required: true },
  sections: { type: [{ type: String }], required: true },
  postedAt: { type: String, required: true, default: Date.now },
});

mongoose.model("posts", postSchema);
