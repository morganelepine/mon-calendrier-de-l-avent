import { Platform, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { PremiumFeatureCard } from "@/components/informations/settings/PremiumFeatureCard";

const WIDGET_PREVIEWS = [
    {
        label: "Widget maisonnette",
        source: require("@/assets/images/widget/house-preview.webp"),
        aspectRatio: 200 / 440,
    },
    {
        label: "Widget boule à neige",
        source: require("@/assets/images/widget/snowball-preview.webp"),
        aspectRatio: 1,
    },
    {
        label: "Widget cadeaux",
        source: require("@/assets/images/widget/gifts-preview.webp"),
        aspectRatio: 200 / 447,
    },
];

const PREVIEW_HEIGHT = 130;

export const WidgetsPremiumSettings = ({ color }: { color: string }) =>
    Platform.OS !== "android" ? null : (
        <PremiumFeatureCard
            title="Des widgets"
            color={color}
            description="Suivez le décompte jusqu’à Noël depuis votre écran d’accueil avec ces trois widgets."
        >
            <View style={styles.previews}>
                {WIDGET_PREVIEWS.map(({ label, source, aspectRatio }) => (
                    <Image
                        key={label}
                        source={source}
                        accessibilityLabel={label}
                        contentFit="contain"
                        style={[
                            styles.preview,
                            { width: PREVIEW_HEIGHT * aspectRatio },
                        ]}
                    />
                ))}
            </View>
        </PremiumFeatureCard>
    );

const styles = StyleSheet.create({
    previews: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 14,
        paddingTop: 14,
    },
    preview: {
        height: PREVIEW_HEIGHT,
        borderRadius: 10,
    },
});
