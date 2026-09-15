import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { getIconForTier, getGame2048IconUrl } from "@/constants/game2048Icons";
import { MAX_TIER, FREE_MAX_TIER } from "@/utils/games2048/engine";
import { Colors, Theme } from "@/constants/Colors";

const BONUS_TIERS = Array.from(
    { length: MAX_TIER - FREE_MAX_TIER },
    (_, i) => FREE_MAX_TIER + 1 + i,
);

export const Game2048PremiumSettings = () => {
    return (
        <>
            <ThemedText
                type="sectionText"
                style={{ fontFamily: "PoppinsBold" }}
            >
                Jeu 2048
            </ThemedText>
            <ThemedText type="sectionText">
                La version de base s'arrête au palier {FREE_MAX_TIER}. La
                version Premium débloque {BONUS_TIERS.length} niveaux
                supplémentaires, avec leurs images exclusives.
            </ThemedText>

            <View style={styles.previewBox}>
                {BONUS_TIERS.map((tier) => (
                    <View key={tier} style={styles.tile}>
                        <View style={styles.chip}>
                            <Image
                                source={{ uri: getGame2048IconUrl(tier) }}
                                accessibilityLabel={getIconForTier(tier).label}
                                contentFit="contain"
                                cachePolicy="memory-disk"
                                style={styles.icon}
                            />
                        </View>
                        <ThemedText style={styles.label}>
                            {getIconForTier(tier).label}
                        </ThemedText>
                    </View>
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    previewBox: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        backgroundColor: Theme.tint,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginHorizontal: 20,
        marginVertical: 16,
    },
    tile: {
        alignItems: "center",
        gap: 6,
        width: 80,
    },
    chip: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: "80%",
        height: "80%",
    },
    label: {
        fontSize: 12,
        fontFamily: "Poppins",
        color: Colors.snow,
        textAlign: "center",
    },
});
