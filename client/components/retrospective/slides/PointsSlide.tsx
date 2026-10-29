import { ThemedText } from "@/components/ThemedText";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";
import {
    formatNumber,
    getTopText,
} from "@/components/retrospective/retrospectiveTexts";
import { Retrospective } from "@/interfaces/retrospectiveInterface";

type PointsSlideProps = Pick<Retrospective, "points" | "playerCount"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const PointsSlide: React.FC<PointsSlideProps> = ({
    points,
    playerCount,
    icon,
}) => (
    <>
        <ThemedText style={slideStyles.bigNumber}>
            {formatNumber(points.value)}
        </ThemedText>
        <ThemedText style={slideStyles.title}>points</ThemedText>
        <Comparison
            text={getTopText(points.topPercent, playerCount)}
            image={icon}
        />
    </>
);
