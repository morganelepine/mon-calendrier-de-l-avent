import { ThemedText } from "@/components/ThemedText";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import { CountUpNumber } from "@/components/retrospective/slides/CountUpNumber";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";
import {
    formatPercent,
    getHigherThanText,
} from "@/components/retrospective/retrospectiveTexts";
import { Retrospective } from "@/interfaces/retrospectiveInterface";

// 3 questions a day, days 1 to 24.
const MAX_CORRECT_ANSWERS = 24 * 3;

type GamesSlideProps = Pick<Retrospective, "correctAnswers"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const GamesSlide: React.FC<GamesSlideProps> = ({
    correctAnswers,
    icon,
}) => (
    <>
        <CountUpNumber
            value={Math.round(
                (correctAnswers.value / MAX_CORRECT_ANSWERS) * 100,
            )}
            format={formatPercent}
        />
        <ThemedText style={slideStyles.title}>
            de bonnes{"\n"}réponses{"\n"}aux jeux
        </ThemedText>
        <Comparison text={getHigherThanText(correctAnswers)} image={icon} />
    </>
);
