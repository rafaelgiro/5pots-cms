export interface ChampionChangeProps {
  champion: Champion;
  change: ChampionChange;
}

export interface ChampionChangeDevProps {
  change: ChampionChange;
  championInfo: {
    name: string;
    goal: "buff" | "nerf" | "rework" | "adjusted";
    context?: string;
    resume: string;
  };
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
