import express from "express";
import passport from "passport";
import { check } from "express-validator";

import {
  login,
  refresh,
  register,
  forgotPassword,
  isTokenValid,
  updatePassword,
  forgotUsername,
  googleCallback,
  facebookCallback,
} from "../controllers/auth";

const router = express.Router();

router.post(
  "/login",
  check("username", "O usuário precisa ter no mínimo 3 caracteres")
    .isLength({
      min: 3,
    })
    .trim()
    .escape(),
  check("password", "A senha precisa ter no mínimo 6 caracteres")
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.confirm) {
        throw new Error("As senhas informadas não coincidem");
      } else {
        return value;
      }
    })
    .trim()
    .escape(),
  login
);

router.post(
  "/register",
  check("username", "O usuário precisa ter no mínimo 3 caracteres")
    .isLength({
      min: 3,
    })
    .trim()
    .escape(),
  check("email", "Email inválido")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .optional({ checkFalsy: true }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("A senha precisa ter no mínimo 6 caracteres")
    .custom((value, { req }) => {
      if (value !== req.body.confirm) {
        throw new Error("As senhas informadas não coincidem");
      } else {
        return value;
      }
    })
    .trim()
    .escape(),
  check("displayName").trim().escape(),
  register
);

router.post(
  "/refresh",
  passport.authenticate("jwt", { session: false }),
  refresh
);

router.post(
  "/forgot/password",
  check("email", "Email inválido")
    .optional()
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape(),
  forgotPassword
);

router.post(
  "/forgot/username",
  check("email", "Email inválido")
    .optional()
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape(),
  forgotUsername
);

router.post(
  "/forgot/:token",
  check("password")
    .isLength({ min: 6 })
    .withMessage("A senha precisa ter no mínimo 6 caracteres")
    .custom((value, { req }) => {
      if (value !== req.body.confirm) {
        throw new Error("As senhas informadas não coincidem");
      } else {
        return value;
      }
    })
    .trim()
    .escape(),
  updatePassword
);

router.get("/reset", isTokenValid);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  facebookCallback
);

export default router;
