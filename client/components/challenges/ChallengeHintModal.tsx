import { StyleSheet } from "react-native";
import Animated, { Easing, FadeIn, ZoomIn } from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { Colors } from "@/constants/Colors";
import { Challenge } from "@/interfaces/challengeInterface";

const IMAGE_ENTERING = ZoomIn.duration(600).easing(
    Easing.out(Easing.back(1.6)),
);
// The hint appears once the image has settled, on top of the modal's own fade.
const HINT_ENTERING = FadeIn.delay(350).duration(500);

interface ChallengeHintModalProps {
    challenge: Challenge | null;
    completed: boolean;
    onClose: () => void;
}

export const ChallengeHintModal: React.FC<ChallengeHintModalProps> = ({
    challenge,
    completed,
    onClose,
}) => (
    <ModalWithCloseButton visible={challenge !== null} onRequestClose={onClose}>
        {challenge && (
            <>
                <Animated.View entering={IMAGE_ENTERING} style={styles.image}>
                    <ActivityIcon
                        image={challenge.image}
                        backgroundColor={Colors.blue}
                        size={120}
                    />
                </Animated.View>
                <Animated.View entering={HINT_ENTERING}>
                    <ThemedText
                        type="modalTitle"
                        accessibilityRole="header"
                        style={styles.title}
                    >
                        {challenge.title}
                    </ThemedText>
                    <ThemedText type="sectionText" style={styles.hint}>
                        {challenge.hint}
                    </ThemedText>
                    {challenge.author && (
                        <ThemedText type="sectionText" style={styles.author}>
                            {challenge.author}
                        </ThemedText>
                    )}
                    {completed && (
                        <>
                            <ThemedText
                                type="sectionText"
                                style={styles.reason}
                            >
                                {challenge.reason}
                            </ThemedText>
                            <ThemedText type="sectionText" style={styles.won}>
                                Défi réussi, bravo !
                            </ThemedText>
                        </>
                    )}
                </Animated.View>
            </>
        )}
    </ModalWithCloseButton>
);

const styles = StyleSheet.create({
    image: {
        marginTop: 28,
    },
    title: {
        marginTop: 0,
        paddingHorizontal: 20,
        fontSize: 24,
    },
    hint: {
        textAlign: "center",
        marginTop: 12,
    },
    author: {
        fontFamily: "PoppinsItalic",
        fontSize: 12,
        textAlign: "center",
    },
    reason: {
        backgroundColor: Colors.lightBlue,
        color: Colors.snow,
        textAlign: "center",
        marginTop: 16,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingTop: 4,
        borderRadius: 24,
        alignSelf: "center",
    },
    won: {
        fontSize: 14,
        color: Colors.lightBlue,
        textAlign: "center",
        marginTop: 4,
    },
});
