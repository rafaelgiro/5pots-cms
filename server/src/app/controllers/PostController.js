class BankController {
  // As funções estão async para utilização do mongoose em async/await
  async index(req, res) {
    const posts = [
      {
        title: "TEAMFIGHT TACTICS: A ASCENSÃO DOS ELEMENTOS",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/LOL_CMS_314_Tile_01-Feature_H40-V50-min_94ucpce02v5cgf3ootvq.jpg",
        commentsCount: 24,
        category: "artigo"
      },
      {
        title: "ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/HQ_Header_Ask_Riot_Preseaosn_f8i1ljevnti7wpo7oh2n.png",
        commentsCount: 12,
        category: "pbe"
      },
      {
        title: "Pergunte a riot: Skin decente pro Ivern",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/08/Banner_Image_Ask_Riot_zp7rnwkbgfttb0v5frin.jpg",
        commentsCount: 345,
        category: "riot"
      },
      {
        title: "TEAMFIGHT TACTICS: A ASCENSÃO DOS ELEMENTOS",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/LOL_CMS_314_Tile_01-Feature_H40-V50-min_94ucpce02v5cgf3ootvq.jpg",
        commentsCount: 24,
        category: "artigo"
      },
      {
        title: "ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/HQ_Header_Ask_Riot_Preseaosn_f8i1ljevnti7wpo7oh2n.png",
        commentsCount: 12,
        category: "pbe"
      },
      {
        title: "Pergunte a riot: Skin decente pro Ivern",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/08/Banner_Image_Ask_Riot_zp7rnwkbgfttb0v5frin.jpg",
        commentsCount: 345,
        category: "riot"
      },
      {
        title: "TEAMFIGHT TACTICS: A ASCENSÃO DOS ELEMENTOS",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/LOL_CMS_314_Tile_01-Feature_H40-V50-min_94ucpce02v5cgf3ootvq.jpg",
        commentsCount: 24,
        category: "artigo"
      },
      {
        title: "ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          "https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/HQ_Header_Ask_Riot_Preseaosn_f8i1ljevnti7wpo7oh2n.png",
        commentsCount: 12,
        category: "pbe"
      },
      {
        title: "Pergunte a riot: Skin decente pro Ivern",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
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
