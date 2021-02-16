import express from "express";
import passport from "passport";

import { getPost, getPosts } from "../controllers/post";
const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", getPost);

export default router;
