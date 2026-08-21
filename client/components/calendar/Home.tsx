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
    currentDay,
    isDecember,
    isChristmas,
    isAfterChristmas,
    daysToChristmas,
    daysToCalendar,
} from "@/constants/Dates";

export const Home = () => {
    const insets = useSafeAreaInsets();

    const daysMap = new Map(daysArray.map((day) => [day.dayNumber, day]));
    const day = daysMap.get(currentDay);

    let backgroundImage;
    if (day && isDecember) {
        backgroundImage = day?.background;
    } else if (!day && isDecember) {
        backgroundImage = "11_pfqcwp";
    } else {
        backgroundImage = "3_thng7s";
    }

    const music = day
        ? day?.music
        : "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/silent-night_ff2gwk.mp3";

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
