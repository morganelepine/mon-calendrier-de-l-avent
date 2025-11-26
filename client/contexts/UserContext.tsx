import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextType {
    username: string | null;
    setUsername: (name: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);

    const loadUsername = async () => {
        const stored = await AsyncStorage.getItem("username");
        setUsername(stored);
    };

    useEffect(() => {
        loadUsername();
    }, []);

    useEffect(() => {
        if (username !== null) {
            AsyncStorage.setItem("username", username);
        }
    }, [username]);

    const value = useMemo(() => ({ username, setUsername }), [username]);

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
