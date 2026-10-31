import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function CopyrightsScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={{ paddingTop: 20 }}>
                <View style={styles.section}>
                    <ThemedText type="sectionText">
                        Cette application est un projet collaboratif : plusieurs
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
                        ...qui a dessiné des fonds d'écran pour l'onglet
                        Décompte (jours 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                        17, 18, 19, 20, 23, 24, 25) et participé à la surprise
                        du 25 décembre.
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">Francia</ThemedText>
                    <ThemedText type="sectionText">
                        ...qui a enregistré "Greensleeves" au piano et
                        co-construit la mécanique qui va chercher le programme
                        des téléfilms de Noël.
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">Morgane</ThemedText>
                    <ThemedText type="sectionText">
                        ...qui a développé l'application et créé la plupart des
                        contenus.
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">William</ThemedText>
                    <ThemedText type="sectionText">
                        ...qui a enregistré "Petit papa Noël" au piano et
                        co-construit la mécanique qui va chercher le programme
                        des téléfilms de Noël.
                    </ThemedText>
                </View>

                <ThemedText type="sectionTextItalic">
                    Merci également aux personnes qui me donnent chaque année
                    des idées pour l'améliorer encore !
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
