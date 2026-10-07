import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollOffset,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

const DEFAULT_HEADER_HEIGHT = 300;
// Hauteur dont le contenu remonte sur le bas de l'en-tête
const CONTENT_OVERLAP = 50;

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
    headerHeight?: number;
    // Affiché par-dessus l'image, sans effet parallax (ex. titre)
    headerOverlay?: ReactElement;
}>;

export default function ParallaxScrollView({
    children,
    headerImage,
    headerBackgroundColor,
    headerHeight = DEFAULT_HEADER_HEIGHT,
    headerOverlay,
}: Props) {
    const colorScheme = useColorScheme() ?? "light";
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-headerHeight, 0, headerHeight],
                        [-headerHeight / 2, 0, headerHeight * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-headerHeight, 0, headerHeight],
                        [2, 1, 1]
                    ),
                },
                { perspective: 1000 },
            ],
        };
    });

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                removeClippedSubviews={false}
            >
                <Animated.View
                    style={[
                        styles.header,
                        {
                            height: headerHeight,
                            backgroundColor: headerBackgroundColor[colorScheme],
                        },
                        headerAnimatedStyle,
                    ]}
                >
                    {headerImage}
                </Animated.View>
                {headerOverlay ? (
                    <View style={[styles.header, { height: headerHeight }]}>
                        {headerOverlay}
                    </View>
                ) : null}
                <ThemedView
                    style={[
                        styles.contentContainer,
                        { marginTop: headerHeight - CONTENT_OVERLAP },
                    ]}
                >
                    <ThemedView style={styles.content}>{children}</ThemedView>
                </ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.snow,
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    contentContainer: {
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: "hidden",
        backgroundColor: "transparent",
    },
    content: {
        backgroundColor: Colors.snow,
    },
});
