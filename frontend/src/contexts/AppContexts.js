import { createContext } from "react";

const AuthContext = createContext({ isAuth: false });

const UserContext = createContext({ user: {} });

export { AuthContext, UserContext };