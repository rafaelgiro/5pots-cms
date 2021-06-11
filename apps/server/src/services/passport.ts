import fs from "fs";
import path from "path";
import { PassportStatic } from "passport";
import passportJwt from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

import User from "../models/user";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const pathToKey = path.join(__dirname, "/../lib/config/keys/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub }, { hash: 0, salt: 0 })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

const googleStrategy = new GoogleStrategy(
  {
    clientID:
      process.env.GOOGLE_CLIENT_ID ||
      "Hey! Adicione suas chaves em um arquivo .env",
    clientSecret:
      process.env.GOOGLE_CLIENT_SECRET ||
      "Hey! Adicione suas chaves em um arquivo .env",
    callbackURL: `${process.env.URL}/auth/google/callback`,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id });

    if (existingUser) {
      return done(undefined, existingUser);
    }

    const user = await new User({
      googleID: profile.id,
      isVerified: true,
      email: profile.emails && profile.emails[0].value,
      displayName: profile.displayName,
    }).save();
    done(undefined, user);
  }
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID:
      process.env.FACEBOOK_CLIENT_ID ||
      "Hey! Adicione suas chaves em um arquivo .env",
    clientSecret:
      process.env.FACEBOOK_CLIENT_SECRET ||
      "Hey! Adicione suas chaves em um arquivo .env",
    callbackURL: `${process.env.URL}/auth/facebook/callback`,
    profileFields: ["id", "displayName", "photos", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ facebookID: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({
      facebookID: profile.id,
      isVerified: true,
      email: profile.emails && profile.emails[0].value,
      displayName: profile.displayName,
    }).save();
    done(null, user);
  }
);

export default (passport: PassportStatic) => {
  passport.use(strategy);
  passport.use(googleStrategy);
  passport.use(facebookStrategy);
};
