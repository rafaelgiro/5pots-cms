class BankController {
  // As funções estão async para utilização do mongoose em async/await
  async index(req, res) {
    const posts = [
      {
        title: 'TEAMFIGHT TACTICS: A ASCENSÃO DOS ELEMENTOS',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/LOL_CMS_314_Tile_01-Feature_H40-V50-min_94ucpce02v5cgf3ootvq.jpg',
        commentsCount: 24,
        category: 'artigo'
      },
      {
        title: 'ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/HQ_Header_Ask_Riot_Preseaosn_f8i1ljevnti7wpo7oh2n.png',
        commentsCount: 12,
        category: 'pbe'
      },
      {
        title: 'Pergunte a riot: Skin decente pro Ivern',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/08/Banner_Image_Ask_Riot_zp7rnwkbgfttb0v5frin.jpg',
        commentsCount: 345,
        category: 'riot'
      },
      {
        title: 'TEAMFIGHT TACTICS: A ASCENSÃO DOS ELEMENTOS',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/11/Banner_TD_Ask_Riot_0nwizm4e7mrinfgu73px.jpg',
        commentsCount: 24,
        category: 'artigo'
      },
      {
        title: 'ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/11/00_Banner_T2_Client_Image_9py3o8n8i6w2znjbu3zb.jpg',
        commentsCount: 12,
        category: 'artigo'
      },
      {
        title: 'Pergunte a riot: Skin decente pro Ivern',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/Banner_Preseason-1_dwfwpnp0byzkpe2hk65v.jpg',
        commentsCount: 345,
        category: 'pbe'
      },
      {
        title: 'TEAMFIGHT TACTICS: A ASCENSÃO DOS ELEMENTOS',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/09/01_Banner_Narrative-1_7v6f03bt5eum5f9m2uvd.jpg',
        commentsCount: 24,
        category: 'artigo'
      },
      {
        title: 'ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/09/02_Kayle-1_dbzd5p6b3xmgryf3tl0a.jpg',
        commentsCount: 12,
        category: 'riot'
      },
      {
        title: 'Pergunte a riot: Skin decente pro Ivern',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image:
          'https://nexus.leagueoflegends.com/wp-content/uploads/2019/09/04_Pantheon-1_n77cg0g5px5wekv3mgwv.jpg',
        commentsCount: 345,
        category: 'default'
      }
    ];

    return res.json(posts);
  }

  async show(req, res) {
    const { id } = req.params;

    const post = {
      title: 'Atualização do PBE: Uma atualização com um milhão de tentativas de balanceamento',
      description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
       rutrum purus aliquam magna adipiscing a pellentesque. 
      Condimentum quis neque lorem eu duis. Lectus pellentesque pharetra orci
       suspendisse curabitur.`,
      image: 'https://i.imgur.com/YLdeUgB.png',
      commentsCount: 24,
      color: 'default'
    };

    return res.json({ response: `Retornaww o post de id ${id}` });
  }

  async store(req, res) {}

  async update(req, res) {}

  async destroy(req, res) {}
}

export default new BankController();
