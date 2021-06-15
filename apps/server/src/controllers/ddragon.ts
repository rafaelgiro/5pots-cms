import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../middlewares/error";
import Champion from "../models/champion";

const makeChampions = async (_: Request, res: Response, next: NextFunction) => {
  const versionRes = await axios.get(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const latest = versionRes.data[0];

  const championsRes = await axios.get(
    `http://ddragon.leagueoflegends.com/cdn/${latest}/data/pt_BR/champion.json`
  );

  const allChampions = championsRes.data.data;

  Promise.all(
    Object.entries(allChampions).map(async ([championKey, details]) => {
      const { tags, title, name } = details as {
        tags: string[];
        title: string;
        name: string;
      };

      const singleChampRes = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${latest}/data/pt_BR/champion/${championKey}.json`
      );
      const champSpells = singleChampRes.data.data[championKey].spells;
      const abilities = {
        p: singleChampRes.data.data[championKey].passive.name,
        q: champSpells[0].name,
        w: champSpells[1].name,
        e: champSpells[2].name,
        r: champSpells[3].name,
      };

      return { championName: name, tags, title, abilities };
    })
  )
    .then((championInfo) =>
      Champion.remove({})
        .then(() => Champion.collection.insertMany(championInfo))
        .then(() => res.status(200).json(championInfo))
    )
    .catch(() => {
      next(new HttpException(500, "Serviço indisponível"));
    });
};

const makeChampion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { championKey } = req.params;

  const versionRes = await axios.get(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const latest = versionRes.data[0];
  const championRes = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${latest}/data/pt_BR/champion/${championKey}.json`
  );
  const champSpells = championRes.data.data[championKey].spells;
  const abilities = {
    p: championRes.data.data[championKey].passive.name,
    q: champSpells[0].name,
    w: champSpells[1].name,
    e: champSpells[2].name,
    r: champSpells[3].name,
  };

  const { name, tags, title } = championRes.data.data[championKey];
  const newChampion = { championName: name, title, tags, abilities };
  Champion.remove({ championName: name })
    .then(() => Champion.create(newChampion))
    .then(() => res.status(200).json(newChampion))
    .catch(() => next(new HttpException(500, "Serviço indisponível")));
};

export { makeChampions, makeChampion };
