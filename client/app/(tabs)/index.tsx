import React, { useEffect, useState } from "react";
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
    } catch (error) {
        console.error("Error resetting data: ", error);
    }
}

export default function HomeScreen() {
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

            // await AsyncStorage.multiRemove([
            //     "userUuid",
            //     "playMusic",
            //     "calendar",
            //     "hasLaunched",
            //     "lastResetYear",
            //     "newUsername",
            //     "username",
            //     "gameState",
            //     "bingo_clicked_cells",
            //     "bingo_grid",
            //     "scoresData",
            // ]);
        };
        initializeApp();
    }, []);

    return (
        <>
            <Home />
            <FirstLaunchModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <UsernameModal
                modalVisible={usernameModalVisible}
                setModalVisible={setUsernameModalVisible}
            />
        </>
    );
}
