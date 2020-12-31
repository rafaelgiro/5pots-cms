import { createContext } from "react";

const initialState = { user: {}, setUser: () => {} };
const AuthContext = createContext(initialState);

export default AuthContext;
