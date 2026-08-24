import React, { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "@/components/calendar/Home";
import { isOctober } from "@/constants/Dates";
import { StorageKeys } from "@/constants/storageKeys";

export default function HomeScreen() {
    const initializeApp = async () => {
        const hasLaunched = await AsyncStorage.getItem(StorageKeys.hasLaunched);

        if (!hasLaunched) {
            router.replace("/onboarding");
            return;
        }

        if (isOctober) {
            const halloweenNoticeSeen = await AsyncStorage.getItem(
                StorageKeys.halloweenNoticeSeen,
            );
            if (!halloweenNoticeSeen) {
                router.replace("/halloween-notice");
                return;
            }
        }

        const notificationsNoticeSeen = await AsyncStorage.getItem(
            StorageKeys.notificationsNoticeSeen,
        );
        if (!notificationsNoticeSeen) {
            router.replace("/notifications-notice");
            return;
        }

        // // ------- For testing purposes
        // await AsyncStorage.multiRemove([
        //     "userUuid",
        //     "playMusic",
        //     "hasLaunched",
        //     "lastResetYear",
        //     "username",
        //     "gameState",
        //     "bingo_halloween_clicked_cells",
        //     "bingo_films_clicked_cells",
        //     "bingo_activities_clicked_cells",
        //     "calendar",
        //     "groupCreated",
        //     "isNew",
        //     "halloween_notice_seen",
        // ]);
    };

    useEffect(() => {
        initializeApp();
    }, []);

    return <Home />;
}
