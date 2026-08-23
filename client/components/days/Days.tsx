import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { DayButton } from "@/components/days/Button/DayButton";
import { Colors } from "@/constants/Colors";
import { saveScore } from "@/services/score.service";
import { Day } from "@/interfaces/dayInterface";
import { ScoreType } from "@/enums/enums";
import { currentDay, isDecember, isOctober } from "@/constants/Dates";

interface DaysProps {
    days: Day[];
    setDays: (days: Day[]) => void;
    goToDay: (
        day: Day,
        setModalVisible: (modalVisible: boolean) => void,
    ) => void;
}

export const Days: React.FC<DaysProps> = ({ days, setDays, goToDay }) => {
    const [dayModal, setDayModal] = useState<number | null>(null);

    const handleDayOpening = async (dayNumber: number) => {
        const updatedDays = days.map((day) => {
            return (isDecember || isOctober) &&
                day.dayNumber === dayNumber &&
                dayNumber <= currentDay &&
                !day.isOpen
                ? { ...day, isOpen: !day.isOpen }
                : day;
        });
        setDays(updatedDays);

        if ((isDecember || isOctober) && dayNumber <= currentDay) {
            if (isDecember && dayNumber === currentDay) {
                try {
                    await saveScore(
                        dayNumber,
                        40,
                        String(ScoreType.DayOpening),
                    );
                } catch (error) {
                    console.log("Error saving score:", error);
                    ToastAndroid.show(
                        "Oops... les points n'ont pas pu être enregistrés.",
                        ToastAndroid.LONG,
                    );
                }
            }
            setDayModal(dayNumber);
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }
    };

    const renderDayButton = (day: Day, flexSpan?: number) => (
        <DayButton
            key={day.dayNumber}
            day={day}
            flexSpan={flexSpan}
            handleDayOpening={handleDayOpening}
            modalVisible={dayModal === day.dayNumber}
            setModalVisible={() => setDayModal(null)}
            goToDay={goToDay}
        />
    );

    if (isOctober) {
        if (days.length < 31) {
            return <View style={styles.octoberContainer} />;
        }

        let cursor = 0;
        const rows = OCTOBER_ROWS_TEMPLATE.map((rowSpans) =>
            rowSpans.map((span) => ({ day: days[cursor++], span })),
        );

        return (
            <View style={styles.octoberContainer}>
                {rows.map((row) => (
                    <View key={row[0].day.dayNumber} style={styles.octoberRow}>
                        {row.map(({ day, span }) => renderDayButton(day, span))}
                    </View>
                ))}
            </View>
        );
    }

    return (
        <View style={styles.daysContainer}>
            {days.map((d) => renderDayButton(d))}
        </View>
    );
};

const OCTOBER_ROWS_TEMPLATE = [
    [2, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 2],
    [1, 1, 1, 1],
    [1, 2, 1],
    [1, 1, 1, 1],
    [2, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 2],
];

const styles = StyleSheet.create({
    daysContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        backgroundColor: Colors.green,
        padding: 5,
    },
    octoberContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.snow,
    },
    octoberRow: {
        flex: 1,
        flexDirection: "row",
    },
});
