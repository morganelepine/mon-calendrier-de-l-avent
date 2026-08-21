import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface OffSeasonMessageProps {
    previousYearScore?: number;
}

export const OffSeasonMessage: React.FC<OffSeasonMessageProps> = ({
    previousYearScore = 0,
}) => {
    const previousYear = new Date().getFullYear() - 1;
    const message =
        previousYearScore > 0
            ? `Rendez-vous le 1er décembre pour tenter de surpasser les\u00A0${previousYearScore.toLocaleString(
                  "fr-FR",
              )}\u00A0points gagnés en ${previousYear}\u00A0!`
            : "Rendez-vous le 1er décembre pour commencer à gagner des\u00A0points\u00A0!";

    return (
        <ThemedText
            style={{
                marginBottom: 20,
                marginTop: 10,
                color: Colors.snow,
                textAlign: "center",
            }}
        >
            {message}
        </ThemedText>
    );
};
