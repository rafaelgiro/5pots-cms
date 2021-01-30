import { createContext } from "react";
import { UserContextI } from "./interfaces";

const initialState: UserContextI = { user: undefined, setUser: undefined };
const AuthContext = createContext(initialState);

export default AuthContext;
