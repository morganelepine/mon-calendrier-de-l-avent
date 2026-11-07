import { ThemedText } from "@/components/ThemedText";
import {
    EMPTY_CELL_COLORS,
    GridSurface,
    WaveGrid,
} from "@/components/retrospective/WaveGrid";
import { Colors } from "@/constants/Colors";

const DAYS_COUNT = 24;
const WAVE_DELAY = 20;

interface DaysGridProps {
    openedDays: number[];
    cellSize: number;
    // What the grid sits on, for the missed boxes' outline.
    surface: GridSurface;
    animated?: boolean;
}

export const DaysGrid: React.FC<DaysGridProps> = ({
    openedDays,
    cellSize,
    surface,
    animated = false,
}) => {
    const opened = new Set(openedDays);

    return (
        <WaveGrid
            count={DAYS_COUNT}
            filled={opened}
            cellSize={cellSize}
            surface={surface}
            filledColor={Colors.autumnGreen}
            accessibilityLabel={`${opened.size} cases ouvertes sur ${DAYS_COUNT}`}
            waveDelay={animated ? WAVE_DELAY : undefined}
            renderContent={(day, isOpened) => (
                <ThemedText
                    style={[
                        {
                            fontFamily: "PoppinsBold",
                            fontSize: cellSize * 0.4,
                            color: isOpened
                                ? Colors.snow
                                : EMPTY_CELL_COLORS[surface].content,
                        },
                    ]}
                >
                    {day}
                </ThemedText>
            )}
        />
    );
};
