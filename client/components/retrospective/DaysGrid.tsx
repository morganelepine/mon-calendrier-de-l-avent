import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

const DAYS = Array.from({ length: 24 }, (_, i) => i + 1);
const COLUMNS = 6;
const GAP = 4;

interface DaysGridProps {
    openedDays: number[];
    cellSize: number;
    // What the grid sits on, for the missed boxes' outline.
    surface: "light" | "dark";
}

export const DaysGrid: React.FC<DaysGridProps> = ({
    openedDays,
    cellSize,
    surface,
}) => {
    const opened = new Set(openedDays);

    return (
        <View
            accessible
            accessibilityLabel={`${opened.size} cases ouvertes sur 24`}
            style={[
                styles.grid,
                { width: COLUMNS * cellSize + (COLUMNS - 1) * GAP },
            ]}
        >
            {DAYS.map((day) => (
                <View
                    key={day}
                    style={[
                        styles.cell,
                        { width: cellSize, height: cellSize },
                        opened.has(day)
                            ? styles.opened
                            : [styles.missed, missedStyles[surface].cell],
                    ]}
                >
                    <ThemedText
                        style={[
                            styles.day,
                            { fontSize: cellSize * 0.4 },
                            opened.has(day)
                                ? styles.openedDay
                                : missedStyles[surface].day,
                        ]}
                    >
                        {day}
                    </ThemedText>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: GAP,
    },
    cell: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    opened: {
        backgroundColor: Colors.autumnGreen,
    },
    missed: {
        borderWidth: 1,
    },
    day: {
        fontFamily: "PoppinsBold",
    },
    openedDay: {
        color: Colors.snow,
    },
});

const missedStyles = {
    light: StyleSheet.create({
        cell: { borderColor: "rgba(1,15,35,0.35)" },
        day: { color: "rgba(1,15,35,0.4)" },
    }),
    dark: StyleSheet.create({
        cell: { borderColor: "rgba(247,245,246,0.35)" },
        day: { color: "rgba(247,245,246,0.6)" },
    }),
};
