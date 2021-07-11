import express from "express";
import Multer from "multer";
import passport from "passport";
import { uploadFromFile, uploadFromURL } from "../controllers/editorjs";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();
const multer = Multer();

router.post(
  "/file",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  multer.any(),
  uploadFromFile
);

router.post(
  "/url",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  uploadFromURL
);

export default router;
