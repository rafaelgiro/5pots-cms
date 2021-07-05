export const defaultChampionChange: ChampionChange = {
  name: "Sion",
  resume: "Sion é o campeão mais lindo do jogo",
  context: "Porque eu amo muito ele",
  goal: "buff",
  changes: [
    {
      stat: "p",
      blocks: [
        {
          type: "change",
          before: "10/20/30/40/50",
          after: "20/30/40/50/60",
          attribute: "Atributo",
        },
      ],
    },
  ],
};

export const defaultSkinChange: Skin = {
  id: "new-skin-id",
  description: "Descrição da skin",
  name: "Nova skin",
  price: "1350",
  prestige: false,
  gemstone: false,
  splash: false,
  loading: false,
  border: false,
  still: false,
  turn: false,
  spotlight: "",
  vo: "",
  chromas: [],
  interactions: "",
};
