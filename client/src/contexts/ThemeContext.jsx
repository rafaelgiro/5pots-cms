import React from "react";

const initialState = { theme: "solari", setTheme: () => {} };
const ThemeContext = React.createContext(initialState);

export default ThemeContext;
