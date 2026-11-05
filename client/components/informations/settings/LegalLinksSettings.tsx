import { Fragment } from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Separator } from "@/components/utils/Separator";
import { PRIVACY_URL, TERMS_URL } from "@/constants/Links";
import Ionicons from "@expo/vector-icons/Ionicons";

const LEGAL_LINKS = [
    { label: "Politique de confidentialité", url: PRIVACY_URL },
    { label: "Conditions d'utilisation et de vente", url: TERMS_URL },
];

export const LegalLinksSettings = () => {
    return LEGAL_LINKS.map(({ label, url }, index) => (
        <Fragment key={url}>
            {index > 0 && <Separator />}
            <TouchableOpacity
                style={styles.button}
                accessibilityRole="link"
                onPress={() => Linking.openURL(url)}
            >
                <ThemedText type="sectionText" style={styles.title}>
                    {label}
                </ThemedText>

                <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
        </Fragment>
    ));
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
