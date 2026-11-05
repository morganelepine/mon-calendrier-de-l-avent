import { useRef } from "react";
import { StyleSheet, Pressable, View, ViewStyle } from "react-native";
import { DayNumber } from "@/components/days/Button/DayNumber";
import { DayCellRect } from "@/components/days/DayReveal";
import { Colors } from "@/constants/Colors";
import { Day } from "@/interfaces/dayInterface";

interface DayButtonProps {
    day: Day;
    flexSpan?: number;
    handleDayOpening: (dayNumber: number, cell: DayCellRect) => void;
}

export const DayButton: React.FC<DayButtonProps> = ({
    day,
    flexSpan = 1,
    handleDayOpening,
}) => {
    const dayIsOpen = day.isOpen;
    const cellRef = useRef<View>(null);

    const onPress = (): void => {
        // Measure the cell's position and dimensions relative to the root view.
        cellRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
            handleDayOpening(day.dayNumber, {
                x: pageX,
                y: pageY,
                width,
                height,
            });
        });
    };

    return (
        <Pressable
            ref={cellRef}
            onPress={onPress}
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
