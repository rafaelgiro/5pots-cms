import { NextFunction, Request, Response } from "express";
import { HttpException } from "../middlewares/error";
import Champion from "../models/champion";

const getChampions = (req: Request, res: Response, next: NextFunction) => {
  const currentPage = Number(req.query.page) || 1;
  const queryChampions = req.query.champions || "";
  const champions = queryChampions ? String(queryChampions).split(",") : [];
  const perPage = champions.length || 20;
  let totalItems: number;

  // Acha os campeões específicos do post se tiver
  const query = queryChampions
    ? Champion.where("championName").in(champions)
    : Champion.where({});

  query
    .find({})
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return query
        .find({}, { sections: 0 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .sort({ championName: 1 });
    })
    .then((champions) => {
      if (champions.length === 0)
        next(new HttpException(404, "Nenhum campeão foi encontrado"));
      else if (champions) res.status(200).json({ champions, totalItems });
    })
    .catch(() => {
      next(new HttpException(404, "Nenhum campeão foi encontrado"));
    });
};

const getChampion = (req: Request, res: Response, next: NextFunction) => {
  const { championName } = req.params;

  Champion.findOne({ championName }).then((champion) => {
    if (champion) res.status(200).json(champion);
    else next(new HttpException(404, "Campeão não encontrado"));
  });
};

export { getChampions, getChampion };
