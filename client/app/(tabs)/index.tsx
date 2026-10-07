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
        //     "userUuid",
        //     "username",
        //     "userId",
        //     "hasLaunched",
        //     "playMusic",
        //     "excluded_musics",
        //     "countdown_variant",
        //     "countdown_show_seconds",
        //     "countdown_target_day",
        //     "groupCreated",
        //     "halloween_notice_seen",
        //     "notifications_notice_seen",

        //     // YEARLY_RESET_KEYS
        //     "calendar",
        //     "october_calendar",
        //     "gameState",
        //     "bingo_halloween_clicked_cells",
        //     "bingo_movies_clicked_cells",
        //     "bingo_telefilms_clicked_cells",
        //     "bingo_activities_clicked_cells",
        //     "game2048_in_progress",
        //     "lastResetYear",
        // ]);
    };

    useEffect(() => {
        initializeApp();
    }, []);

    return <Home />;
}
