import { createContext } from "react";
import { EditCotextI } from "./interfaces";

const initialState: EditCotextI = {
  json: false,
  postState: undefined,
  setPostState: () => null,
};
const EditContext = createContext(initialState);

export default EditContext;
