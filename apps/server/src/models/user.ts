import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

export interface UserI extends Document {
  _id: string;
  username: string;
  displayName: string;
  email?: string;
  hash: string;
  salt: string;
  isAdmin: boolean;
  isVerified: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  facebookID?: string;
  googleID?: string;
  posts?: [{ type: string; ref: string }];
}

const userSchema = new Schema({
  username: { type: String },
  displayName: String,
  email: String,
  hash: String,
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  facebookID: String,
  googleID: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

export default mongoose.model<UserI>("users", userSchema);
