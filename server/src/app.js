require("dotenv").config();

import express from "express";
import cors from "cors";

import { postRoutes, authRoutes } from "./app/routes";

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use([postRoutes, authRoutes]);
  }
}

export default new App().express;
