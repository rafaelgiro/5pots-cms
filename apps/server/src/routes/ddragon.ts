import express from "express";
import passport from "passport";

import { makeChampions, makeChampion } from "../controllers/ddragon";
const router = express.Router();

router.post(
  "/make",
  passport.authenticate("jwt", { session: false }),
  makeChampions
);
router.post(
  "/make/:championKey",
  passport.authenticate("jwt", { session: false }),
  makeChampion
);

export default router;
