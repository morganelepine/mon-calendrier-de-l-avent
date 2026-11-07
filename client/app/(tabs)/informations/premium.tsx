import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Purchases, { PurchasesError } from "react-native-purchases";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { CustomButton } from "@/components/utils/buttons/Button";
import { LegalLinks } from "@/components/informations/LegalLinks";
import { CountdownVariantSettings } from "@/components/informations/settings/CountdownVariantSettings";
import { Game2048PremiumSettings } from "@/components/informations/settings/Game2048PremiumSettings";
import { MusicSelection } from "@/components/informations/settings/MusicSelection";
import { WidgetsPremiumSettings } from "@/components/informations/settings/WidgetsPremiumSettings";
import { PremiumFeatureCard } from "@/components/informations/settings/PremiumFeatureCard";
import { showToast } from "@/components/utils/Toast";
import { Separator } from "@/components/utils/Separator";
import { usePremium } from "@/contexts/PremiumContext";
import { logClient } from "@/services/sentry.service";
import { Colors, Theme } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function PremiumScreen() {
    const {
        isPremium,
        isReady,
        premiumPackage,
        purchasePremium,
        restorePurchases,
    } = usePremium();
    const [purchasing, setPurchasing] = useState(false);
    const [restoring, setRestoring] = useState(false);

    const handlePurchase = async () => {
        setPurchasing(true);
        try {
            await purchasePremium();
            showToast("La Hotte Magique est débloquée ✨");
        } catch (error) {
            if (
                (error as PurchasesError)?.code ===
                Purchases.PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR
            ) {
                showToast(
                    "Paiement en attente de validation. La Hotte Magique sera débloquée dès sa confirmation ✨",
                    "long",
                );
            } else if (
                (error as PurchasesError)?.code !==
                Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR
            ) {
                showToast(
                    "L'achat n'a pas abouti, réessayez plus tard.",
                    "long",
                );
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
            const restored = await restorePurchases();
            showToast(
                restored
                    ? "Achat restauré"
                    : "Aucun achat à restaurer sur ce compte Google.",
                restored ? "short" : "long",
            );
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
                <ThemedText type="sectionText" style={styles.intro}>
                    La Hotte Magique, c’est un petit supplément de magie pour
                    votre calendrier de l’Avent ✨
                </ThemedText>

                <CountdownVariantSettings color={Colors.red} />

                <Game2048PremiumSettings color={Colors.green} />

                <WidgetsPremiumSettings color={Colors.blue} />

                <PremiumFeatureCard
                    title="3 boules pour votre guirlande"
                    color={Colors.autumnGreen}
                    description="Trois boules bonus pour rattraper les jours oubliés et faire briller votre guirlande jusqu'à Noël !"
                />

                <MusicSelection color={Colors.red} />

                <PremiumFeatureCard
                    title="Une surprise pour Noël"
                    color={Colors.green}
                    description={
                        <>
                            Avec La Hotte Magique, vous remportez
                            automatiquement la petite surprise du
                            25&nbsp;décembre, quel que soit votre score.
                        </>
                    }
                />

                <PremiumFeatureCard
                    title="Une bonne action"
                    color={Colors.blue}
                    description="La Hotte Magique, c’est aussi une façon de soutenir le développement de l’application et de donner un petit coup de pouce à sa créatrice. Merci de faire partie de l’aventure 🤍"
                />

                <Separator />

                <View style={styles.purchaseBox}>
                    {isPremium && (
                        <ThemedText type="sectionText" style={styles.intro}>
                            Merci d'avoir débloqué{"\n"}La Hotte Magique{"\n"}✨
                        </ThemedText>
                    )}
                    {!isPremium && (
                        <>
                            {premiumPackage || !isReady ? (
                                <CustomButton
                                    onPress={handlePurchase}
                                    loading={purchasing || !isReady}
                                    disabled={!premiumPackage || purchasing}
                                >
                                    {premiumPackage
                                        ? `Débloquer pour ${premiumPackage.product.priceString} à vie`
                                        : "Débloquer La Hotte Magique"}
                                </CustomButton>
                            ) : (
                                <ThemedText
                                    type="sectionText"
                                    style={styles.intro}
                                >
                                    La Hotte Magique est momentanément
                                    indisponible, réessayez plus tard.
                                </ThemedText>
                            )}

                            <ThemedText
                                style={styles.restoreLink}
                                accessibilityRole="button"
                                accessibilityState={{ busy: restoring }}
                                onPress={restoring ? undefined : handleRestore}
                            >
                                {restoring
                                    ? "Restauration en cours..."
                                    : "Restaurer mon achat"}
                            </ThemedText>

                            <LegalLinks />
                        </>
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
        color: Theme.goldToBlue,
        textAlign: "center",
        fontSize: 18,
    },
    purchaseBox: {
        gap: 12,
        marginTop: 20,
    },
    restoreLink: {
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 13,
        color: Colors.autumnGreen,
    },
});
