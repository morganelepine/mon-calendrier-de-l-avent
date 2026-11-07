import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ChallengeMedals } from "@/components/retrospective/ChallengeMedals";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";
import { getHigherThanText } from "@/components/retrospective/retrospectiveTexts";
import { CHALLENGES } from "@/data/challenges_data";
import { Retrospective } from "@/interfaces/retrospectiveInterface";
import { pluralWord } from "@/utils/pluralize";

type ChallengesSlideProps = Pick<Retrospective, "challengesCompleted"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const ChallengesSlide: React.FC<ChallengesSlideProps> = ({
    challengesCompleted,
    icon,
}) => (
    <>
        <ThemedText style={slideStyles.bigNumber}>
            {challengesCompleted.value}
        </ThemedText>
        <ThemedText style={slideStyles.title}>
            {pluralWord(
                challengesCompleted.value,
                "défi réussi",
                "défis réussis",
            )}
            {"\n"}sur {CHALLENGES.length}
        </ThemedText>
        <View style={styles.medals}>
            <ChallengeMedals completed={challengesCompleted.value} />
        </View>
        <Comparison
            text={getHigherThanText(challengesCompleted)}
            image={icon}
        />
    </>
);

const styles = StyleSheet.create({
    medals: {
        marginTop: 18,
    },
});
