import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { daysArray } from "@/data/days_data";
import { Snowfall } from "@/components/utils/Snow";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { AudioPlayer } from "@/components/content/Audio";
import { ShareBackgroundPicker } from "@/components/utils/share/ShareBackgroundPicker";
import {
    HomeHeadline,
    useHomeShareMessage,
} from "@/components/calendar/HomeHeadline";
import { Colors, Theme } from "@/constants/Colors";
import {
    isOctober,
    currentDay,
    isDecember,
    isAfterChristmas,
} from "@/constants/Dates";
import { useChristmasTargetDay } from "@/contexts/CountdownVariantContext";
import { usePremium } from "@/contexts/PremiumContext";
import { useMusicSelection } from "@/contexts/MusicSelectionContext";
import {
    currentMusicSeason,
    getAvailableMusics,
    getMusicForDay,
} from "@/constants/Musics";
import { COUNTDOWN_SHARE_BACKGROUNDS } from "@/constants/shareBackgrounds";

// BACKGROUND IMAGES
const today = new Date().getDate();
const WINTER_BACKGROUND = "3_thng7s";
const HALLOWEEN_BACKGROUND =
    today < 20 ? "Rumeysa_Cinar_nhebdq" : "halloween_txyg5n"; // october

export const Home = () => {
    const insets = useSafeAreaInsets();
    const [targetDay] = useChristmasTargetDay(); // 24 or 25
    const { isPremium } = usePremium();
    const { excludedIds } = useMusicSelection();
    const shareMessage = useHomeShareMessage();
    const [pickerVisible, setPickerVisible] = useState(false);

    const showChristmasGreeting =
        isDecember && currentDay >= targetDay && !isAfterChristmas;

    const daysMap = new Map(daysArray.map((day) => [day.dayNumber, day]));
    const day = daysMap.get(currentDay);

    let backgroundImage;
    if (day && isDecember) {
        backgroundImage = day?.background;
    } else if (!day && isDecember) {
        backgroundImage = "11_pfqcwp";
    } else if (isOctober) {
        backgroundImage = HALLOWEEN_BACKGROUND;
    } else {
        backgroundImage = WINTER_BACKGROUND;
    }

    const shareBackgrounds = COUNTDOWN_SHARE_BACKGROUNDS.filter(
        (id) => id !== backgroundImage,
    );
    const music = getMusicForDay(
        currentDay,
        getAvailableMusics(currentMusicSeason, isPremium, excludedIds),
    );

    return (
        <>
            <StatusBar style="light" />
            <BackgroundImage image={backgroundImage}>
                {isDecember && (
                    <Snowfall count={showChristmasGreeting ? 500 : 100} />
                )}

                {shareMessage && (
                    <ShareBackgroundPicker
                        visible={pickerVisible}
                        onClose={() => setPickerVisible(false)}
                        backgrounds={shareBackgrounds}
                        message={shareMessage}
                        contentPosition="top"
                    >
                        <HomeHeadline />
                    </ShareBackgroundPicker>
                )}

                <CustomSafeAreaView>
                    <View style={[styles.actions, { top: insets.top + 10 }]}>
                        {shareMessage && (
                            <Pressable
                                onPress={() => setPickerVisible(true)}
                                style={styles.button}
                            >
                                <View style={styles.buttonBackground} />
                                <Ionicons
                                    name="share-social"
                                    size={26}
                                    color={Theme.orangeToBlue}
                                />
                            </Pressable>
                        )}
                        <AudioPlayer music={music?.url ?? ""} type="icon" />
                    </View>

                    <View style={styles.textContainer}>
                        <HomeHeadline />
                    </View>
                </CustomSafeAreaView>
            </BackgroundImage>
        </>
    );
};

const styles = StyleSheet.create({
    actions: {
        position: "absolute",
        right: 10,
        flexDirection: "row",
        gap: 10,
    },
    button: {
        height: 42,
        width: 42,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.snow,
        borderRadius: 50,
        opacity: 0.7,
    },
    textContainer: {
        marginBottom: 250,
        paddingHorizontal: 20,
    },
});
