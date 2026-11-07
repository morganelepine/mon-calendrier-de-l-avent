import Ionicons from "@expo/vector-icons/Ionicons";
import {
    EMPTY_CELL_COLORS,
    WaveGrid,
} from "@/components/retrospective/WaveGrid";
import { Colors } from "@/constants/Colors";
import { CHALLENGES } from "@/data/challenges_data";
import { pluralize } from "@/utils/pluralize";

const CELL_SIZE = 28;
const ICON_SIZE = 14;
const SURFACE = "light";
const WAVE_DELAY = 90;

export const ChallengeMedals: React.FC<{ completed: number }> = ({
    completed,
}) => (
    <WaveGrid
        count={CHALLENGES.length}
        filled={new Set(Array.from({ length: completed }, (_, i) => i + 1))}
        cellSize={CELL_SIZE}
        surface={SURFACE}
        filledColor={"#b92b39"}
        accessibilityLabel={`${pluralize(completed, "médaille")} sur ${CHALLENGES.length}`}
        waveDelay={WAVE_DELAY}
        animateEmpty
        renderContent={(_, isFilled) => (
            <Ionicons
                name={isFilled ? "star" : "star-outline"}
                size={ICON_SIZE}
                color={
                    isFilled ? Colors.snow : EMPTY_CELL_COLORS[SURFACE].content
                }
            />
        )}
    />
);
