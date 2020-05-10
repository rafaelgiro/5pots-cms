import React, { useState } from "react";
import PropTypes from "prop-types";

const initialState = { theme: "solari", setTheme: () => {} };
export const ThemeContext = React.createContext(initialState);

const AppTheme = (props) => {
  const { children } = props;
  const [theme, setTheme] = useState(initialState.theme);
  console.log(theme);
  return (
    <ThemeContext.Provider value={(theme, setTheme)}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppTheme;
