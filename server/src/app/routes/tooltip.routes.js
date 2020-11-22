import { Router } from "express";

import TooltipController from "../controllers/TooltipController";

const routes = Router();

routes.get("/tooltip", TooltipController.index);

export default routes;
