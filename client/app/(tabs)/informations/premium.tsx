import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { CountdownVariantSettings } from "@/components/informations/settings/CountdownVariantSettings";
import { Game2048PremiumSettings } from "@/components/informations/settings/Game2048PremiumSettings";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { usePremium } from "@/contexts/PremiumContext";
import { Colors, Theme } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function PremiumScreen() {
    const { isPremium, setIsPremium } = usePremium();

    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={styles.container}>
                {/* TEMPORARY: stand-in for real premium infra (subscription,
                    IAP...) - lets us test the premium/free experience until
                    that exists. Remove once a real entitlement check lands. */}
                <SettingsToggleRow
                    label="Simuler le statut premium (dev)"
                    value={isPremium}
                    onValueChange={setIsPremium}
                />

                <ThemedText type="sectionText" style={styles.intro}>
                    La Hotte Magique, c’est un petit supplément de magie pour
                    votre calendrier de l’Avent ✨
                </ThemedText>

                <CountdownVariantSettings />

                <Game2048PremiumSettings />

                <View style={{ marginVertical: 8 }}>
                    <ThemedText type="sectionSubtitle">
                        3 bonus pour votre série de connexion
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Trois bonus supplémentaires pour vous aider à faire
                        durer votre série et ne jamais perdre le fil de votre
                        Avent !
                    </ThemedText>
                </View>

                <View style={{ marginVertical: 8 }}>
                    <ThemedText type="sectionSubtitle">
                        Encore plus de musique
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Découvrez de nouvelles musiques de Noël et choisissez
                        celles qui vous accompagneront tout au long du mois.
                    </ThemedText>
                </View>

                <View style={{ marginVertical: 8 }}>
                    <ThemedText type="sectionSubtitle">
                        Une surprise le 25 décembre
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Avec La Hotte Magique, vous remportez automatiquement la
                        petite surprise du 25&nbsp;décembre, quel que soit votre
                        score.
                    </ThemedText>
                </View>

                <View style={{ marginVertical: 8 }}>
                    <ThemedText type="sectionSubtitle">
                        Une bonne action
                    </ThemedText>
                    <ThemedText type="sectionText">
                        La Hotte Magique, c’est aussi une façon de soutenir le
                        développement de l’application et de donner un petit
                        coup de pouce à sa créatrice. Merci de faire partie de
                        l’aventure ❤️
                    </ThemedText>
                </View>
            </SafeAreaView>
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: Colors.snow, flex: 1, paddingTop: 20 },
    intro: {
        fontFamily: "FreightNeoBold",
        color: Theme.surface,
        textAlign: "center",
        fontSize: 18,
        marginBottom: 16,
    },
});
