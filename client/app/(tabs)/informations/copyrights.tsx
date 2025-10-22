import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { ThemedText } from "@/components/ThemedText";

export default function CopyrightsScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView>
                <View style={styles.section}>
                    <ThemedText type="sectionText">
                        Cette application est un projet collaboratif : 2
                        personnes ont accepté de mettre leurs talents
                        artistiques à disposition pour rendre cette application
                        encore plus magique.
                    </ThemedText>
                    <ThemedText type="sectionText">
                        ❤️ Merci merci merci à vous ❤️
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">Annaëlle</ThemedText>
                    <ThemedText type="sectionText">
                        ...qui a dessiné 12 superbes fonds d'écran pour l'onglet
                        Décompte (jours 3, 4, 6, 7, 9, 11, 13, 14, 17, 19, 24,
                        25).
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">William</ThemedText>
                    <ThemedText type="sectionText">
                        ...qui a enregistré Petit papa Noël au piano (à écouter
                        les jours 4, 9, 14, 19 et 24).
                    </ThemedText>
                </View>

                <ThemedText
                    type="sectionText"
                    style={{ fontFamily: "PoppinsItalic" }}
                >
                    Merci également aux personnes qui ont testé mon application
                    et qui m'ont donné des idées pour l'améliorer encore !
                </ThemedText>
            </SafeAreaView>
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
});
