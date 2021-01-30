import { useState, useReducer } from "react";

import { initialState, reducer } from "./UIContext";
import AuthContext from "./AuthContext";

const FivePotsProvider: React.FC = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [uiState] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className={uiState.theme}>{children}</div>
    </AuthContext.Provider>
  );
};

export default FivePotsProvider;
