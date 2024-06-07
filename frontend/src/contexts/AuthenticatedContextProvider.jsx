import React, { useState } from 'react'
import AuthenticatedContext from './AuthenticatedContext.js'

const AuthenticatedContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({})

    return (
        <AuthenticatedContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthenticatedContext.Provider>
    )
}

export default AuthenticatedContextProvider;