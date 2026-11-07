import { StyleSheet, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { NotificationsSettings } from "@/components/informations/settings/NotificationsSettings";
import { LegalLinks } from "@/components/informations/LegalLinks";
import { MusicSettings } from "@/components/informations/settings/MusicSettings";
import { Separator } from "@/components/utils/Separator";
import { Colors } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function SettingsScreen() {
    const appVersion = Constants.expoConfig?.version ?? "0.0.0";

    return (
        <SafeAreaView edges={NO_TOP_EDGES} style={styles.container}>
            <View>
                {Platform.OS !== "web" && (
                    <>
                        <NotificationsSettings />
                        <Separator />
                    </>
                )}
                <MusicSettings />
                <Separator />
            </View>

            <View>
                <LegalLinks />
                <ThemedText style={styles.version}>
                    Version {appVersion}
                </ThemedText>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.snow,
        flex: 1,
        paddingTop: 20,
        justifyContent: "space-between",
    },
    version: {
        textAlign: "center",
        fontSize: 11,
        color: Colors.light.icon,
    },
});
