import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { HttpException } from "../middlewares/error";

export const getTooltip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { championName, abilityKey } = req.query;

  // Busca a versão atual
  axios
    .get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((patchRes) => {
      const patch = patchRes.data[0];
      const language = "pt_BR";
      const champBaseURL = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/${language}/champion/`;

      const abilityMap = ["Q", "W", "E", "R"];
      return axios
        .get(`${champBaseURL}${championName}.json`)
        .then((championRes) => {
          const champion = championRes.data.data[String(championName)];
          const spellIndex = abilityMap.indexOf(String(abilityKey));

          // Passiva tem só descrição
          if (abilityKey === "P") {
            const { name, description } = champion.passive;
            return res.status(200).json({ patch, name, description });
          }

          // Pega dados da habilidade
          const ability = champion.spells[spellIndex];
          const {
            description,
            name,
            cooldownBurn,
            costBurn,
            rangeBurn,
          } = ability;
          const labels = ability.leveltip.label;
          const effects = ability.leveltip.effect;

          // Mapeia os efeitos
          const readableTips = labels.map((label: string, i: number) => {
            const effectString = effects[i].match(/({{ e|{{ effect)[0-9]+/gi);
            const effectIndex = effectString
              ? Number(effectString[0].match(/\d+/)[0])
              : null;
            const percentage = effects[i].match(/}}%/);

            if (effectIndex) {
              return {
                label: labels[effectIndex - 1],
                effect: `${ability.effectBurn[effectIndex]}${
                  percentage ? "%" : ""
                }`,
              };
            }

            return null;
          });

          const tips = readableTips.filter(Boolean);

          return res.status(200).json({
            patch,
            name,
            description,
            cooldownBurn,
            costBurn,
            rangeBurn,
            tips,
          });
        });
    })
    .catch((err) => {
      const errMessage: Record<number, string> = {
        403: "Campeão ou Habilidade inválidos.",
      };
      const errStatus: number = err.response.status;
      next(
        new HttpException(
          errStatus,
          errMessage[errStatus] || "Serviço indisponível"
        )
      );
    });
};
