/* eslint-disable class-methods-use-this */
const Axios = require("axios");

class ChampionController {
  async index(req, res) {
    const { championName, abilityKey } = req.query;

    const patch = "10.23.1";
    const language = "pt_BR";
    const champBaseURL = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/${language}/champion/`;

    const abilityMap = ["Q", "W", "E", "R"];
    const championRes = await Axios.get(`${champBaseURL}${championName}.json`);
    const champion = championRes.data.data[championName];
    const spellIndex = abilityMap.indexOf(abilityKey);

    if (abilityKey === "P") {
      const { name, description } = champion.passive;
      return res.send({ patch, name, description });
    }

    const ability = champion.spells[spellIndex];
    const { description, name, cooldownBurn, costBurn, rangeBurn } = ability;
    const labels = ability.leveltip.label;
    const effects = ability.leveltip.effect;

    const readableTips = labels.map((label, i) => {
      const effectString = effects[i].match(/({{ e|{{ effect)[0-9]+/gi);
      const effectIndex = effectString
        ? Number(effectString[0].match(/\d+/)[0])
        : null;
      const percentage = effects[i].match(/}}%/);

      if (effectIndex) {
        return {
          label: labels[effectIndex - 1],
          effect: `${ability.effectBurn[effectIndex]}${percentage ? "%" : ""}`,
        };
      }

      return null;
    });

    const tips = readableTips.filter(Boolean);

    return res.send({
      patch,
      name,
      description,
      cooldownBurn,
      costBurn,
      rangeBurn,
      tips,
    });
  }
}

export default new ChampionController();
