import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Game2048Preview } from "@/components/activities/Game2048Preview";
import {
    activityCardBase,
    activityPressed,
} from "@/components/activities/activityStyles";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

export const Game2048Card: React.FC<{ onRulesPress: () => void }> = ({
    onRulesPress,
}) => {
    const title = `Le 2048 ${isOctober ? "d'automne" : "de Noël"}`;

    return (
        <View>
            <Pressable
                onPress={() => router.push("/bingo/game2048" as never)}
                accessibilityRole="button"
                accessibilityLabel={`${title} : jouer`}
                style={({ pressed }) => [
                    styles.card,
                    pressed && activityPressed,
                ]}
            >
                <Game2048Preview />
                <View style={styles.texts}>
                    <ThemedText style={styles.title}>{title}</ThemedText>
                    <View style={styles.action}>
                        <ThemedText style={styles.actionLabel}>
                            Jouer
                        </ThemedText>
                        <Ionicons
                            name="chevron-forward"
                            size={14}
                            color={Colors.snow}
                        />
                    </View>
                </View>
            </Pressable>

            {/* Sibling of the card, not a child: nested pressables would
                merge into a single accessibility element. */}
            <Pressable
                onPress={onRulesPress}
                accessibilityRole="button"
                accessibilityLabel={`${title} : règles du jeu`}
                hitSlop={8}
                style={styles.rulesButton}
            >
                <Ionicons
                    name="help-circle-outline"
                    size={22}
                    color={Colors.snow}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        ...activityCardBase,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        backgroundColor: Theme.orangeToRed,
    },
    texts: {
        flex: 1,
        gap: 4,
        // Keeps the title clear of the rules button.
        paddingRight: 20,
    },
    title: {
        fontSize: 20,
        lineHeight: 26,
        fontFamily: "FreightNeoBold",
        color: Colors.snow,
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 4,
    },
    actionLabel: {
        fontSize: 14,
        color: Colors.snow,
        paddingTop: 1,
    },
    rulesButton: {
        position: "absolute",
        top: 12,
        right: 12,
    },
});
