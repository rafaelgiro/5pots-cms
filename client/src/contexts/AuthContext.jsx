import React from "react";

const initialState = { user: {}, setUser: () => {} };
const AuthContext = React.createContext(initialState);

export default AuthContext;
