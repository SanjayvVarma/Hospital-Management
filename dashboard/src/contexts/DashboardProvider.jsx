import React, { useState } from 'react'
import DashboardContext from './DashboardContext.js'


const DashboardProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    return (
        <DashboardContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, }}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardProvider;
