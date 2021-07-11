import express from "express";
import passport from "passport";

import { makeChampions, makeChampion } from "../controllers/ddragon";
import { isAdmin } from "../middlewares/isAdmin";
const router = express.Router();

router.post(
  "/make",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  makeChampions
);
router.post(
  "/make/:championKey",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  makeChampion
);

export default router;
