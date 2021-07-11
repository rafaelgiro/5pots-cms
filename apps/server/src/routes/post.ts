import express from "express";
import passport from "passport";

import { getPost, getPosts, createPost, updatePost } from "../controllers/post";
import { isAdmin } from "../middlewares/isAdmin";
const router = express.Router();

router.get("/", getPosts);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createPost
);
router.get("/:slug", getPost);
router.put(
  "/:slug",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updatePost
);

export default router;
