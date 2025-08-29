import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { saveUser } from "@/services/user.service";

interface UserContextType {
    username: string | null;
}

const BASE_URL = "http://192.168.1.18:3000";
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const initUser = async () => {
            try {
                let userUuid = await AsyncStorage.getItem("userUuid");

                if (!userUuid) {
                    userUuid = uuid.v4();
                    await AsyncStorage.setItem("userUuid", userUuid);
                    const savedUsername = await saveUser(userUuid, 0);
                    setUsername(savedUsername ?? null);
                } else {
                    const response = await fetch(
                        `${BASE_URL}/users/${userUuid}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.username);
                    }
                }
            } catch (error) {
                console.error("Error initializing user", error);
            }
        };

        initUser();
    }, []);

    return (
        <UserContext.Provider value={{ username }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
