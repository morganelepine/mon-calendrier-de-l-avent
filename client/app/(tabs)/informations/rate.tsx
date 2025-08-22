import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RateButton } from "../../../components/utils/buttons/RateButton";

export default function RateScreen() {
    return (
        <ScrollView style={styles.container}>
            <ThemedText type="sectionText">
                Votre avis compte beaucoup pour moi. Alors si vous appréciez
                cette application, prenez un moment pour laisser un avis !
            </ThemedText>
            <ThemedText type="sectionText">
                Cela me fera très plaisir et donnera peut-être envie à d'autres
                utilisateur·ice·s de découvrir ce calendrier de l'avent.
            </ThemedText>
            <ThemedText type="sectionText">
                Merci pour votre soutien 🤍
            </ThemedText>
            <RateButton style={styles.button}>Laisser un avis</RateButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    button: {
        marginVertical: 10,
        alignSelf: "flex-start",
    },
});
