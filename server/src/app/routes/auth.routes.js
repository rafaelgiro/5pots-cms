import { Router } from "express";

const routes = Router();

routes.get("/auth", (req, res) => {
  res.send("Autenticação");
});

export default routes;
