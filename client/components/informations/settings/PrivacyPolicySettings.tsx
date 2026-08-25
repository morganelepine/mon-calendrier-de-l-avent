import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

const PRIVACY_POLICY_URL = "https://mon-calendrier-de-l-avent.vercel.app";

export const PrivacyPolicySettings = () => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
        >
            <ThemedText type="sectionText" style={styles.title}>
                Politique de confidentialité
            </ThemedText>

            <Ionicons name="chevron-forward" size={20} color="#aaa" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingRight: 20,
    },
    title: {
        flex: 1,
        fontFamily: "PoppinsBold",
    },
});
