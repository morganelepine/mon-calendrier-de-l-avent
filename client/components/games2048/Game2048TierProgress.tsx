import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getIconForTier, getGame2048IconUrl } from "@/constants/game2048Icons";
import { Colors } from "@/constants/Colors";
import { PURCHASES_SUPPORTED } from "@/contexts/PremiumContext";
import { MAX_TIER } from "@/utils/games2048/engine";
import { showToast } from "@/components/utils/Toast";

interface Game2048TierProgressProps {
    // The highest tier this player can currently reach (see getMaxTier).
    // Tiers past it are shown locked only where La Hotte Magique can be bought.
    maxTier: number;
}

export const Game2048TierProgress = ({
    maxTier,
}: Game2048TierProgressProps) => {
    const tierCount = PURCHASES_SUPPORTED ? MAX_TIER : maxTier;
    const TIERS = Array.from({ length: tierCount }, (_, i) => i + 1);
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {TIERS.map((tier, index) => {
                const isLocked = tier > maxTier;
                const label = getIconForTier(tier).label;
                const icon = (
                    <Image
                        source={{ uri: getGame2048IconUrl(tier) }}
                        accessibilityLabel={isLocked ? undefined : label}
                        contentFit="contain"
                        cachePolicy="memory-disk"
                        style={[styles.icon, isLocked && styles.lockedIcon]}
                    />
                );
                return (
                    <View key={tier} style={styles.step}>
                        {isLocked ? (
                            <Pressable
                                onPress={() =>
                                    showToast(
                                        "Disponible avec la Hotte Magique",
                                        "long",
                                        {
                                            label: "Découvrir",
                                            onPress: () =>
                                                router.push(
                                                    "/informations/premium",
                                                ),
                                        },
                                    )
                                }
                                accessibilityRole="button"
                                accessibilityLabel={`${label}, niveau verrouillé`}
                                accessibilityHint="Disponible avec la Hotte Magique"
                                hitSlop={6}
                                style={styles.chip}
                            >
                                {icon}
                                <View style={styles.badge}>
                                    <Ionicons
                                        name="star"
                                        size={8}
                                        color="white"
                                    />
                                </View>
                            </Pressable>
                        ) : (
                            <View style={styles.chip}>{icon}</View>
                        )}
                        {index < TIERS.length - 1 && (
                            <Ionicons
                                name="chevron-forward"
                                size={12}
                                color={Colors.snow}
                            />
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 20,
        // Keeps the locked badge (offset above the chip) from being clipped.
        paddingVertical: 4,
        gap: 2,
    },
    step: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    chip: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: "80%",
        height: "80%",
    },
    lockedIcon: {
        opacity: 0.35,
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.gold,
        justifyContent: "center",
        alignItems: "center",
    },
});
