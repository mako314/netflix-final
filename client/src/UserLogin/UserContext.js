import { createContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([]);

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    )
}