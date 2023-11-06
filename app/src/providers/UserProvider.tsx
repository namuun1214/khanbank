import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { useUserUID } from '../authentication';
import { useDocument } from '../hooks';

type UserContextType = {
    activeRoomMembers: string[];
    setActiveRoomMembers: React.Dispatch<React.SetStateAction<string[]>>
    setMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
    isMenuClicked: boolean;
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<boolean>>

}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: FC = ({ children }) => {
    const [userData, setUserData] = useState<any>({});
    const uid = useUserUID();
    const { data } = useDocument({ path: `users/${uid}` })
    const [activeRoomMembers, setActiveRoomMembers] = useState<string[]>([]);
    const [isMenuClicked, setMenuClicked] = useState<boolean>(false)
    useEffect(() => {
        setUserData(data)
    }, [data])
    return (
        <UserContext.Provider value={{ activeRoomMembers, setActiveRoomMembers, setMenuClicked, isMenuClicked, userData, setUserData }}>{children}</UserContext.Provider>
    )
};

export const useUserData = (): UserContextType => useContext(UserContext);
