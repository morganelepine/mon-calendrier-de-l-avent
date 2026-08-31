import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { RateButton } from "@/components/utils/buttons/RateButton";
import { KofiButton } from "@/components/utils/buttons/KofiButton";
import { Colors } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function RateScreen() {
    return (
        <SafeAreaView
            edges={NO_TOP_EDGES}
            style={{
                backgroundColor: Colors.snow,
                flex: 1,
                gap: 8,
                paddingTop: 20,
            }}
        >
            <ThemedText type="sectionText">
                Votre avis compte beaucoup pour moi. Alors si vous appréciez
                cette application, prenez un moment pour laisser un avis !
            </ThemedText>
            <ThemedText type="sectionText">
                Cela me fera très plaisir et donnera peut-être envie à d'autres
                utilisateur·ice·s de découvrir ce calendrier de l'avent.
            </ThemedText>
            <ThemedText type="sectionText">
                Merci pour votre soutien !
            </ThemedText>
            <RateButton style={styles.button}>Laisser un avis</RateButton>

            <View style={styles.separator} />

            <ThemedText type="sectionText">
                Mon calendrier de l'avent est fait avec amour, et j'aimerais
                qu'il reste accessible à tout le monde (et surtout, sans pub).
            </ThemedText>
            <ThemedText type="sectionText">
                Les serveurs qui font tourner l'application ont un coût en
                revanche, et si elle réussit à vous apporter un peu de magie
                chaque jour, votre soutien m'aiderait à la garder en vie ☕️
            </ThemedText>
            <KofiButton style={styles.button}>Me soutenir</KofiButton>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    separator: {
        borderTopWidth: 1,
        borderTopColor: Colors.disabled,
        marginVertical: 10,
    },
});
