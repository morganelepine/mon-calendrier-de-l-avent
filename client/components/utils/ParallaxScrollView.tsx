import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

const HEADER_HEIGHT = 300;

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
    children,
    headerImage,
    headerBackgroundColor,
}: Props) {
    const colorScheme = useColorScheme() ?? "light";
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [2, 1, 1]
                    ),
                },
            ],
        };
    });

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.View
                    style={[
                        styles.header,
                        { backgroundColor: headerBackgroundColor[colorScheme] },
                        headerAnimatedStyle,
                    ]}
                >
                    {headerImage}
                </Animated.View>
                <ThemedView style={styles.contentContainer}>
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
        height: HEADER_HEIGHT,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        overflow: "hidden",
    },
    contentContainer: {
        marginTop: HEADER_HEIGHT - 50,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        overflow: "hidden",
        backgroundColor: "transparent",
    },
    content: {
        paddingHorizontal: 20,
        backgroundColor: Colors.snow,
    },
});
