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

    // const response = await RiotApi.page("news").get();

    // const {
    //   result: {
    //     pageContext: {
    //       data: { sections },
    //     },
    //   },
    // } = response.data;

    // const filter = sections.filter(
    //   (section) => section.type === "news_latest"
    // )[0].props.articles;

    // const posts = filter.reduce((posts, post) => {
    //   if (post.category !== "Comunidade") {
    //     posts.push({
    //       title: post.title,
    //       description: post.text,
    //       image: post.imageUrl,
    //       author: post.authors ? post.authors[0] : "Riot Games",
    //       category: "riot",
    //       tag: post.category,
    //       small: Math.random() >= 0.8,
    //       link: `https://br.leagueoflegends.com/pt-br${post.link.url}`,
    //     });
    //   }
    //   return posts;
    // }, []);

    // return res.json(posts);
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

  async store(req, res) {}

  async update(req, res) {}

  async destroy(req, res) {}
}

// class PostController {
//   async index(req, res) {
//     const response = await RiotApi.page("news").get();

//     const {
//       result: {
//         pageContext: {
//           data: { sections },
//         },
//       },
//     } = response.data;

//     const filter = sections.filter(
//       (section) => section.type === "news_latest"
//     )[0].props.articles;

//     const posts = filter.reduce((posts, post) => {
//       if (post.category !== "Comunidade") {
//         posts.push({
//           title: post.title,
//           description: post.text,
//           image: post.imageUrl,
//           author: post.authors ? post.authors[0] : "Riot Games",
//           category: "riot",
//           tag: post.category,
//           small: Math.random() >= 0.8,
//           link: `https://br.leagueoflegends.com/pt-br${post.link.url}`,
//         });
//       }
//       return posts;
//     }, []);

//     return res.json(posts);
//   }

//   async show(req, res) {
//     const { id } = req.params;

//     const post = {
//       title:
//         "Atualização do PBE: Uma atualização com um milhão de tentativas de balanceamento",
//       description: `A fase beta de Teamfight Tactics chegou ao fim, e os
//       elementos ascenderão na segunda temporada! Sendo nosso primeiro novo
//       conjunto, A Ascensão dos Elementos muda completamente os Campeões, as
//       Origens e as Classes que você conheceu durante o beta.`,
//       text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
//        rutrum purus aliquam magna adipiscing a pellentesque.
//       Condimentum quis neque lorem eu duis. Lectus pellentesque pharetra orci
//        suspendisse curabitur.`,
//       image: "https://i.imgur.com/YLdeUgB.png",
//       commentsCount: 24,
//       color: "default",
//     };

//     return res.json({ response: `Retornaww o post de id ${id}` });
//   }

//   async store(req, res) {}

//   async update(req, res) {}

//   async destroy(req, res) {}
// }

export default new PostController();
