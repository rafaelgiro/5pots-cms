import express from "express";
import Multer from "multer";
import passport from "passport";
import { uploadImage } from "../controllers/assets";

const router = express.Router();
const multer = Multer();

router.post(
  "/images/:dataSet",
  passport.authenticate("jwt", { session: false }),
  multer.any(),
  uploadImage
);

export default router;
