import api from "../../../core/services/api";

export const initialPost = {
  author: "datFranky",
  sections: [
    {
      title: "Tentativas de balanceamento",
      champions: [
        {
          name: "Ahri",
          goal: "buff",
          resume:
            "Passiva agora é o efeito passivo do Q, o que faz qualquer habilidade poder curar. W agora concede Velocidade de Movimento, causa 200% de dano a tropas com Vida baixa e as foca de maneira mais eficaz.",
          context:
            'A mecânica de jogo e identidade da Ahri ficaram opacas com o passar do tempo, e isso não é nada encantador. Realizamos algumas mudanças no kit, principalmente no W, para reforçar a identidade de "maga evasiva" que pode entrar e sair de lutas procurando o momento perfeito de brilhar. Também transformamos o Furto de Essência do Q na Passiva dela, para que ela tenha mais oportunidades de se curar ao realizar trocas com Campeões inimigos. No geral, nossa raposa deve realizar seus combos e jogadas de maneira mais eficiente',
          changes: [
            {
              stat: "base",
              blocks: [
                {
                  type: "change",
                  attribute: "REGENERAÇÃO DE VIDA",
                  before: "6,5",
                  after: "5,5",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  subTitles: ["Campeões"],
  title: "Notas de Atualização 10.18",
  img:
    "https://f002.backblazeb2.com/file/cincopots/posts/sionlindorivennadinha.webp",
  champions: ["Ahri"],
  blurb:
    "Chegou setembro! A gente tinha um plano pra essa data do ano... Então não vamos errar nem nos demorar, porque é hora de desvendar tudo que tem na Atualização 10.18!",
  category: "pbe",
  url:
    "https://br.leagueoflegends.com/pt-br/news/game-updates/notas-da-atualizacao-10-19/",
  postedAt: "2020-09-15T18:00:00.000Z",
  slug: "notas-de-atualizacao-1018",
  type: "patch-notes",
};

export function createMock() {
  const token = localStorage.getItem("token");

  return api.post(
    "/posts",
    { post: initialPost },
    {
      headers: { Authorization: token },
    }
  );
}

export function createChampions() {
  const token = localStorage.getItem("token");

  return api.post(
    "/ddragon/make",
    {},
    {
      headers: { Authorization: token },
    }
  );
}
