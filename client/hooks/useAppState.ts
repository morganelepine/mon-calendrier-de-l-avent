import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export default function useAppState(): AppStateStatus {
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const sub = AppState.addEventListener("change", (nextState) => {
            setAppState(nextState);
        });

        return (): void => sub.remove();
    }, []);

    return appState;
}
