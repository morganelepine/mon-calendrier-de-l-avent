import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    LayoutChangeEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
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

const CELL_WIDTH = 40;
const CELL_GAP = 6;
const DAYS = Array.from({ length: CHECK_IN_LAST_DAY }, (_, i) => i + 1);

const pluralize = (count: number, word: string): string =>
    `${count} ${word}${count > 1 ? "s" : ""}`;

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
    const checkedInToday = checkedDays.has(currentDay);
    const streak = getCheckInStreak(checkedDays, currentDay);
    const upcomingBonuses = getUpcomingCheckInBonuses(
        streak,
        checkedInToday,
        currentDay,
    );

    const handleCheckIn = async (): Promise<void> => {
        setPending(true);
        setError(null);
        try {
            await checkIn(currentDay);
            await refreshScores();
        } catch {
            setError(
                "Impossible de pointer... Vérifiez votre connexion Internet.",
            );
        } finally {
            setPending(false);
        }
    };

    // Centers today's cell once the row's width is known.
    const scrollToToday = (event: LayoutChangeEvent): void => {
        const { width } = event.nativeEvent.layout;
        const todayX = (currentDay - 1) * (CELL_WIDTH + CELL_GAP);
        scrollRef.current?.scrollTo({
            x: Math.max(0, todayX - (width - CELL_WIDTH) / 2),
            animated: false,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="flame" size={22} color={Colors.blue} />
                <ThemedText style={styles.title}>
                    {streak > 0
                        ? `${pluralize(streak, "jour")} de série quotidienne`
                        : "Commencez votre série"}
                </ThemedText>
            </View>
            {(streak === 0 || !checkedInToday) && (
                <ThemedText type="italic14" style={styles.text}>
                    Cliquez sur la case du jour pour valider votre série !
                </ThemedText>
            )}

            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                onLayout={scrollToToday}
                contentContainerStyle={styles.row}
            >
                {DAYS.map((day) => (
                    <View key={day} style={styles.column}>
                        {renderCell(day)}
                        {/* Already part of the cell's accessibility label. */}
                        <Text
                            style={styles.bonus}
                            importantForAccessibility="no"
                            accessibilityElementsHidden
                        >
                            {upcomingBonuses.has(day)
                                ? `+${upcomingBonuses.get(day)} pts`
                                : ""}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {error && (
                <ThemedText
                    type="italic14"
                    style={styles.text}
                    accessibilityLiveRegion="polite"
                >
                    {error}
                </ThemedText>
            )}
        </View>
    );

    function renderCell(day: number): React.ReactElement {
        const isChecked = checkedDays.has(day);
        const isToday = day === currentDay;
        const bonusLabel = upcomingBonuses.has(day)
            ? `, bonus de ${upcomingBonuses.get(day)} points`
            : "";

        if (isToday && !isChecked) {
            return (
                <Pressable
                    onPress={handleCheckIn}
                    disabled={pending}
                    accessibilityRole="button"
                    accessibilityLabel={`Pointer le ${day} décembre${bonusLabel}`}
                    accessibilityState={{
                        disabled: pending,
                        busy: pending,
                    }}
                    style={({ pressed }) => [
                        styles.cell,
                        styles.todayCell,
                        pressed && styles.pressed,
                    ]}
                >
                    {pending ? (
                        <ActivityIndicator size="small" color={Colors.snow} />
                    ) : (
                        <Text style={styles.cellDay}>{day}</Text>
                    )}
                </Pressable>
            );
        }

        const isMissed = !isChecked && day < currentDay;
        const status = isChecked ? "pointé" : isMissed ? "manqué" : "à venir";

        return (
            <View
                accessible
                accessibilityLabel={`${day} décembre, ${status}${bonusLabel}`}
                style={[
                    styles.cell,
                    isChecked && styles.checkedCell,
                    isChecked && isToday && styles.todayBorder,
                    isMissed && styles.missedCell,
                    !isChecked && !isMissed && styles.futureCell,
                ]}
            >
                <Text
                    style={[
                        styles.cellDay,
                        (isMissed || (!isToday && !isChecked)) &&
                            styles.missedText,
                    ]}
                >
                    {day}
                </Text>
            </View>
        );
    }
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: "FreightNeoBold",
        color: Colors.blue,
        fontSize: 20,
        paddingTop: 0,
    },
    text: {
        paddingHorizontal: 20,
    },
    row: {
        paddingHorizontal: 20,
        paddingTop: 8,
        gap: CELL_GAP,
    },
    column: {
        width: CELL_WIDTH,
        alignItems: "center",
        gap: 2,
    },
    bonus: {
        fontFamily: "PoppinsBold",
        fontSize: 10,
        lineHeight: 16,
        color: Colors.green,
    },
    cell: {
        width: CELL_WIDTH,
        height: CELL_WIDTH,
        borderRadius: CELL_WIDTH / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    todayCell: {
        backgroundColor: Colors.red,
    },
    pressed: {
        opacity: 0.7,
    },
    checkedCell: {
        backgroundColor: Colors.green,
    },
    todayBorder: {
        borderWidth: 2,
        borderColor: Colors.gold,
    },
    missedCell: {
        backgroundColor: Colors.disabled,
    },
    futureCell: {
        borderWidth: 1,
        borderColor: Colors.disabled,
    },
    cellDay: {
        fontFamily: "PoppinsBold",
        paddingTop: 3,
        fontSize: 16,
        color: Colors.snow,
    },
    missedText: {
        color: Colors.disabledText,
    },
});
