import mongoose from "mongoose";

const { Schema } = mongoose;

const tokenSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
  passwordReset: { type: Boolean, default: false },
});

mongoose.model("tokens", tokenSchema);
