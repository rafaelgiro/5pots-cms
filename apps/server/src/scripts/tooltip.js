const Axios = require("axios");

const patch = "10.23.1";
const language = "pt_BR";
const champBaseURL = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/${language}/champion/`;

async function getChampionTooltip() {
  const championName = "Sion";
  const abilityKey = "W";

  const abilityMap = ["Q", "W", "E", "R"];
  const championRes = await Axios.get(`${champBaseURL}${championName}.json`);
  const champion = championRes.data.data[championName];
  const spellIndex = abilityMap.indexOf(abilityKey);

  if (abilityKey === "P") {
    const { name, description } = champion.passive;
    console.log({ name, description });
  } else {
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

    console.log({ name, description, cooldownBurn, costBurn, rangeBurn, tips });
  }
}

getChampionTooltip();
