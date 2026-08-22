import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { daysArray } from "@/data/days_data";
import { ThemedText } from "@/components/ThemedText";
import { Snowfall } from "@/components/utils/Snow";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { AudioPlayer } from "@/components/content/Audio";
import { Colors } from "@/constants/Colors";
import {
    isHalloween,
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
    } else if (isHalloween) {
        backgroundImage = HALLOWEEN_BACKGROUND;
    } else {
        backgroundImage = WINTER_BACKGROUND;
    }

    let music;
    if (day && isDecember) {
        music = day.music;
    } else if (isHalloween) {
        music =
            currentDay % 2 === 0
                ? HALLOWEEN_MUSIC_EVEN_DAYS
                : HALLOWEEN_MUSIC_ODD_DAYS;
    } else {
        music = DEFAULT_MUSIC;
    }

    return (
        <>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
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

                    <View style={styles.textContainer}>
                        {/* {isChristmas && (
                            <ThemedText
                                type="homeTitle"
                                style={styles.isChristmas}
                            >
                                Joyeux Noël
                            </ThemedText>
                        )} */}

                        {!isChristmas && !isAfterChristmas && isDecember && (
                            <>
                                <ThemedText
                                    type="homeTitle"
                                    style={styles.text1}
                                >
                                    {daysToChristmas}{" "}
                                    {daysToChristmas > 1 ? "nuits" : "nuit"}
                                </ThemedText>
                                <ThemedText type="homeTitle">
                                    avant Noël
                                </ThemedText>
                            </>
                        )}

                        {!isDecember && (
                            <>
                                <ThemedText
                                    type="homeTitle"
                                    style={styles.text1}
                                >
                                    {daysToCalendar}{" "}
                                    {daysToCalendar > 1 ? "jours" : "jour"}
                                </ThemedText>
                                <ThemedText style={styles.beforeCalendar}>
                                    avant le départ du calendrier
                                </ThemedText>
                            </>
                        )}

                        {isAfterChristmas && (
                            <ThemedText
                                type="homeTitle"
                                style={styles.afterChristmas}
                            >
                                Rendez-vous l'année prochaine !
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
        flexDirection: "column",
    },
    text1: {
        letterSpacing: 9,
    },
    isChristmas: {
        marginTop: 100,
        fontSize: 75,
        lineHeight: 80,
        color: Colors.blue,
        textShadowColor: Colors.snow,
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
    afterChristmas: {
        fontSize: 40,
        letterSpacing: 3,
    },
    beforeCalendar: {
        color: Colors.snow,
        fontSize: 20,
        marginBottom: 30,
        textAlign: "center",
    },
});
