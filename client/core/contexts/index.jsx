import { useState, useReducer } from "react";
import PropTypes from "prop-types";

import UIContext, { initialState, reducer } from "./UIContext";
import AuthContext from "./AuthContext";

const FivePotsProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [uiState, uiDispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <UIContext.Provider value={{ state: uiState, dispatch: uiDispatch }}>
        <div className={uiState.theme}>{children}</div>
      </UIContext.Provider>
    </AuthContext.Provider>
  );
};

FivePotsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FivePotsProvider;
