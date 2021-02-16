import { useState, useReducer } from "react";

import UIContext, { initialState, reducer } from "./UIContext";
import AuthContext from "./AuthContext";

const FivePotsProvider: React.FC = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [uiState, uiDispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <UIContext.Provider value={{ uiState, uiDispatch }}>
        <div className={uiState.theme}>{children}</div>
      </UIContext.Provider>
    </AuthContext.Provider>
  );
};

export default FivePotsProvider;
