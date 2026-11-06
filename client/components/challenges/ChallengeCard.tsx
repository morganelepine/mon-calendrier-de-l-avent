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
    number: number; // Position in the list: ids have gaps on the PWA
    completed: boolean;
    onPress: (challenge: Challenge) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
    challenge,
    number,
    completed,
    onPress,
}) => {
    const status = completed ? "réussi" : "pas encore réussi";
    const textColor = { color: completed ? Colors.blue : Colors.snow };

    return (
        <Pressable
            onPress={() => onPress(challenge)}
            accessibilityRole="button"
            accessibilityLabel={`Défi ${number}, ${challenge.title}, ${status}`}
            accessibilityHint={completed ? undefined : "Affiche un indice"}
            style={({ pressed }) => [
                styles.card,
                completed && styles.completedCard,
                pressed && activityPressed,
            ]}
        >
            <View>
                <View style={!completed && styles.lockedImage}>
                    <ActivityIcon
                        image={challenge.image}
                        transformation={GAME_2048_ICON_TRANSFORMATION}
                        backgroundColor={Colors.lightBlue}
                    />
                </View>
                <View
                    style={[styles.badge, completed && styles.completedBadge]}
                >
                    <Ionicons
                        name={completed ? "checkmark-sharp" : "lock-closed"}
                        size={12}
                        color={completed ? Colors.blue : Colors.snow}
                    />
                </View>
            </View>
            <View style={styles.texts}>
                <ThemedText style={[styles.label, textColor]}>
                    DÉFI {number}
                </ThemedText>
                <ThemedText style={[styles.title, textColor]}>
                    {challenge.title}
                </ThemedText>
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
    completedCard: {
        backgroundColor: Colors.snow,
    },
    completedBadge: {
        backgroundColor: Colors.gold,
    },
    lockedImage: {
        opacity: 0.6,
    },
    badge: {
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
