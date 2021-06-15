import mongoose from "mongoose";

const { Schema } = mongoose;

const championSchema = new Schema({
  championName: { type: String, required: true },
  goal: { type: String, required: false },
  title: { type: String, required: true },
  tags: { type: [{ type: String }], required: true },
  abilities: { type: {}, required: true },
});

export default mongoose.model("champions", championSchema);
