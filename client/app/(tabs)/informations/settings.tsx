import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { NotificationsSettings } from "@/components/informations/settings/NotificationsSettings";
import { PrivacyPolicySettings } from "@/components/informations/settings/PrivacyPolicySettings";
import { MusicSettings } from "@/components/informations/settings/MusicSettings";
import { Colors } from "@/constants/Colors";

export default function SettingsScreen() {
    const appVersion = Constants.expoConfig?.version ?? "0.0.0";

    return (
        <CustomScrollView>
            <SafeAreaView style={styles.container}>
                <NotificationsSettings />

                <View style={styles.separator} />

                <MusicSettings />

                <View style={styles.separator} />

                <PrivacyPolicySettings />

                <View style={styles.separator} />

                <ThemedText style={styles.version}>
                    Version {appVersion}
                </ThemedText>
            </SafeAreaView>
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: Colors.snow, flex: 1 },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 16,
    },
    version: {
        textAlign: "center",
        color: "#999",
        fontSize: 13,
        marginTop: 16,
    },
});
