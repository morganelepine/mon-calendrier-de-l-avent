import { forwardRef } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { SHARE_IMAGE_HEIGHT, SHARE_IMAGE_WIDTH } from "@/constants/shareImage";

// Laid out at phone size (360x450), then upscaled to 1080x1350 by the capture.
export const CARD_WIDTH = 360;
export const CARD_HEIGHT =
    (CARD_WIDTH * SHARE_IMAGE_HEIGHT) / SHARE_IMAGE_WIDTH;

interface ShareCardProps {
    backgroundImage: string; // Cloudinary id
    contentPosition?: "center" | "top";
    // Rendered off screen by default; false to show it as a preview.
    offscreen?: boolean;
    children: React.ReactNode;
}

/**
 * Image partagée, capturée par shareView. Hors de l'écran, elle reste montée
 * pour que ses images soient chargées au moment du partage.
 */
export const ShareCard = forwardRef<View, ShareCardProps>(
    (
        {
            backgroundImage,
            contentPosition = "center",
            offscreen = true,
            children,
        },
        ref,
    ) => (
        <View
            style={offscreen && styles.offscreen}
            pointerEvents={offscreen ? "none" : "auto"}
        >
            <View ref={ref} collapsable={false} style={styles.frame}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: getCloudinaryImageUrl(backgroundImage) }}
                        style={StyleSheet.absoluteFill}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    />
                    <LinearGradient
                        colors={[
                            "rgba(0,0,0,0.25)",
                            "rgba(0,0,0,0.45)",
                            "rgba(0,0,0,0.75)",
                        ]}
                        style={StyleSheet.absoluteFill}
                    />

                    <View
                        style={[
                            styles.content,
                            contentPosition === "top" && styles.contentTop,
                        ]}
                    >
                        {children}
                    </View>

                    <View style={styles.footer}>
                        <Image
                            source={require("@/assets/images/share-icon.png")}
                            style={styles.icon}
                        />
                        <View>
                            <ThemedText style={styles.appName}>
                                Mon calendrier de l'avent
                            </ThemedText>
                            <ThemedText style={styles.store}>
                                Disponible sur Google Play
                            </ThemedText>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    ),
);

ShareCard.displayName = "ShareCard";

interface ShareCardPreviewProps extends Omit<ShareCardProps, "offscreen"> {
    // Screen height kept free around the preview (buttons, headers...).
    reservedHeight: number;
}

// On-screen ShareCard, scaled down to fit. The capture keeps the 360x450 layout.
export const ShareCardPreview = forwardRef<View, ShareCardPreviewProps>(
    ({ reservedHeight, ...cardProps }, ref) => {
        const { width, height } = useWindowDimensions();
        const scale = Math.min(
            1,
            (width - 40) / CARD_WIDTH,
            (height - reservedHeight) / CARD_HEIGHT,
        );

        return (
            <View
                style={{
                    width: CARD_WIDTH * scale,
                    height: CARD_HEIGHT * scale,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View style={{ transform: [{ scale }] }}>
                    <ShareCard ref={ref} {...cardProps} offscreen={false} />
                </View>
            </View>
        );
    },
);

ShareCardPreview.displayName = "ShareCardPreview";

const styles = StyleSheet.create({
    offscreen: {
        position: "absolute",
        top: 0,
        left: -10000,
    },
    frame: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        padding: 6,
        backgroundColor: Colors.snow,
    },
    card: {
        flex: 1,
        overflow: "hidden",
        backgroundColor: Colors.darkBlue,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    contentTop: {
        justifyContent: "flex-start",
        paddingTop: 56,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingBottom: 30,
    },
    icon: {
        width: 36,
        height: 36,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: Colors.snow,
    },
    appName: {
        fontFamily: "PoppinsBold",
        fontSize: 11,
        lineHeight: 16,
        paddingTop: 0, // ThemedText's default paddingTop would push the block below the icon's center
        color: Colors.snow,
    },
    store: {
        fontSize: 8,
        lineHeight: 12,
        paddingTop: 1,
        color: Colors.snow,
    },
});
