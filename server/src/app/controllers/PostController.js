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
        image: 'https://i.imgur.com/YLdeUgB.png',
        commentsCount: 24,
        color: 'default'
      },
      {
        title: 'ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image: 'https://i.imgur.com/7AxcReo.png',
        commentsCount: 12,
        color: 'pbe'
      },
      {
        title: 'TEMA DA CAMPEÃ SENNA',
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image: 'https://i.imgur.com/q2dnH94.png',
        commentsCount: 345,
        color: 'riot'
      }
    ];
    console.log('chego aquii');
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
