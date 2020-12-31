import { Router } from "express";

import ChampionController from "../controllers/ChampionController";

const routes = Router();

routes.get("/champions", ChampionController.index);

routes.get("/champions/:championName", ChampionController.show);

export default routes;
