import { useEffect, useState } from "react";
import { AppState } from "react-native";

export default function useAppState() {
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const sub = AppState.addEventListener("change", (nextState) => {
            console.log("App state:", nextState);
            setAppState(nextState);
        });

        return () => sub.remove();
    }, []);

    return appState;
}
