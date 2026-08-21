import React, { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "@/components/calendar/Home";
import { StorageKeys } from "@/constants/storageKeys";

export default function HomeScreen() {
    const initializeApp = async () => {
        const hasLaunched = await AsyncStorage.getItem(StorageKeys.hasLaunched);

        if (!hasLaunched) {
            router.replace("/onboarding");
        }

        // ------- For testing purposes
        // await AsyncStorage.multiRemove([
        //     "userUuid",
        //     "playMusic",
        //     "hasLaunched",
        //     "lastResetYear",
        //     "username",
        //     "gameState",
        //     "bingo_clicked_cells",
        //     "bingo_activities_clicked_cells",
        //     "calendar",
        //     "storyGameAnswers",
        //     "groupCreated",
        //     "isNew",
        // ]);
    };

    useEffect(() => {
        initializeApp();
    }, []);

    return <Home />;
}
