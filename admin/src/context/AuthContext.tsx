import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from "react";
import { me as fetchMe } from "../services/auth.service";

interface AuthContextValue {
    // null = not yet checked (initial /admin-auth/me call in flight).
    authenticated: boolean | null;
    setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        fetchMe()
            .then((r) => setAuthenticated(r.authenticated))
            .catch(() => setAuthenticated(false));
    }, []);

    const value = useMemo(
        () => ({ authenticated, setAuthenticated }),
        [authenticated],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
