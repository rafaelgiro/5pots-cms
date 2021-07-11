export interface ChampionsSectionProps {
  championSection: ChampionChange[];
  champions: Champion[];
  title: string;
}

export interface ChampionSectionDevProps {
  championSection: ChampionChange[];
  allChampions: string[];
  sectionIndex: number;
  title: string;
}

export interface SkinsSectionProps {
  skinsSection: Skin[];
  title: string;
}

export interface SkinsSectionDevProps extends SkinsSectionProps {
  sectionIndex: number;
  title: string;
}
