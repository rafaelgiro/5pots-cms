import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";

import { errorHandling } from "./middlewares/error";
import postRoutes from "./routes/post";
import championRoutes from "./routes/champion";
import tooltipRoutes from "./routes/tooltip";
import authRoutes from "./routes/auth";
import assetsRoutes from "./routes/assets";
import ddragonRoutes from "./routes/ddragon";
import editorjsRoutes from "./routes/editorjs";
import passportConfig from "./services/passport";
import "./models/user";

const app = express();
passportConfig(passport);

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Rotas
app.use("/posts", postRoutes);
app.use("/champions", championRoutes);
app.use("/tooltip", tooltipRoutes);
app.use("/auth", authRoutes);
app.use("/assets", assetsRoutes);
app.use("/editorjs", editorjsRoutes);
app.use("/ddragon", ddragonRoutes);

// Middleware de erros pras rotas
app.use(errorHandling);

// Conecta o banco e inicia o servidor
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/5pots-dev", {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(
      {
        port: process.env.NODE_PORT,
        host: process.env.NODE_HOST,
      },
      () => {
        console.log(
          `Server now running on ${process.env.NODE_HOST}:${process.env.NODE_PORT}`
        );
      }
    );
  });
