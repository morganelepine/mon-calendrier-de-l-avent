import { useEffect, useState } from "react";
import {
    LayoutRectangle,
    Modal,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { TOP_BOTTOM_EDGES } from "@/constants/safeAreaEdges";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

// Backgrounds are 1080x2400 (9:20), drawn to cover the whole screen
const BACKGROUND_WIDTH = 1080;
const BACKGROUND_HEIGHT = 2400;
const CONTENT_INSET = { left: 0.16, right: 0.16 };

export const getStoryBackgroundUrl = (image: string): string =>
    getCloudinaryImageUrl(image);

export interface StoryBackground {
    image: string; // Cloudinary id
    // Vertical center of the frame's blank area (below any bow),
    // as a fraction of the image height.
    centerY: number;
}

export interface StorySlide {
    key: string;
    content: React.ReactNode;
    // Full-screen frame, the content goes inside it.
    background?: StoryBackground;
    // Interactive area below the tap zones (buttons must stay pressable).
    footer?: React.ReactNode;
}

interface StoryViewerProps {
    visible: boolean;
    onClose: () => void;
    slides: StorySlide[];
    // Rendered inside the modal, e.g. nested modals opened from a slide.
    children?: React.ReactNode;
}

// The background is centered on screen, so is its middle: shifting the
// content's box by (centerY - 0.5) of the image height centers it on the frame.
// Side padding accounts for wider screens cropping the image's sides.
const getContentPosition = (
    { width, height }: LayoutRectangle,
    centerY: number,
): {
    top: number;
    bottom: number;
    paddingLeft: number;
    paddingRight: number;
} => {
    const scale = Math.max(
        width / BACKGROUND_WIDTH,
        height / BACKGROUND_HEIGHT,
    );
    const imageWidth = BACKGROUND_WIDTH * scale;
    const offsetY = (centerY - 0.5) * BACKGROUND_HEIGHT * scale;
    const croppedSide = (imageWidth - width) / 2;

    return {
        top: offsetY,
        bottom: -offsetY,
        paddingLeft: CONTENT_INSET.left * imageWidth - croppedSide,
        paddingRight: CONTENT_INSET.right * imageWidth - croppedSide,
    };
};

// Full-screen, story-like slides. Advances on tap only (no timer).
export const StoryViewer: React.FC<StoryViewerProps> = ({
    visible,
    onClose,
    slides,
    children,
}) => {
    const [index, setIndex] = useState(0);
    const [screen, setScreen] = useState<LayoutRectangle | null>(null);

    useEffect(() => {
        if (visible) setIndex(0);
    }, [visible]);

    const slide = slides[index];
    if (!slide) return null;

    const isFirst = index === 0;
    const isLast = index === slides.length - 1;

    return (
        <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View
                style={styles.root}
                onLayout={(event) => setScreen(event.nativeEvent.layout)}
            >
                {slide.background && screen && (
                    <Animated.View
                        key={slide.key}
                        entering={FadeIn.duration(300)}
                        style={StyleSheet.absoluteFill}
                    >
                        <Image
                            source={{
                                uri: getStoryBackgroundUrl(
                                    slide.background.image,
                                ),
                            }}
                            style={StyleSheet.absoluteFill}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        />
                        <View
                            style={[
                                styles.framedContent,
                                getContentPosition(
                                    screen,
                                    slide.background.centerY,
                                ),
                            ]}
                        >
                            {slide.content}
                        </View>
                    </Animated.View>
                )}

                <SafeAreaView edges={TOP_BOTTOM_EDGES} style={styles.overlay}>
                    <View style={styles.header}>
                        <View
                            style={styles.progress}
                            accessible
                            accessibilityLabel={`Écran ${index + 1} sur ${slides.length}`}
                        >
                            {slides.map((item, i) => (
                                <View
                                    key={item.key}
                                    style={[
                                        styles.segment,
                                        i <= index && styles.segmentDone,
                                    ]}
                                />
                            ))}
                        </View>
                        <Pressable
                            onPress={onClose}
                            style={styles.closeButton}
                            accessibilityRole="button"
                            accessibilityLabel="Fermer"
                        >
                            <Ionicons
                                name="close"
                                size={26}
                                color={Colors.green}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.body}>
                        {!slide.background && (
                            <Animated.View
                                key={slide.key}
                                entering={FadeIn.duration(300)}
                                style={styles.content}
                            >
                                {slide.content}
                            </Animated.View>
                        )}

                        <View style={styles.tapZones}>
                            <Pressable
                                style={styles.previousZone}
                                onPress={() => setIndex(index - 1)}
                                disabled={isFirst}
                                accessibilityRole="button"
                                accessibilityLabel="Écran précédent"
                                accessibilityState={{ disabled: isFirst }}
                            />
                            <Pressable
                                style={styles.nextZone}
                                onPress={() => setIndex(index + 1)}
                                disabled={isLast}
                                accessibilityRole="button"
                                accessibilityLabel="Écran suivant"
                                accessibilityState={{ disabled: isLast }}
                            />
                        </View>
                    </View>

                    {slide.footer && (
                        <View style={styles.footer}>{slide.footer}</View>
                    )}

                    {children}
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.blue,
    },
    framedContent: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    // Light pills keep the controls readable on any background pattern.
    progress: {
        flex: 1,
        flexDirection: "row",
        gap: 4,
        padding: 6,
        borderRadius: 10,
        backgroundColor: "rgba(247,245,246,0.85)",
    },
    segment: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: "rgba(1,15,35,0.2)",
    },
    segmentDone: {
        backgroundColor: Colors.green,
    },
    closeButton: {
        width: 42,
        height: 42,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(247,245,246,0.85)",
    },
    body: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    tapZones: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
    },
    previousZone: {
        flex: 3,
    },
    nextZone: {
        flex: 7,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 12,
    },
});
