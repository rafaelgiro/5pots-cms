import React, { useState } from "react";
import PropTypes from "prop-types";

import ThemeContext from "./ThemeContext";
import AuthContext from "./AuthContext";

const FivePotsProvider = (props) => {
  const { children } = props;
  const [theme, setTheme] = useState("solari");
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={(theme, setTheme)}>
        <div className={theme}>{children}</div>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

FivePotsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FivePotsProvider;
