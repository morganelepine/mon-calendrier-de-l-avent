import { useEffect, useRef } from "react";
import { Animated as RNAnimated, StyleSheet, View } from "react-native";
import Animated, { useReducedMotion, ZoomIn } from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";
import {
    formatNumber,
    getTopText,
} from "@/components/retrospective/retrospectiveTexts";
import {
    ConfettiBurst,
    CONFETTI_DURATION,
} from "@/components/utils/ConfettiBurst";
import { Retrospective } from "@/interfaces/retrospectiveInterface";

const CONFETTI_COUNT = 30;
const CONFETTI_SPREAD = 2;

type PointsSlideProps = Pick<Retrospective, "points" | "playerCount"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const PointsSlide: React.FC<PointsSlideProps> = ({
    points,
    playerCount,
    icon,
}) => {
    const reduceMotion = useReducedMotion();
    const confetti = useRef(new RNAnimated.Value(0)).current;

    useEffect(() => {
        if (reduceMotion) return;
        RNAnimated.timing(confetti, {
            toValue: 1,
            duration: CONFETTI_DURATION,
            useNativeDriver: true,
        }).start();
    }, [reduceMotion, confetti]);

    return (
        <>
            <View>
                <Animated.View entering={ZoomIn.springify().damping(50)}>
                    <ThemedText style={slideStyles.bigNumber}>
                        {formatNumber(points.value)}
                    </ThemedText>
                </Animated.View>
                {!reduceMotion && (
                    <View style={styles.confetti}>
                        <ConfettiBurst
                            progress={confetti}
                            count={CONFETTI_COUNT}
                            spread={CONFETTI_SPREAD}
                        />
                    </View>
                )}
            </View>
            <ThemedText style={slideStyles.title}>points</ThemedText>
            <Comparison
                text={getTopText(points.topPercent, playerCount)}
                image={icon}
            />
        </>
    );
};

const styles = StyleSheet.create({
    confetti: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 50,
    },
});
