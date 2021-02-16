import express from "express";

import { getTooltip } from "../controllers/tooltip";
const router = express.Router();

router.get("/", getTooltip);

export default router;
