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
import { logClient } from "@/services/log.service";

interface UserContextType {
    username: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const ensureStringUUID = (value: any): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value[0];
    return String(value);
};

const RETRY_DELAY = 1500; // ms
const MAX_RETRY = 3;

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const initUser = async () => {
            try {
                let userUuid = await AsyncStorage.getItem("userUuid");
                let storedUsername = await AsyncStorage.getItem("username");

                // 1️⃣ Si déjà en cache => on stop
                if (storedUsername) {
                    setUsername(storedUsername);
                    return;
                }

                // 2️⃣ Générer ou nettoyer l'UUID
                if (!userUuid) {
                    let newUuid: any = uuid.v4();
                    newUuid = ensureStringUUID(newUuid);
                    await AsyncStorage.setItem("userUuid", newUuid);
                    userUuid = newUuid;
                } else {
                    userUuid = ensureStringUUID(userUuid);
                }

                // 3️⃣ Vérifier si l'utilisateur existe côté serveur
                let user = null;
                try {
                    user = await getUser(userUuid);
                } catch (err) {
                    await logClient(
                        "Check if user exists in DB failed (getUser)",
                        {
                            userUuid,
                            error: String(err),
                        }
                    );
                }

                // 4️⃣ Si utilisateur existe → on set + cache
                if (user?.username) {
                    setUsername(user.username);
                    await AsyncStorage.setItem("username", user.username);
                    return;
                }

                // 5️⃣ Sinon → créer utilisateur avec retry
                let attempts = 0;
                let createdUsername = null;

                while (attempts < MAX_RETRY && !createdUsername) {
                    try {
                        createdUsername = await saveUser(userUuid, 0);
                        // throw new Error("Mock error");
                    } catch (err) {
                        await logClient("Create user in DB failed (saveUser)", {
                            userUuid,
                            error: String(err),
                            attempt: attempts + 1,
                        });
                    }

                    if (!createdUsername) {
                        attempts++;
                        await new Promise((res) =>
                            setTimeout(res, RETRY_DELAY)
                        );
                    }
                }

                if (!createdUsername) {
                    await logClient("User creation permanently failed", {
                        userUuid,
                    });
                    return;
                }

                // 6️⃣ Cache + state
                setUsername(createdUsername);
                await AsyncStorage.setItem("username", createdUsername);
            } catch (error) {
                await logClient("Fatal error (initUser)", {
                    error: String(error),
                });
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
