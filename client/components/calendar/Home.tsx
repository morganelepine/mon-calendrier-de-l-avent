import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { daysArray } from "@/data/days_data";
import { ThemedText } from "@/components/ThemedText";
import { Snowfall } from "@/components/utils/Snow";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { AudioPlayer } from "@/components/content/Audio";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface HomeProps {
    insets: EdgeInsets;
}

export const Home: React.FC<HomeProps> = ({ insets }) => {
    const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const today = new Date();
    const christmasDay = new Date(today.getFullYear(), 11, 25);
    const calendarDay = new Date(today.getFullYear(), 11, 1);

    const isChristmas =
        today.getDate() === christmasDay.getDate() &&
        today.getMonth() === christmasDay.getMonth();

    const isAfterChristmas =
        today.getDate() > christmasDay.getDate() &&
        today.getMonth() === christmasDay.getMonth();

    const daysToChristmas = Math.ceil(
        (christmasDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
    );
    const daysToCalendar = Math.ceil(
        (calendarDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
    );

    const daysMap = new Map(daysArray.map((day) => [day.dayNumber, day]));
    const day = daysMap.get(today.getDate());

    const backgroundImage = day
        ? getCloudinaryImageUrl(day?.background)
        : getCloudinaryImageUrl("11_pfqcwp");

    const music = day
        ? day?.music
        : "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/silent-night_ff2gwk.mp3";

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            style={styles.background}
            resizeMode="cover"
        >
            <Snowfall count={isChristmas ? 500 : 100} />

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
                    {isChristmas && (
                        <ThemedText
                            type="homeTitle"
                            style={styles.christmasText}
                        >
                            Joyeux Noël
                        </ThemedText>
                    )}

                    {!isChristmas && !isAfterChristmas && (
                        <>
                            <ThemedText type="homeTitle" style={styles.text1}>
                                {daysToChristmas}{" "}
                                {daysToChristmas > 1 ? "nuits" : "nuit"}
                            </ThemedText>
                            <ThemedText type="homeTitle">avant Noël</ThemedText>
                            {daysToCalendar > 0 && (
                                <ThemedText style={styles.text2}>
                                    (et {daysToCalendar} avant le départ du
                                    calendrier)
                                </ThemedText>
                            )}
                        </>
                    )}

                    {isAfterChristmas && (
                        <ThemedText type="homeTitle" style={{ fontSize: 38 }}>
                            Rendez-vous l'année prochaine !
                        </ThemedText>
                    )}
                </View>
            </CustomSafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    textContainer: {
        marginBottom: 250,
        flexDirection: "column",
    },
    text1: {
        letterSpacing: 9,
    },
    text2: {
        paddingTop: 20,
        color: Colors.snow,
        fontSize: 14,
    },
    christmasText: {
        marginTop: 100,
        fontSize: 75,
        lineHeight: 80,
        color: Colors.blue,
        textShadowColor: Colors.snow,
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
});
