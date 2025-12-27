import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "@/components/calendar/Home";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";
import { NewsModal } from "@/components/calendar/NewsModal";

const today = new Date();
const currentYear = today.getFullYear();

async function resetDataIfNeeded() {
    try {
        const lastResetYear = await AsyncStorage.getItem("lastResetYear");
        if (!lastResetYear || lastResetYear !== currentYear.toString()) {
            await AsyncStorage.multiRemove([
                "calendar",
                "scoresData",
                "gameState",
                "storyGameAnswers",
                "bingo_clicked_cells",
                "bingo_grid",
                "bingo_activities_clicked_cells",
            ]);
            await AsyncStorage.setItem("lastResetYear", currentYear.toString());
        }
    } catch (error) {
        console.error("Error resetting data: ", error);
    }
}

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [newsModalVisible, setNewsModalVisible] = useState(false);

    const initializeApp = async () => {
        await resetDataIfNeeded();

        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        const news = await AsyncStorage.getItem("isNew");

        if (!hasLaunched) {
            setModalVisible(true);
        } else if (news !== "news-groups") {
            setNewsModalVisible(true);
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
        //     "isNew",
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
            <NewsModal
                modalVisible={newsModalVisible}
                setModalVisible={setNewsModalVisible}
            />
        </>
    );
}
