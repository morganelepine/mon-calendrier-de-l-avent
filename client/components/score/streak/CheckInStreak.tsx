import React, { useRef, useState } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { currentDay } from "@/constants/Dates";
import {
    CHECK_IN_LAST_DAY,
    getCheckInStreak,
    getUpcomingCheckInBonuses,
} from "@/constants/checkIn";
import { Score } from "@/interfaces/scoreInterface";
import { checkIn } from "@/services/score.service";
import { showPointsToast } from "@/components/utils/Toast";
import { StreakHeader } from "@/components/score/streak/StreakHeader";
import {
    CheckInDay,
    CHECK_IN_DAY_GAP,
    CHECK_IN_DAY_WIDTH,
    CHECK_IN_ROW_PADDING,
} from "@/components/score/streak/CheckInDay";

const DAYS = Array.from({ length: CHECK_IN_LAST_DAY }, (_, i) => i + 1);

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
                        isNextChecked={checkedDays.has(day + 1)}
                        dayPoints={pointsByDay.get(day) ?? 0}
                        bonusPoints={upcomingBonuses.get(day)}
                        pending={pending}
                        onCheckIn={handleCheckIn}
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
