import React, { createContext } from "react";

const AuthenticatedContext = createContext({ isAuthenticated: false });

export default AuthenticatedContext;