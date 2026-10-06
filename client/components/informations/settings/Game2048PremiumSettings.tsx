import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { PremiumFeatureCard } from "@/components/informations/settings/PremiumFeatureCard";
import { getIconForTier, getGame2048IconUrl } from "@/constants/game2048Icons";
import { MAX_TIER, FREE_MAX_TIER } from "@/utils/games2048/engine";
import { Colors } from "@/constants/Colors";

const BONUS_TIERS = Array.from(
    { length: MAX_TIER - FREE_MAX_TIER },
    (_, i) => FREE_MAX_TIER + 1 + i,
);

export const Game2048PremiumSettings = ({ color }: { color: string }) => {
    return (
        <PremiumFeatureCard
            title="Un 2048 plus complet"
            color={color}
            description={
                <>
                    La version de base s'arrête au palier {FREE_MAX_TIER}. La
                    Hotte Magique débloque {BONUS_TIERS.length} niveaux
                    supplémentaires pour prolonger vos parties et mettre votre
                    talent à l’épreuve !
                </>
            }
        >
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
                    </View>
                ))}
            </View>
        </PremiumFeatureCard>
    );
};

const styles = StyleSheet.create({
    previewBox: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        paddingTop: 12,
    },
    tile: {
        alignItems: "center",
    },
    chip: {
        width: 48,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.autumnGreen,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: "85%",
        height: "85%",
    },
});
