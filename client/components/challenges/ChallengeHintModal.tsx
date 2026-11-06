import { StyleSheet } from "react-native";
import Animated, { Easing, FadeIn, ZoomIn } from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { Colors } from "@/constants/Colors";
import { GAME_2048_ICON_TRANSFORMATION } from "@/constants/game2048Icons";
import { Challenge } from "@/interfaces/challengeInterface";

const IMAGE_ENTERING = ZoomIn.duration(600).easing(
    Easing.out(Easing.back(1.6)),
);
// The hint appears once the image has settled, on top of the modal's own fade.
const HINT_ENTERING = FadeIn.delay(350).duration(500);

interface ChallengeHintModalProps {
    challenge: Challenge | null;
    onClose: () => void;
}

export const ChallengeHintModal: React.FC<ChallengeHintModalProps> = ({
    challenge,
    onClose,
}) => (
    <ModalWithCloseButton visible={challenge !== null} onRequestClose={onClose}>
        {challenge && (
            <>
                <Animated.View entering={IMAGE_ENTERING} style={styles.image}>
                    <ActivityIcon
                        image={challenge.image}
                        transformation={GAME_2048_ICON_TRANSFORMATION}
                        backgroundColor={Colors.goldLight}
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
});
