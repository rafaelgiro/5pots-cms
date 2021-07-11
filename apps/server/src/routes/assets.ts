import express from "express";
import Multer from "multer";
import passport from "passport";
import { uploadImage } from "../controllers/assets";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();
const multer = Multer();

router.post(
  "/images/:dataSet",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  multer.any(),
  uploadImage
);

export default router;
