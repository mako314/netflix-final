import React, { useContext, createContext, useState } from "react";

const UserContext = createContext(null);

export const CurrentUserContext = () => useContext(UserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}