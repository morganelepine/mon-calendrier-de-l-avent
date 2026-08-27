import { StyleSheet, View, Pressable } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface HubCardProps {
    title: string;
    description: string;
    color: string;
    route: string;
    onRulesPress?: () => void;
}

export const HubCard: React.FC<HubCardProps> = ({
    title,
    description,
    color,
    route,
    onRulesPress,
}) => {
    return (
        <View style={styles.card}>
            <ThemedText style={[styles.cardTitle, { color }]}>
                {title}
            </ThemedText>
            <ThemedText style={styles.cardSubtitle}>{description}</ThemedText>
            <Pressable
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => router.push(`/bingo/${route}` as never)}
            >
                <ThemedText style={styles.buttonText}>Jouer</ThemedText>
            </Pressable>
            {onRulesPress ? (
                <Pressable onPress={onRulesPress} style={styles.rulesButton}>
                    <ThemedText
                        type="italic14"
                        style={[styles.rulesButtonText, { color }]}
                    >
                        Règles du jeu
                    </ThemedText>
                </Pressable>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: Colors.snow,
        opacity: 0.9,
        gap: 8,
    },
    cardTitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "PallyBold",
    },
    cardSubtitle: {
        fontSize: 14,
        textAlign: "center",
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignSelf: "center",
    },
    buttonText: {
        color: Colors.snow,
    },
    rulesButton: {
        alignSelf: "center",
    },
    rulesButtonText: {
        textDecorationLine: "underline",
        fontSize: 12,
    },
});
