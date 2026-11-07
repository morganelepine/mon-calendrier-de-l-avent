import { Fragment } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { PRIVACY_URL, TERMS_URL } from "@/constants/Links";
import { openExternalUrl } from "@/utils/openExternalUrl";

const LEGAL_LINKS = [
    { label: "Conditions d'utilisation", url: TERMS_URL },
    { label: "Confidentialité", url: PRIVACY_URL },
];

// Keeps these small links comfortable to tap without taking more room.
const LINK_HIT_SLOP = { top: 12, bottom: 12, left: 4, right: 4 };

export const LegalLinks = () => {
    return (
        <View style={styles.links}>
            {LEGAL_LINKS.map(({ label, url }, index) => (
                <Fragment key={url}>
                    {index > 0 && (
                        <Text
                            style={styles.dot}
                            accessibilityElementsHidden
                            importantForAccessibility="no"
                        >
                            ·
                        </Text>
                    )}
                    <Pressable
                        accessibilityRole="link"
                        hitSlop={LINK_HIT_SLOP}
                        onPress={() => openExternalUrl(url)}
                    >
                        <ThemedText style={styles.link}>{label}</ThemedText>
                    </Pressable>
                </Fragment>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    links: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        paddingHorizontal: 20,
    },
    link: {
        textDecorationLine: "underline",
        fontSize: 11,
        color: Colors.light.icon,
    },
    dot: {
        color: Colors.light.icon,
    },
});
