import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home } from "@/components/calendar/Home";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";
import { useUser } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const today = new Date();
const currentYear = today.getFullYear();

async function resetDataIfNeeded() {
    try {
        const lastResetYear = await AsyncStorage.getItem("lastResetYear");
        if (!lastResetYear || lastResetYear !== currentYear.toString()) {
            await AsyncStorage.multiRemove(["calendar", "scoresData"]);
            await AsyncStorage.setItem("lastResetYear", currentYear.toString());
        }
        console.log({ lastResetYear });
    } catch (error) {
        console.error("Error resetting data: ", error);
    }
}

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            await resetDataIfNeeded();

            const firstLaunch = !(await AsyncStorage.getItem("hasLaunched"));

            if (firstLaunch) {
                setModalVisible(true);
                await AsyncStorage.setItem("hasLaunched", "true");
            }

            // if (!firstLaunch) {
            //     await AsyncStorage.multiRemove([
            //         "userUuid",
            //         "playMusic",
            //         "calendar",
            //         "scoresData",
            //         "lastResetYear",
            //         "hasLaunched",
            //     ]);
            // }
        };
        initializeApp();
    }, []);

    return (
        <>
            <Home insets={insets} />
            <FirstLaunchModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                insets={insets}
            />
        </>
    );
}
