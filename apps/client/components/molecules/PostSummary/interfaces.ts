export interface ChampionChangesProps {
  changes: ChampionChange[];
  type: "buff" | "adjust" | "nerf" | "rework";
}
