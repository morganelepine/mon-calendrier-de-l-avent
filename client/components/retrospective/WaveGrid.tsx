import { StyleSheet, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const COLUMNS = 6;
const GAP = 4;

export type GridSurface = "light" | "dark";

// Outline and content colors of the empty cells, by what the grid sits on.
export const EMPTY_CELL_COLORS: Record<
    GridSurface,
    { border: string; content: string }
> = {
    light: { border: "rgba(1,15,35,0.35)", content: "rgba(1,15,35,0.4)" },
    dark: { border: "rgba(247,245,246,0.35)", content: "rgba(247,245,246,0.6)" },
};

interface WaveGridProps {
    count: number;
    filled: Set<number>; // Items, from 1 to count
    cellSize: number;
    surface: GridSurface;
    filledColor: string;
    accessibilityLabel: string;
    renderContent: (item: number, isFilled: boolean) => React.ReactNode;
    // Ms between two cells. Without it, the grid is static.
    waveDelay?: number;
    // The empty cells join the wave instead of being there from the start.
    animateEmpty?: boolean;
}

// Round cells in rows of 6, the filled ones popping in as a wave.
export const WaveGrid: React.FC<WaveGridProps> = ({
    count,
    filled,
    cellSize,
    surface,
    filledColor,
    accessibilityLabel,
    renderContent,
    waveDelay,
    animateEmpty = false,
}) => {
    const items = Array.from({ length: count }, (_, i) => i + 1);

    const renderCell = (item: number, isFilled: boolean): React.ReactNode => (
        <View
            style={[
                styles.cell,
                { width: cellSize, height: cellSize },
                isFilled
                    ? { backgroundColor: filledColor }
                    : [
                          styles.empty,
                          { borderColor: EMPTY_CELL_COLORS[surface].border },
                      ],
            ]}
        >
            {renderContent(item, isFilled)}
        </View>
    );

    return (
        <View
            accessible
            accessibilityLabel={accessibilityLabel}
            style={[
                styles.grid,
                { width: COLUMNS * cellSize + (COLUMNS - 1) * GAP },
            ]}
        >
            {items.map((item) =>
                waveDelay !== undefined &&
                (animateEmpty || filled.has(item)) ? (
                    <Animated.View
                        key={item}
                        entering={ZoomIn.delay(item * waveDelay)
                            .springify()
                            .damping(40)}
                    >
                        {renderCell(item, filled.has(item))}
                    </Animated.View>
                ) : (
                    <View key={item}>
                        {renderCell(item, filled.has(item))}
                    </View>
                ),
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: GAP,
    },
    cell: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    empty: {
        borderWidth: 1,
    },
});
