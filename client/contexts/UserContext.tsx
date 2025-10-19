import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { saveUser, getUser } from "@/services/user.service";

interface UserContextType {
    username: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const initUser = async () => {
            try {
                let userUuid = await AsyncStorage.getItem("userUuid");
                let storedUsername = await AsyncStorage.getItem("username");

                if (storedUsername) {
                    setUsername(storedUsername);
                    return;
                }

                if (!userUuid) {
                    userUuid = uuid.v4();
                    await AsyncStorage.setItem("userUuid", userUuid);
                    const savedUsername = await saveUser(userUuid, 0);
                    setUsername(savedUsername ?? null);
                    if (savedUsername) {
                        await AsyncStorage.setItem("username", savedUsername);
                    }
                    return;
                }

                const user = await getUser(userUuid);

                if (!user) {
                    const savedUsername = await saveUser(userUuid, 0);
                    setUsername(savedUsername ?? null);
                    if (savedUsername) {
                        await AsyncStorage.setItem("username", savedUsername);
                    }
                }

                await AsyncStorage.setItem("hasLaunched", "true");
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
