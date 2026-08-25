import { StyleSheet, View, Pressable } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface BingoCardProps {
    type: string;
    description: string;
    color: string;
    route: string;
}

export const BingoCard = ({
    type,
    description,
    color,
    route,
}: BingoCardProps) => {
    return (
        <View style={styles.card}>
            <ThemedText style={[styles.cardTitle, { color: color }]}>
                Bingo des {type} de&nbsp;Noël
            </ThemedText>
            <ThemedText style={styles.cardSubtitle}>{description}</ThemedText>
            <Pressable
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => router.push(`/bingo/${route}` as never)}
            >
                <ThemedText style={styles.buttonText}>Jouer</ThemedText>
            </Pressable>
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
});
