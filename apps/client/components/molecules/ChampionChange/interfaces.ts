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

export interface AbilityTitleDevProps extends AbilityTitleProps {
  changeIndex: number;
  handleAbilityKey(
    champion: string,
    changeIndex: number,
    newKey: AbilityKey
  ): void;
  unsanitazedChampion: string;
}

export interface ChangeBlockDevProps extends ChangeBlockProps {
  handleBlockType(
    changeIndex: number,
    blockIndex: number,
    newValue: "removed" | "new" | "updated" | "reworked" | "change"
  ): void;
  changeIndex: number;
  blockIndex: number;
  handleBlockChange: (
    changeIndex: number,
    blockIndex: number,
    newValue: string,
    key: "attribute" | "before" | "after"
  ) => void;
}
