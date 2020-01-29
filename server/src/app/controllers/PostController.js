class BankController {
  // As funções estão async para utilização do mongoose em async/await
  async index(req, res) {
    const posts = [
      {
        title: "Pergunte a riot: Skin decente pro Ivern",
        description: `Dolore ea velit fugiat et. In irure deserunt qui irure id minim voluptate adipisicing. Eiusmod  nulla sunt nulla consectetur commodo aute deserunt voluptate irure ex sit id tempor.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/08/Banner_Image_Ask_Riot_zp7rnwkbgfttb0v5frin.jpg",
        commentsCount: 345,
        category: "riot"
      },
      {
        title: "TFT: A Ascensão dos elementos",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/LOL_CMS_314_Tile_01-Feature_H40-V50-min_94ucpce02v5cgf3ootvq.jpg",
        commentsCount: 24,
        category: "artigo"
      },
      {
        title: "Atualização do PBE: 25/10",
        description: `Lorem tempor cillum enim aliqua nulla do pariatur. ipsum officia esse ipsum minim eiusmod adipisicing voluptate. Ullamco consectetur velit qui adipisicing quis dolore culpa anim.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/HQ_Header_Ask_Riot_Preseaosn_f8i1ljevnti7wpo7oh2n.png",
        commentsCount: 12,
        category: "pbe"
      },
      {
        title: "TFT: Muda rápido demais. Tenho que trabalhar Riot :(",
        description: `In exercitation nulla qui veniam elit cillum mollit culpa incididunt ex in in fugiat. Velit adipisicing qui consectetur.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2020/01/01_Grappler_exploration02_634b1r0lsgejjohqbnpf.jpg",
        commentsCount: 24,
        category: "artigo"
      },
      {
        title: "Dolor id mollit elit nisi tempor mollit aute.",
        description: `Laborum amet reprehenderit fugiat ut sint. Sint voluptate sint laboris aute veniam consequat. Dolor veniam in aliqua aliquip dolor reprehenderit. Excepteur et adipisicing enim laborum.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2020/01/Banner_Ask_Riot_Prestige_Skins_u2g26y3xzliu8ql9bfoi.jpg",
        commentsCount: 12,
        category: "pbe"
      },
      {
        title: "Laboris quis consequat excepteur officia.",
        description: `Ad esse qui sint quis ut ullamco aute culpa anim magna. Tempor do cupidatat eiusmod officia nisi. Dolore est nostrud enim sint excepteur nisi mollit sint amet. In et ea et est eu dolor tempor.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2020/01/01_Banner_Fiddlesticks_Concept_9j7dhjnqxbpc7o0qibqp.jpg",
        commentsCount: 345,
        category: "riot"
      },
      {
        title: "Commodo eu laboris consequat aliqua.",
        description: `Culpa eu occaecat laboris elit eiusmod ex sunt eiusmod deserunt commodo Lorem duis dolor. Dolore minim velit aliqua ex veniam officia anim ullamco esse.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/02_Forge_Concept1_l97uywotlnqob8xrr0w7.png",
        commentsCount: 24,
        category: "artigo"
      },
      {
        title: "Do laborum id reprehenderit laborum officia aute.",
        description: `Id id excepteur minim elit enim elit ut mollit adipisicing sint ipsum magna. Labore dolor cillum velit ea ad reprehenderit eu excepteur non sit.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2020/01/LOL_CMS_328_Tile_03_feature1-min_pg8w5yfionx3bdkekqvp.jpg",
        commentsCount: 12,
        category: "pbe"
      },
      {
        title: "Officia sunt duis aute esse anim dolore qui.",
        description: `Quis laborum sit eiusmod duis in. Proident incididunt consequat laborum ut occaecat exercitation commodo aliquip cupidatat reprehenderit voluptate nisi incididunt tempor.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/08/Banner_Image_Ask_Riot_zp7rnwkbgfttb0v5frin.jpg",
        commentsCount: 345,
        category: "riot"
      }
    ];

    return res.json(posts);
  }

  async show(req, res) {
    const { id } = req.params;

    const post = {
      title:
        "Atualização do PBE: Uma atualização com um milhão de tentativas de balanceamento",
      description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
       rutrum purus aliquam magna adipiscing a pellentesque. 
      Condimentum quis neque lorem eu duis. Lectus pellentesque pharetra orci
       suspendisse curabitur.`,
      image: "https://i.imgur.com/YLdeUgB.png",
      commentsCount: 24,
      color: "default"
    };

    return res.json({ response: `Retornaww o post de id ${id}` });
  }

  async store(req, res) {}

  async update(req, res) {}

  async destroy(req, res) {}
}

export default new BankController();
