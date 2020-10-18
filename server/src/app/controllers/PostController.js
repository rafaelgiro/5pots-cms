/* eslint-disable class-methods-use-this */
// import RiotApi from "../../services/api/riot";
import mongoose from "mongoose";

const Post = mongoose.model("posts");
class PostController {
  async index(req, res) {
    Post.find({}, { sections: 0 }, (err, posts) => {
      if (err) {
        console.log(err.data);
      }

      return res.send(posts);
    });
  }

  async show(req, res) {
    const { slug } = req.params;
    const query = Post.where({ slug });
    query.findOne((err, post) => {
      if (err) {
        console.log(err);
      }

      return res.send(post);
    });
  }

  // async store(req, res) {}

  // async update(req, res) {}

  // async destroy(req, res) {}
}

export default new PostController();
