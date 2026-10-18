import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
    pillButtonBase,
    pillButtonTextBase,
} from "@/components/utils/buttons/pillButtonStyles";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Les lutins sont perdus" }} />
            <ThemedView style={styles.container}>
                <ThemedText style={styles.text}>
                    Oops... cette page n'existe pas.
                </ThemedText>
                <Link href="/" style={styles.link}>
                    <ThemedText style={pillButtonTextBase}>
                        Retour à la page d'accueil
                    </ThemedText>
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
        backgroundColor: Colors.blue,
        padding: 20,
    },
    link: {
        ...pillButtonBase,
        backgroundColor: Colors.autumnGreen,
        borderWidth: 1,
        borderColor: Colors.snow,
        paddingVertical: 8,
        height: null,
    },
    text: {
        color: Colors.snow,
        marginBottom: 20,
    },
});
