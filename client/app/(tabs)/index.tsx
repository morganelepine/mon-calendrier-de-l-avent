import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "@/components/calendar/Home";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";

const today = new Date();
const currentYear = today.getFullYear();

async function resetDataIfNeeded() {
    try {
        const lastResetYear = await AsyncStorage.getItem("lastResetYear");
        if (!lastResetYear || lastResetYear !== currentYear.toString()) {
            await AsyncStorage.multiRemove(["calendar", "scoresData"]);
            await AsyncStorage.setItem("lastResetYear", currentYear.toString());
        }
        await AsyncStorage.multiRemove(["bingo_clicked_cells", "bingo_grid"]);
    } catch (error) {
        console.error("Error resetting data: ", error);
    }
}

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const initializeApp = async () => {
        await resetDataIfNeeded();

        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (!hasLaunched) {
            setModalVisible(true);
        }

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
        // ]);
    };

    useEffect(() => {
        initializeApp();
    }, []);

    return (
        <>
            <Home />
            <FirstLaunchModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
