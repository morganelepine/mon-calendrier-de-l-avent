import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { RateButton } from "@/components/utils/buttons/RateButton";

export default function RateScreen() {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                gap: 8,
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
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});
