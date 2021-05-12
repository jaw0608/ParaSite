import React, {useState} from 'react';

const UserCon = React.createContext();
const SetUserContext = React.createContext();

export function getUser() {
    
}

export default function UserContext({ children }) {
    const [user, setUser] = useState({});
    return (
        <UserCon.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserCon.Provider>
    )
}