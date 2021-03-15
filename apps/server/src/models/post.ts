import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  blurb: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: "beep boop" },
  type: { type: String, required: true },
  url: { type: String, required: true },
  sections: { type: [], required: true },
  subTitles: { type: [{ type: String }], required: true },
  postedAt: { type: String, required: true, default: Date.now },
  slug: { type: String, required: true, unique: true },
  champions: { type: [] },
});

export default mongoose.model("posts", postSchema);
