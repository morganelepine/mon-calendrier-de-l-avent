import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Animated, { ZoomIn } from "react-native-reanimated";
import { getIconForTier, getGame2048IconUrl } from "@/constants/game2048Icons";

interface Game2048TileProps {
    tier: number; // 0 = empty cell
    size: number;
}

export const Game2048Tile: React.FC<Game2048TileProps> = ({ tier, size }) => {
    if (tier === 0) {
        return (
            <View
                style={[
                    styles.cell,
                    styles.empty,
                    { width: size, height: size },
                ]}
            />
        );
    }

    const icon = getIconForTier(tier);

    return (
        // Keying on `tier` remounts this view (replaying the entering
        // animation) whenever a tile appears or merges into a new one.
        <Animated.View
            key={tier}
            entering={ZoomIn.duration(150)}
            style={[styles.cell, styles.filled, { width: size, height: size }]}
        >
            <Image
                source={{ uri: getGame2048IconUrl(tier) }}
                accessibilityLabel={icon.label}
                contentFit="contain"
                cachePolicy="memory-disk"
                style={styles.icon}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cell: {
        justifyContent: "center",
        alignItems: "center",
    },
    empty: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 8,
    },
    filled: {
        backgroundColor: "white",
        borderRadius: 8,
    },
    icon: {
        width: "85%",
        height: "85%",
    },
});
