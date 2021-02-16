import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { UserI } from "../models/user";

const pathToKey = path.join(__dirname, "/../config/keys/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

export function issueJWT(user: UserI) {
  const {
    _id,
    username,
    displayName,
    email,
    isAdmin,
    isVerified,
    facebookID,
    googleID,
  } = user;

  const expiresIn = isAdmin ? "1d" : "21d";

  const payload = {
    sub: String(_id),
    username,
    displayName,
    email,
    isAdmin,
    isVerified,
    facebookID,
    googleID,
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
