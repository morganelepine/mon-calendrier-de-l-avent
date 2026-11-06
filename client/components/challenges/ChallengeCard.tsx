import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import {
    activityCardBase,
    activityPressed,
} from "@/components/activities/activityStyles";
import { Colors } from "@/constants/Colors";
import { GAME_2048_ICON_TRANSFORMATION } from "@/constants/game2048Icons";
import { Challenge } from "@/interfaces/challengeInterface";

interface ChallengeCardProps {
    challenge: Challenge;
    onPress: (challenge: Challenge) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
    challenge,
    onPress,
}) => {
    return (
        <Pressable
            onPress={() => onPress(challenge)}
            accessibilityRole="button"
            accessibilityLabel={`Défi ${challenge.id}, ${challenge.title}, pas encore réussi`}
            accessibilityHint="Affiche un indice"
            style={({ pressed }) => [styles.card, pressed && activityPressed]}
        >
            <View>
                <View style={styles.lockedImage}>
                    <ActivityIcon
                        image={challenge.image}
                        transformation={GAME_2048_ICON_TRANSFORMATION}
                        backgroundColor={Colors.lightBlue}
                    />
                </View>
                <View style={styles.lockBadge}>
                    <Ionicons
                        name="lock-closed"
                        size={12}
                        color={Colors.snow}
                    />
                </View>
            </View>
            <View style={styles.texts}>
                <ThemedText style={styles.label}>
                    DÉFI {challenge.id}
                </ThemedText>
                <ThemedText style={styles.title}>{challenge.title}</ThemedText>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        ...activityCardBase,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    lockedImage: {
        opacity: 0.6,
    },
    lockBadge: {
        position: "absolute",
        right: -4,
        bottom: -4,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue,
    },
    texts: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        fontFamily: "PoppinsBold",
        letterSpacing: 1,
        color: Colors.snow,
    },
    title: {
        fontSize: 18,
        fontFamily: "FreightNeoBold",
        paddingTop: 0,
        color: Colors.snow,
    },
});
