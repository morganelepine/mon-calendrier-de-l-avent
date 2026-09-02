import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { daysArray } from "@/data/days_data";
import { ThemedText } from "@/components/ThemedText";
import { Snowfall } from "@/components/utils/Snow";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { AudioPlayer } from "@/components/content/Audio";
import { Colors } from "@/constants/Colors";
import {
    isOctober,
    currentDay,
    isDecember,
    isChristmas,
    isAfterChristmas,
    daysToChristmas,
    daysToCalendar,
} from "@/constants/Dates";

// BACKGROUND IMAGES
const WINTER_BACKGROUND = "3_thng7s";
const HALLOWEEN_BACKGROUND = "halloween_txyg5n"; // october

// MUSICS
const DEFAULT_MUSIC =
    "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/silent-night_ff2gwk.mp3";
const HALLOWEEN_MUSIC_EVEN_DAYS =
    "https://res.cloudinary.com/deauthz29/video/upload/Dmitry-Taras-Halloween_gacrmx.mp3";
const HALLOWEEN_MUSIC_ODD_DAYS =
    "https://res.cloudinary.com/deauthz29/video/upload/Mikhail-Smusev-Halloween_jqgdtd.mp3";

export const Home = () => {
    const insets = useSafeAreaInsets();

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

    let music;
    if (day && isDecember) {
        music = day.music;
    } else if (isOctober) {
        music =
            currentDay % 2 === 0
                ? HALLOWEEN_MUSIC_EVEN_DAYS
                : HALLOWEEN_MUSIC_ODD_DAYS;
    } else {
        music = DEFAULT_MUSIC;
    }

    return (
        <>
            <StatusBar style="light" />
            <BackgroundImage image={backgroundImage}>
                {isDecember && <Snowfall count={isChristmas ? 500 : 100} />}

                <CustomSafeAreaView>
                    <View
                        style={{
                            position: "absolute",
                            top: insets.top + 10,
                            right: 10,
                        }}
                    >
                        <AudioPlayer music={music} />
                    </View>

                    {/* Before calendar departure */}

                    {!isDecember && (
                        <>
                            <ThemedText
                                style={[styles.title, styles.countdown]}
                            >
                                {daysToCalendar}{" "}
                                {daysToCalendar > 1 ? "jours" : "jour"}
                            </ThemedText>
                            <ThemedText
                                style={[styles.title, styles.beforeCalendar]}
                            >
                                avant le départ du calendrier
                            </ThemedText>
                        </>
                    )}

                    {/* During calendar period */}

                    <View style={styles.textContainer}>
                        {isDecember && !isChristmas && !isAfterChristmas && (
                            <>
                                <ThemedText
                                    style={[styles.title, styles.countdown]}
                                >
                                    {daysToChristmas}{" "}
                                    {daysToChristmas > 1 ? "nuits" : "nuit"}
                                </ThemedText>
                                <ThemedText
                                    style={[
                                        styles.title,
                                        styles.beforeChristmas,
                                    ]}
                                >
                                    avant Noël
                                </ThemedText>
                            </>
                        )}

                        {/* After calendar period, in december only */}

                        {isAfterChristmas && (
                            <ThemedText
                                style={[styles.title, styles.afterChristmas]}
                            >
                                Rendez-vous l'année prochaine&nbsp;!
                            </ThemedText>
                        )}
                    </View>
                </CustomSafeAreaView>
            </BackgroundImage>
        </>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        marginBottom: 250,
        paddingHorizontal: 15,
    },
    title: {
        fontFamily: "FreightNeoBold",
        letterSpacing: 0.4,
        textAlign: "center",
        color: Colors.snow,
    },
    countdown: {
        fontSize: 55,
        letterSpacing: 6,
    },
    beforeCalendar: {
        fontSize: 20,
        fontFamily: "FreightNeo",
        marginBottom: 30,
    },
    beforeChristmas: {
        fontSize: 28,
        fontFamily: "FreightNeo",
    },
    afterChristmas: {
        fontSize: 40,
        letterSpacing: 1,
    },
});
