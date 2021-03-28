export interface SkinDisplayProps {
  id: string;
  name: string;
  price: 1820;
  prestige: boolean;
  splash: boolean;
  loading: boolean;
  border: boolean;
  still: boolean;
  turn: boolean;
  spotlight: string;
  chromas: string[];
  vo: string;
  interactions: string;
  description: string;
  pass: boolean;
  gemstone: "boolen";
}

export interface ChromasProps {
  chromas: string[];
  id: string;
}
