import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { DayButton } from "@/components/days/Button/DayButton";
import { Colors } from "@/constants/Colors";
import { saveScore } from "@/services/score.service";
import { Day } from "@/interfaces/dayInterface";
import { ScoreType } from "@/enums/enums";
import { currentDay, isDecember } from "@/constants/Dates";

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
            return isDecember &&
                day.dayNumber === dayNumber &&
                dayNumber <= currentDay &&
                !day.isOpen
                ? { ...day, isOpen: !day.isOpen }
                : day;
        });
        setDays(updatedDays);

        if (isDecember && dayNumber <= currentDay) {
            if (dayNumber === currentDay) {
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

    return (
        <View style={styles.daysContainer}>
            {days.map((day) => (
                <DayButton
                    key={day.dayNumber}
                    day={day}
                    handleDayOpening={handleDayOpening}
                    modalVisible={dayModal === day.dayNumber}
                    setModalVisible={() => setDayModal(null)}
                    goToDay={goToDay}
                />
            ))}
        </View>
    );
};

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
});
