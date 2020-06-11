import React from "react";

export const initialState = {
  theme: "solari",
  setTheme: () => {},
  snackbar: { msg: "", variant: "default", visible: false, time: 3000 },
  setSnackbar: () => {},
};

export function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        theme: state.theme === "solari" ? "lunari" : "solari",
      };
    case "SHOW_SNACKBAR":
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
    default:
      throw new Error("Passe um tipo de action para o dispatch");
  }
}

const UIContext = React.createContext(initialState);

export default UIContext;
