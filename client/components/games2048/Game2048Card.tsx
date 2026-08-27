import { StyleSheet, View, Pressable } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const Game2048Card = () => {
    return (
        <View style={styles.card}>
            <ThemedText
                style={[styles.cardTitle, { color: Colors.autumnGold }]}
            >
                2048 de Noël
            </ThemedText>
            <ThemedText style={styles.cardSubtitle}>
                Un plateau par jour, autant de tentatives que vous voulez : seul
                votre meilleur score du jour compte pour le classement.
            </ThemedText>
            <Pressable
                style={[styles.button, { backgroundColor: Colors.autumnGold }]}
                onPress={() => router.push("/bingo/game2048" as never)}
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
