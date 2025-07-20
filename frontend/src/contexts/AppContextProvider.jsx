import { useState } from 'react';
import { AuthContext, UserContext } from './AppContexts.js';

const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}

export default AppContextProvider;