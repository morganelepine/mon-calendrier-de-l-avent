import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PurchasesError } from "react-native-purchases";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { CustomButton } from "@/components/utils/buttons/Button";
import { CountdownVariantSettings } from "@/components/informations/settings/CountdownVariantSettings";
import { Game2048PremiumSettings } from "@/components/informations/settings/Game2048PremiumSettings";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { showToast } from "@/components/utils/Toast";
import { Separator } from "@/components/utils/Separator";
import { PURCHASES_SUPPORTED, usePremium } from "@/contexts/PremiumContext";
import { logClient } from "@/services/log.service";
import { Colors, Theme } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function PremiumScreen() {
    const {
        isPremium,
        isReady,
        premiumPackage,
        purchasePremium,
        restorePurchases,
        devOverride,
        setDevOverride,
    } = usePremium();
    const [purchasing, setPurchasing] = useState(false);
    const [restoring, setRestoring] = useState(false);

    const handlePurchase = async () => {
        setPurchasing(true);
        try {
            await purchasePremium();
            showToast("La Hotte Magique est débloquée ✨");
        } catch (error) {
            if (!(error as PurchasesError)?.userCancelled) {
                showToast("L'achat n'a pas abouti, réessayez plus tard.");
                await logClient("Premium purchase failed", {
                    error: String(error),
                });
            }
        } finally {
            setPurchasing(false);
        }
    };

    const handleRestore = async () => {
        setRestoring(true);
        try {
            await restorePurchases();
            showToast("Achat restauré");
        } catch (error) {
            showToast(
                "Impossible de restaurer votre achat pour le moment.",
                "long",
            );
            await logClient("Premium restore failed", {
                error: String(error),
            });
        } finally {
            setRestoring(false);
        }
    };

    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={styles.container}>
                {__DEV__ && (
                    // DEV ONLY: bypasses the real purchase flow to preview the
                    // premium/free experience. Never shown in production builds.
                    <SettingsToggleRow
                        label="Simuler le statut premium (dev)"
                        value={devOverride ?? isPremium}
                        onValueChange={(value) => setDevOverride(value)}
                    />
                )}

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

                <Separator />

                <View style={styles.purchaseBox}>
                    {!isPremium && PURCHASES_SUPPORTED ? (
                        <>
                            <CustomButton
                                onPress={handlePurchase}
                                loading={purchasing}
                                disabled={
                                    !isReady || !premiumPackage || purchasing
                                }
                            >
                                {premiumPackage
                                    ? `Débloquer pour ${premiumPackage.product.priceString}`
                                    : "Débloquer La Hotte Magique"}
                            </CustomButton>

                            <ThemedText
                                type="sectionText"
                                style={styles.restoreLink}
                                onPress={restoring ? undefined : handleRestore}
                            >
                                {restoring
                                    ? "Restauration en cours..."
                                    : "Déjà débloqué ? Restaurer mon achat"}
                            </ThemedText>
                        </>
                    ) : (
                        <ThemedText type="sectionText" style={styles.intro}>
                            Merci d'avoir débloqué{"\n"}La Hotte Magique ✨
                        </ThemedText>
                    )}
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
    purchaseBox: {
        gap: 12,
        marginTop: 20,
    },
    restoreLink: {
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 12,
        color: Colors.disabledText,
    },
});
