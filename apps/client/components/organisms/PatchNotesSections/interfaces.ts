export interface ChampionsSectionProps {
  championSection: ChampionChange[];
  champions: Champion[];
}

export interface ChampionSectionDevProps {
  championSection: ChampionChange[];
  allChampions: string[];
  sectionIndex: number;
}

export interface SkinsSectionProps {
  skinsSection: Skin[];
}

export interface SkinsSectionDevProps extends SkinsSectionProps {
  sectionIndex: number;
}
