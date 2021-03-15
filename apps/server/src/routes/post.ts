import express from "express";
import passport from "passport";

import { getPost, getPosts, updatePost } from "../controllers/post";
const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", getPost);
router.put(
  "/:slug",
  passport.authenticate("jwt", { session: false }),
  updatePost
);

export default router;
