import { ChangeIconProps } from "../../atoms/Icons/interfaces";

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
  championSectionIndex: number;
  championChangeIndex: number;
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
  handleBlockChangeDelete(changeIndex: number, blockIndex: number): void;
}

export interface AddChangeBlockProps {
  changeIndex: number;
  addChangeBlock(changeIndex: number): void;
}

export interface AddAbilityProps {
  addAbility(abilityKey: AbilityKey): void;
  currentAbilities: string[];
}

export interface ChangeChampionGoalProps {
  handleGoalChange(type: ChangeIconProps["type"]): void;
  championName: string;
  goal: ChangeIconProps["type"];
}
