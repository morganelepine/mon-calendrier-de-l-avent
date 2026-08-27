import { ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MAX_TIER } from "@/utils/games2048/engine";
import { getIconForTier, getGame2048IconUrl } from "@/constants/game2048Icons";
import { Colors } from "@/constants/Colors";

const TIERS = Array.from({ length: MAX_TIER }, (_, i) => i + 1);

export const Game2048TierProgress = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {TIERS.map((tier, index) => (
                <View key={tier} style={styles.step}>
                    <View style={styles.chip}>
                        <Image
                            source={{ uri: getGame2048IconUrl(tier) }}
                            accessibilityLabel={getIconForTier(tier).label}
                            contentFit="contain"
                            cachePolicy="memory-disk"
                            style={styles.icon}
                        />
                    </View>
                    {index < TIERS.length - 1 && (
                        <Ionicons
                            name="chevron-forward"
                            size={12}
                            color={Colors.snow}
                        />
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 20,
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
});
