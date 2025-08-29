import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home } from "@/components/calendar/Home";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsernameModal from "@/components/calendar/UsernameModal";

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
    const [usernameModalVisible, setUsernameModalVisible] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            await resetDataIfNeeded();

            const hasLaunched = await AsyncStorage.getItem("hasLaunched");
            const newUsername = await AsyncStorage.getItem("newUsername");

            if (!hasLaunched) {
                setModalVisible(true);
            } else if (!newUsername) {
                setUsernameModalVisible(true);
            }

            // if (hasLaunched) {
            //     await AsyncStorage.multiRemove([
            //         "userUuid",
            //         "playMusic",
            //         "calendar",
            //         "scoresData",
            //         "lastResetYear",
            //         "hasLaunched",
            //         "newUsername",
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
            <UsernameModal
                modalVisible={usernameModalVisible}
                setModalVisible={setUsernameModalVisible}
            />
        </>
    );
}
