import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { getGame2048IconUrl } from "@/constants/game2048Icons";

const PREVIEW_TIERS = [1, 2, 3, 4];

// Same URLs as the game's tiles, so they come from the cache once played.
export const Game2048Preview: React.FC = () => (
    <View style={styles.grid} accessible={false}>
        {PREVIEW_TIERS.map((tier) => (
            <View key={tier} style={styles.tile}>
                <Image
                    source={{ uri: getGame2048IconUrl(tier) }}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                    style={styles.icon}
                />
            </View>
        ))}
    </View>
);

const TILE_SIZE = 40;
const GAP = 6;

const styles = StyleSheet.create({
    grid: {
        width: TILE_SIZE * 2 + GAP,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: GAP,
    },
    tile: {
        width: TILE_SIZE,
        height: TILE_SIZE,
        borderRadius: 8,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: "85%",
        height: "85%",
    },
});
