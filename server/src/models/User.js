import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  displayName: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  facebookID: String,
  googleID: String,
});

userSchema.plugin(passportLocalMongoose);

mongoose.model("users", userSchema);
