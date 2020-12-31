const mongoose = require("mongoose");

const { Schema } = mongoose;

const championSchema = new Schema({
  championName: { type: String, required: true },
  goal: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: [{ type: String }], required: true },
  abilities: { type: {}, required: true },
});

mongoose.model("champions", championSchema);
