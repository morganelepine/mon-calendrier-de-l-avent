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
    isAfterChristmas,
    daysToCalendar,
    christmasDay,
    getDaysUntil,
    isHalloween,
    daysToHalloween,
} from "@/constants/Dates";
import { ChristmasTargetDay } from "@/enums/enums";
import { CountdownDisplay } from "@/components/calendar/Countdown/CountdownDisplay";
import {
    useCountdownVariant,
    useCountdownShowSeconds,
    useChristmasTargetDay,
} from "@/contexts/CountdownVariantContext";
import { usePremium } from "@/contexts/PremiumContext";
import { useMusicSelection } from "@/contexts/MusicSelectionContext";
import {
    currentMusicSeason,
    getAvailableMusics,
    getMusicForDay,
} from "@/constants/Musics";

// BACKGROUND IMAGES
const today = new Date().getDate();
const WINTER_BACKGROUND = "3_thng7s";
const HALLOWEEN_BACKGROUND =
    today < 20 ? "Rumeysa_Cinar_nhebdq" : "halloween_txyg5n"; // october

export const Home = () => {
    const insets = useSafeAreaInsets();
    const [countdownVariant] = useCountdownVariant();
    const [showSeconds] = useCountdownShowSeconds();
    const [targetDay] = useChristmasTargetDay(); // 24 or 25
    const { isPremium } = usePremium();
    const { excludedIds } = useMusicSelection();

    const countdownTargetDate = new Date(
        christmasDay.getFullYear(),
        11,
        targetDay,
    );
    const nightsToTarget = getDaysUntil(countdownTargetDate);

    const showCountdown = isDecember && currentDay < targetDay;
    const showChristmasGreeting =
        isDecember && currentDay >= targetDay && !isAfterChristmas;
    const christmasGreeting =
        targetDay === ChristmasTargetDay.Eve && currentDay === 24
            ? "Joyeux réveillon de Noël !"
            : "Joyeux Noël !";

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

                <CustomSafeAreaView>
                    <View
                        style={{
                            position: "absolute",
                            top: insets.top + 10,
                            right: 10,
                        }}
                    >
                        <AudioPlayer music={music?.url ?? ""} type="icon" />
                    </View>

                    {/* October: countdown to Halloween */}

                    {isOctober && !isHalloween && (
                        <>
                            <ThemedText
                                style={[styles.title, styles.countdown]}
                            >
                                {daysToHalloween}{" "}
                                {daysToHalloween > 1 ? "jours" : "jour"}
                            </ThemedText>
                            <ThemedText
                                style={[styles.title, styles.beforeCalendar]}
                            >
                                avant Halloween
                            </ThemedText>
                        </>
                    )}

                    {isHalloween && (
                        <ThemedText
                            style={[styles.title, styles.christmasGreeting]}
                        >
                            Happy{"\n"}Halloween
                        </ThemedText>
                    )}

                    {/* Before calendar departure */}

                    {!isDecember && !isOctober && (
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
                        {showCountdown && (
                            <CountdownDisplay
                                variant={countdownVariant}
                                nights={nightsToTarget}
                                targetDate={countdownTargetDate}
                                showSeconds={showSeconds}
                            />
                        )}

                        {/* Target day(s) reached, until the 26th */}

                        {showChristmasGreeting && (
                            <ThemedText
                                style={[styles.title, styles.christmasGreeting]}
                            >
                                {christmasGreeting}
                            </ThemedText>
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
        paddingHorizontal: 20,
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
    christmasGreeting: {
        fontSize: 40,
        letterSpacing: 1,
    },
    afterChristmas: {
        fontSize: 40,
        letterSpacing: 1,
    },
});
