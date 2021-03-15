import { createContext } from "react";
import { EditCotextI } from "./interfaces";

const initialState: EditCotextI = {
  json: false,
  handleChampionChange: () => null,
  handleNewChampion: () => null,
  handleDeleteChampion: () => null,
  postState: undefined,
  setPostState: () => null,
  championSectionIndex: 0,
  setHasChanged: () => null,
};
const EditContext = createContext(initialState);

export default EditContext;
