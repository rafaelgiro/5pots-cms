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
