export interface ChampionChangeProps {
  champion: Champion;
  change: ChampionChange;
}

export interface ChampionSingleChange {
  base?: string;
  p?: string;
  q?: string;
  w?: string;
  e?: string;
  r?: string;
}

export interface ChangeBlockProps {
  block: {
    type: "removed" | "new" | "updated" | "reworked" | "change";
    attribute: string;
    before: string;
    after: string;
  };
  champion?: string;
}

export interface AbilityTitleProps {
  isBase: boolean;
  abilityKey: AbilityKey;
  abilityName?: string;
  championName: string;
}
