import React, { useRef, useState } from "react";
import {
    Alert,
    LayoutChangeEvent,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { router } from "expo-router";
import { usePremium } from "@/contexts/PremiumContext";
import { ThemedText } from "@/components/ThemedText";
import { showPointsToast, showToast } from "@/components/utils/Toast";
import { StreakHeader } from "@/components/score/streak/StreakHeader";
import {
    CheckInDay,
    CHECK_IN_DAY_GAP,
    CHECK_IN_DAY_WIDTH,
    CHECK_IN_ROW_PADDING,
} from "@/components/score/streak/CheckInDay";
import { Colors } from "@/constants/Colors";
import { currentDay } from "@/constants/Dates";
import {
    CHECK_IN_JOKERS,
    CHECK_IN_LAST_DAY,
    getCheckInStreak,
    getUpcomingCheckInBonuses,
} from "@/constants/checkIn";
import { Score } from "@/interfaces/scoreInterface";
import { checkIn, spendCheckInJoker } from "@/services/score.service";

const DAYS = Array.from({ length: CHECK_IN_LAST_DAY }, (_, i) => i + 1);
const MISSED_MESSAGE = "La boule a été rangée dans le carton...";

const confirmJoker = (day: number, jokersLeft: number): Promise<boolean> => {
    const info =
        jokersLeft - 1 === 0
            ? `C'est votre dernier bonus.`
            : `Il vous restera ${jokersLeft - 1} bonus.`;
    return new Promise((resolve) =>
        Alert.alert(
            "Utiliser une boule bonus",
            `Souhaitez-vous accrocher la boule du ${day} décembre ? ${info}`,
            [
                {
                    text: "Annuler",
                    style: "cancel",
                    onPress: () => resolve(false),
                },
                { text: "Utiliser", onPress: () => resolve(true) },
            ],
            { cancelable: true, onDismiss: () => resolve(false) },
        ),
    );
};

interface CheckInStreakProps {
    scoreHistory: Score[];
    refreshScores: () => Promise<void>;
}

export const CheckInStreak: React.FC<CheckInStreakProps> = ({
    scoreHistory,
    refreshScores,
}) => {
    const scrollRef = useRef<ScrollView>(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isPremium } = usePremium();

    const checkedDays = new Set(
        scoreHistory.filter((s) => s.checkedIn).map((s) => s.dayNumber),
    );
    const pointsByDay = new Map(
        scoreHistory.map(({ dayNumber, scoreDetails }) => [
            dayNumber,
            scoreDetails.dayOpening +
                scoreDetails.contentOpening +
                scoreDetails.gameAnswer,
        ]),
    );
    const jokersLeft = isPremium
        ? CHECK_IN_JOKERS - scoreHistory.filter((s) => s.usedJoker).length
        : null;
    const checkedInToday = checkedDays.has(currentDay);
    const streak = getCheckInStreak(checkedDays, currentDay);
    const upcomingBonuses = getUpcomingCheckInBonuses(
        streak,
        checkedInToday,
        currentDay,
    );

    const handleCheckIn = async (): Promise<boolean> => {
        setPending(true);
        setError(null);
        try {
            const bonus = await checkIn(currentDay);
            await refreshScores();
            if (bonus > 0) showPointsToast(bonus);
            return true;
        } catch {
            setError(
                "Impossible d'accrocher la boule... Vérifiez votre connexion Internet.",
            );
            return false;
        } finally {
            setPending(false);
        }
    };

    // Resolves with whether a joker hung the bauble, so it can celebrate.
    const handleMissedPress = async (day: number): Promise<boolean> => {
        if (jokersLeft === null) {
            showToast(MISSED_MESSAGE, "long", {
                label: "Besoin d'une boule bonus ?",
                onPress: () => router.push("/informations/premium"),
            });
            return false;
        }
        if (jokersLeft === 0) {
            showToast(`${MISSED_MESSAGE} Vous n'avez plus de boules bonus.`);
            return false;
        }
        if (!(await confirmJoker(day, jokersLeft))) return false;

        setPending(true);
        setError(null);
        try {
            await spendCheckInJoker(day, currentDay);
            await refreshScores();
            return true;
        } catch {
            setError(
                "Impossible d'utiliser la boule bonus... Vérifiez votre connexion Internet.",
            );
            return false;
        } finally {
            setPending(false);
        }
    };

    // Centers today's cell once the row's width is known.
    const scrollToToday = (event: LayoutChangeEvent): void => {
        const { width } = event.nativeEvent.layout;
        const todayX =
            CHECK_IN_ROW_PADDING +
            (currentDay - 1) * (CHECK_IN_DAY_WIDTH + CHECK_IN_DAY_GAP);
        scrollRef.current?.scrollTo({
            x: Math.max(0, todayX - (width - CHECK_IN_DAY_WIDTH) / 2),
            animated: false,
        });
    };

    return (
        <View style={styles.container}>
            <StreakHeader streak={streak} checkedInToday={checkedInToday} />

            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                onLayout={scrollToToday}
                contentContainerStyle={styles.row}
            >
                {DAYS.map((day) => (
                    <CheckInDay
                        key={day}
                        day={day}
                        isChecked={checkedDays.has(day)}
                        usedJoker={scoreHistory[day - 1]?.usedJoker ?? false}
                        isNextChecked={checkedDays.has(day + 1)}
                        dayPoints={pointsByDay.get(day) ?? 0}
                        bonusPoints={upcomingBonuses.get(day)}
                        pending={pending}
                        onCheckIn={handleCheckIn}
                        onMissedPress={() => handleMissedPress(day)}
                    />
                ))}
            </ScrollView>

            {error && (
                <ThemedText
                    type="italic14"
                    style={styles.error}
                    accessibilityLiveRegion="polite"
                >
                    {error}
                </ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 28,
        paddingVertical: 12,
        gap: 4,
        backgroundColor: Colors.snow,
        borderRadius: 12,
    },
    row: {
        paddingHorizontal: CHECK_IN_ROW_PADDING,
        paddingTop: 12,
        gap: CHECK_IN_DAY_GAP,
    },
    error: {
        paddingHorizontal: 20,
        color: Colors.blue,
    },
});
