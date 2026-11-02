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

        // ------- For testing purposes
        // await AsyncStorage.multiRemove([
        //     "calendar",
        //     "october_calendar",
        //     "gameState",
        // ]);
    };

    useEffect(() => {
        initializeApp();
    }, []);

    return <Home />;
}
