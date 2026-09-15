import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Separator } from "@/components/utils/Separator";
import { CountdownVariantSettings } from "@/components/informations/settings/CountdownVariantSettings";
import { Game2048PremiumSettings } from "@/components/informations/settings/Game2048PremiumSettings";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { usePremium } from "@/contexts/PremiumContext";
import { Colors } from "@/constants/Colors";
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

                <Separator />

                <CountdownVariantSettings />

                <Separator />

                <Game2048PremiumSettings />
            </SafeAreaView>
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: Colors.snow, flex: 1, paddingTop: 20 },
});
