export type imgType = "loading" | "border" | "splash" | "still" | "turn";

export interface SkinDisplayEditProps extends Skin {
  index: number;
  sectionIndex: number;
}

export interface ManageChromasProps {
  skinIndex: number;
  sectionIndex: number;
  chromas: Skin["chromas"];
  id: string;
}

export interface EditChromaProps {
  chromaIndex: number;
  chromaColor: string;
  id: string;
  handleColorChange(chromaIndex: number, newColor: string): void;
  deleteChroma(chromaIndex: number): void;
}

export interface AddChromaProps {
  chromas: Skin["chromas"];
  id: string;
  setChromaArr(newArr: Skin["chromas"]): void;
}
