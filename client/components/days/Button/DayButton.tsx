import { StyleSheet, Pressable, ViewStyle } from "react-native";
import { DayNumber } from "@/components/days/Button/DayNumber";
import { Colors } from "@/constants/Colors";
import { DayModal } from "@/components/days/Button/DayModal";
import { Day } from "@/interfaces/dayInterface";

interface DayButtonProps {
    day: Day;
    flexSpan?: number;
    handleDayOpening: (dayNumber: number) => void;
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    goToDay: (
        day: Day,
        setModalVisible: (modalVisible: boolean) => void,
    ) => void;
}

export const DayButton: React.FC<DayButtonProps> = ({
    day,
    flexSpan = 1,
    handleDayOpening,
    modalVisible,
    setModalVisible,
    goToDay,
}) => {
    const dayIsOpen = day.isOpen;

    return (
        <>
            <Pressable
                onPress={() => handleDayOpening(day.dayNumber)}
                style={[
                    styles.gridItem,
                    day.width || day.height
                        ? ({
                              width: day.width,
                              height: day.height,
                          } as ViewStyle)
                        : [styles.fillAvailableSpace, { flex: flexSpan }],
                    {
                        backgroundColor: dayIsOpen ? Colors.snow : day.color,
                        opacity: dayIsOpen ? 0.7 : 1,
                    } as ViewStyle,
                ]}
            >
                <DayNumber day={day} dayIsOpen={dayIsOpen} />
            </Pressable>

            <DayModal
                day={day}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                goToDay={goToDay}
            />
        </>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        justifyContent: "flex-end",
    },
    fillAvailableSpace: {
        flex: 1,
    },
});
