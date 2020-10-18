import { Router } from "express";

import PostController from "../controllers/PostController";

const routes = Router();

routes.get("/posts", PostController.index);

routes.get("/posts/:slug", PostController.show);

export default routes;
