import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { NotificationsSettings } from "@/components/informations/settings/NotificationsSettings";
import { PrivacyPolicySettings } from "@/components/informations/settings/PrivacyPolicySettings";
import { MusicSettings } from "@/components/informations/settings/MusicSettings";
import { Separator } from "@/components/utils/Separator";
import { Colors } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function SettingsScreen() {
    const appVersion = Constants.expoConfig?.version ?? "0.0.0";

    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={styles.container}>
                {Platform.OS !== "web" && (
                    <>
                        <NotificationsSettings />
                        <Separator />
                    </>
                )}

                <MusicSettings />

                <Separator />

                <PrivacyPolicySettings />

                <Separator />

                <ThemedText style={styles.version}>
                    Version {appVersion}
                </ThemedText>
            </SafeAreaView>
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: Colors.snow, flex: 1, paddingTop: 20 },
    version: {
        textAlign: "center",
        color: "#999",
        fontSize: 13,
        marginTop: 16,
    },
});
