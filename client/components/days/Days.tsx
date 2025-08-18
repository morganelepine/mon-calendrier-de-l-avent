import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { DayButton } from "@/components/days/Button/DayButton";
import { Colors } from "@/constants/Colors";
import { updateScores } from "@/services/score.service";
import { Day } from "@/interfaces/dayInterface";
import { ScoreType } from "@/enums/enums";

interface DaysProps {
    days: Day[];
    setDays: (days: Day[]) => void;
    goToDay: (day: Day) => void;
}

export const Days: React.FC<DaysProps> = ({ days, setDays, goToDay }) => {
    const [dayModal, setDayModal] = useState<number | null>(null);
    const isDecember = new Date().getMonth() === 11;

    const handleDayOpening = async (dayNumber: number) => {
        const todayDay = new Date().getDate();

        const updatedDays = days.map((day) => {
            return isDecember &&
                day.dayNumber === dayNumber &&
                dayNumber <= todayDay &&
                !day.isOpen
                ? { ...day, isOpen: !day.isOpen }
                : day;
        });
        setDays(updatedDays);

        if (isDecember && dayNumber <= todayDay) {
            setDayModal(dayNumber);
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }

        if (isDecember && dayNumber === todayDay) {
            await updateScores(dayNumber, ScoreType.DayOpening);
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
