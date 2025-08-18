import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <ThemedView style={styles.container}>
                <ThemedText>Oops... cette page n'existe pas.</ThemedText>
                <Link href="/" style={styles.link}>
                    <ThemedText>Retour à la page d'accueil</ThemedText>
                </Link>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    link: {
        backgroundColor: "#FBF5F3",
        marginTop: 40,
        padding: 10,
        borderRadius: 50,
    },
});
