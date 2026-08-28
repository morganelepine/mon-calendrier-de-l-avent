import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { RateButton } from "@/components/utils/buttons/RateButton";
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});
