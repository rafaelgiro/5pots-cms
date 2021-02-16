import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

export interface TokenI extends Document {
  _userId: string;
  token: string;
  createdAt: Date;
  passwordReset?: boolean;
}

const tokenSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
  passwordReset: { type: Boolean, default: false },
});

export default mongoose.model<TokenI>("tokens", tokenSchema);
