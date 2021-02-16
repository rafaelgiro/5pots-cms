import { UIReducerStateI, UIReducerActionsI } from "./interfaces";
import { createContext, Dispatch } from "react";

export const initialState: UIReducerStateI = {
  theme: "solari",
  setTheme: () => "solari",
  snackbar: { msg: "", variant: "default", visible: false, time: 3000 },
  menu: false,
  setMenu: () => false,
};

export function reducer(
  state: UIReducerStateI,
  action: UIReducerActionsI
): UIReducerStateI {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        theme: state.theme === "solari" ? "lunari" : "solari",
      };
    case "SHOW_SNACKBAR":
      if (!action.snackbar) return { ...state };
      return {
        ...state,
        snackbar: {
          msg: action.snackbar.msg,
          variant: action.snackbar.variant || "default",
          visible: true,
          time: action.snackbar.time || 3000,
        },
      };
    case "HIDE_SNACKBAR":
      return {
        ...state,
        snackbar: {
          visible: false,
        },
      };
    case "OPEN_MENU":
      return {
        ...state,
        menu: true,
      };
    case "CLOSE_MENU":
      return {
        ...state,
        menu: false,
      };
    default:
      throw new Error("Passe um tipo de action para o dispatch");
  }
}

const UIContext = createContext<{
  uiState: UIReducerStateI;
  uiDispatch: Dispatch<UIReducerActionsI>;
}>({
  uiState: initialState,
  uiDispatch: () => {
    return null;
  },
});

export default UIContext;
