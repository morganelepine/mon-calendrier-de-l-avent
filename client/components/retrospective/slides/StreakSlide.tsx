import { ThemedText } from "@/components/ThemedText";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";
import { getHigherThanText } from "@/components/retrospective/retrospectiveTexts";
import { Retrospective } from "@/interfaces/retrospectiveInterface";

type StreakSlideProps = Pick<Retrospective, "longestStreak"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const StreakSlide: React.FC<StreakSlideProps> = ({
    longestStreak,
    icon,
}) => (
    <>
        <ThemedText style={slideStyles.bigNumber}>
            {longestStreak.value}
        </ThemedText>
        <ThemedText style={slideStyles.title}>
            jours d'affilée{"\n"}sans manquer{"\n"}une case
        </ThemedText>
        <Comparison text={getHigherThanText(longestStreak)} image={icon} />
    </>
);
