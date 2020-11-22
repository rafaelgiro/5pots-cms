import "dotenv/config";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import passport from "passport";

import "./models/User";
import "./models/Token";
import "./models/Post";
import "./models/Champion";
import "./services/auth/passport";

import {
  postRoutes,
  authRoutes,
  championRoutes,
  tooltipRoutes,
} from "./app/routes";
import keys from "./config/keys";

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(
      cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [
          keys.cookieKey ||
            "Hey! crie um dev.js na pasta config/keys com suas chaves",
        ],
      })
    );
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  routes() {
    this.express.use([postRoutes, authRoutes, championRoutes, tooltipRoutes]);
  }
}

export default new App().express;
