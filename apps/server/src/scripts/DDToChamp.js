const Axios = require("axios");
const mongoose = require("mongoose");
const keys = require("../config/keys");
require("../models/Champion");

const Champion = mongoose.model("champions");

const patch = "10.21.1";
const language = "pt_BR";
const championsURL = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/${language}/champion.json`;
const champBaseURL = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/${language}/champion/`;

async function getSingleChampion(championName) {
  const skillOrder = ["q", "w", "e", "r"];
  const url = `${champBaseURL}${championName}.json`;
  const res = await Axios.get(url);

  const { tags, title, name } = res.data.data[championName];
  const passive = res.data.data[championName].passive.name;
  const abilities = { p: passive };
  let i = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const spell of res.data.data[championName].spells) {
    abilities[skillOrder[i]] = spell.name;
    i += 1;
  }

  return Champion.create(
    { championName: name, title, tags, abilities },
    (err, newChampion) =>
      err ? Promise.reject(err) : Promise.resolve(newChampion)
  );

  // return Promise.resolve({ championName, title, tags, abilities });
}

async function seedChampionsDB() {
  await mongoose.connect(
    keys.mongoURI || "mongodb://localhost:27017/5pots-dev",
    {
      useNewUrlParser: true,
    }
  );

  const allRes = await Axios.get(championsURL);
  const allChampions = Object.keys(allRes.data.data);
  await Promise.all(
    allChampions.map((championName) => getSingleChampion(championName))
  ).then((data) => console.log(data));
}

seedChampionsDB();
