import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

import keys from "../../config/keys";
import url from "../../config/url";

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Local Strategy
passport.use(new LocalStrategy(User.authenticate()));

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        keys.googleClientID ||
        "Hey! crie um dev.js na pasta config/keys com suas chaves",
      clientSecret:
        keys.googleClientSecret ||
        "Hey! crie um dev.js na pasta config/keys com suas chaves",
      callbackURL: `${url}/api/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleID: profile.id,
        isVerified: true,
        email: profile.emails[0].value,
        displayName: profile.displayName,
      }).save();
      done(null, user);
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID:
        keys.facebookClientID ||
        "Hey! crie um dev.js na pasta config/keys com suas chaves",
      clientSecret:
        keys.facebookClientSecret ||
        "Hey! crie um dev.js na pasta config/keys com suas chaves",
      callbackURL: `${url}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookID: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        facebookID: profile.id,
        isVerified: true,
        email: profile.emails[0].value,
        displayName: profile.displayName,
      }).save();
      done(null, user);
    }
  )
);
