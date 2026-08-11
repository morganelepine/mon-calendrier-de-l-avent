import React, { createContext, useContext, useState, useMemo } from "react";

interface UserContextType {
    username: string | null;
    setUsername: (name: string | null) => void;

    userUuid: string | null;
    setUserUuid: (uuid: string | null) => void;

    userId: number | null;
    setUserId: (id: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [userUuid, setUserUuid] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    const value = useMemo(
        () => ({
            username,
            setUsername,
            userUuid,
            setUserUuid,
            userId,
            setUserId,
        }),
        [username, userUuid, userId],
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }
    return context;
};
