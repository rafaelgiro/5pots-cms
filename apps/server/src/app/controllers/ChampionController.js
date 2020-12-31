/* eslint-disable class-methods-use-this */
// import RiotApi from "../../services/api/riot";
import mongoose from "mongoose";

const Champion = mongoose.model("champions");
class ChampionController {
  async index(req, res) {
    const { champions } = req.query;
    const query = champions
      ? Champion.where("championName").in(champions.split(","))
      : Champion.where({});

    query.find({}, (err, foundChampions) => {
      if (err) {
        console.log(err.data);
      }

      return res.send(foundChampions);
    });
  }

  async show(req, res) {
    const { championName } = req.params;
    const query = Champion.where({ championName });
    query.findOne((err, champion) => {
      if (err) {
        console.log(err);
      }

      return res.send(champion);
    });
  }

  // async store(req, res) {}

  // async update(req, res) {}

  // async destroy(req, res) {}
}

export default new ChampionController();
