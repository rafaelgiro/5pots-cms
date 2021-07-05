export interface EditChampionChangeProps {
  change: ChampionChange;
  setChange: (newChange: ChampionChange) => void;
  championSectionIndex: number;
  championChangeIndex: number;
}
