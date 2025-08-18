import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "@/components/calendar/Home";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";

const today = new Date();
const currentYear = today.getFullYear();

async function resetDataIfNeeded() {
    try {
        const lastResetYear = await AsyncStorage.getItem("lastResetYear");
        if (!lastResetYear || lastResetYear !== currentYear.toString()) {
            const storage = await AsyncStorage.multiGet([
                "calendar",
                "scoresData",
            ]);

            if (storage) {
                await AsyncStorage.multiRemove(["calendar", "scoresData"]);
            }

            await AsyncStorage.setItem("lastResetYear", currentYear.toString());
        }
        console.log({ lastResetYear });
    } catch (error) {
        console.error("Error resetting data: ", error);
    }
}

const checkFirstLaunch = async (setModalVisible: (arg: boolean) => void) => {
    const userUuid = await AsyncStorage.getItem("userUuid");
    console.log({ userUuid });

    if (!userUuid) {
        const newUserUuid: string = uuid.v4() as string;
        await AsyncStorage.setItem("userUuid", newUserUuid);
        console.log({ newUserUuid });

        setModalVisible(true);
    }

    // if (userUuid) {
    //     await AsyncStorage.multiRemove([
    //         "userUuid",
    //         "playMusic",
    //         "calendar",
    //         "scoresData",
    //         "lastResetYear",
    //     ]);
    // }
};

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            await resetDataIfNeeded();
            await checkFirstLaunch(setModalVisible);
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
