import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function CopyrightsScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <ThemedText type="sectionText">
                    Cette application est un projet collaboratif : 2 personnes
                    ont accepté de mettre leurs talents artistiques à
                    disposition pour rendre cette application encore plus
                    magique.
                </ThemedText>
                <ThemedText type="sectionText">
                    ❤️ Merci merci merci à vous ❤️
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">Annaëlle</ThemedText>
                <ThemedText type="sectionText">
                    ...qui a dessiné 12 superbes fonds d'écran pour l'onglet
                    Décompte (jours 3, 4, 6, 7, 9, 11, 13, 14, 17, 19, 24, 25).
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">William</ThemedText>
                <ThemedText type="sectionText">
                    ...qui a enregistré Petit papa Noël au piano (à écouter les
                    jours 4, 9, 14, 19 et 24).
                </ThemedText>
            </View>

            <ThemedText type="sectionText" style={styles.ital}>
                Merci également aux personnes qui ont testé mon application et
                qui m'ont donné des idées pour l'améliorer encore !
            </ThemedText>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    section: {
        marginBottom: 20,
    },
    ital: {
        fontFamily: "PoppinsItalic",
    },
});
