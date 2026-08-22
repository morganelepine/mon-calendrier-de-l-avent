import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Colors } from "@/constants/Colors";

export const HalloweenMusicsCredits = () => {
    return (
        <View style={styles.halloweenMusicCredits}>
            <ThemedText
                type="italic14"
                style={[styles.musicCredits, { marginBottom: 8 }]}
            >
                Deux nouveaux morceaux sont proposés en octobre et s'alternent
                un jour sur deux :
            </ThemedText>
            <View style={styles.musicCredits}>
                <ExternalLink href="https://pixabay.com/fr/users/soundgallerybydmitrytaras-11640913/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=116010">
                    <ThemedText type="italic14">
                        - "Halloween" par{" "}
                        <ThemedText
                            type="italic14"
                            style={{ textDecorationLine: "underline" }}
                        >
                            Dmitry Taras
                        </ThemedText>
                    </ThemedText>
                    <ExternalLink href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=116010">
                        <ThemedText type="italic14">
                            {" "}
                            depuis{" "}
                            <ThemedText
                                type="italic14"
                                style={{ textDecorationLine: "underline" }}
                            >
                                Pixabay
                            </ThemedText>
                        </ThemedText>
                    </ExternalLink>
                </ExternalLink>
            </View>
            <View style={styles.musicCredits}>
                <ExternalLink
                    href="https://pixabay.com/fr/users/sigmamusicart-36860929/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=425891"
                    style={{ marginTop: 10 }}
                >
                    <ThemedText type="italic14">
                        - "Halloween Background Music" par{" "}
                        <ThemedText
                            type="italic14"
                            style={{ textDecorationLine: "underline" }}
                        >
                            Mikhail Smusev
                        </ThemedText>
                    </ThemedText>
                    <ExternalLink href="https://pixabay.com/music/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=425891">
                        <ThemedText type="italic14">
                            {" "}
                            depuis{" "}
                            <ThemedText
                                type="italic14"
                                style={{ textDecorationLine: "underline" }}
                            >
                                Pixabay
                            </ThemedText>
                        </ThemedText>
                    </ExternalLink>
                </ExternalLink>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    musicCredits: {
        paddingHorizontal: 20,
    },
    halloweenMusicCredits: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: Colors.orange,
        backgroundColor: Colors.orange + "15",
        borderRadius: 8,
        paddingVertical: 12,
        marginHorizontal: 20,
    },
});
