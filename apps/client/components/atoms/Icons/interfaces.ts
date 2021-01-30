export type SectionIconsType = "champions" | "skins";
export type ChangeIconType = "buff" | "nerf" | "adjust" | "rework";
export type ClassIconType =
  | "Tank"
  | "Support"
  | "Mage"
  | "Fighter"
  | "Marksman"
  | "Assassin";

export interface SectionIconProps {
  section: SectionIconsType;
}

export interface ChangeIconProps {
  type: ChangeIconType;
}

export interface ClassIconProps {
  tag: ClassIconType;
}
