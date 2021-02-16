import express from "express";

import { getChampions, getChampion } from "../controllers/champion";
const router = express.Router();

router.get("/", getChampions);
router.get("/:championName", getChampion);

export default router;
