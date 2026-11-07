import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useReducedMotion,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";

const PULSE_SCALE = 1.08;
const PULSE_DURATION = 1200;

export const IntroSlide: React.FC<{ year: number }> = ({ year }) => {
    const reduceMotion = useReducedMotion();
    const scale = useSharedValue(1);

    useEffect(() => {
        if (!reduceMotion) {
            scale.value = withRepeat(
                withTiming(PULSE_SCALE, {
                    duration: PULSE_DURATION,
                    easing: Easing.inOut(Easing.sin),
                }),
                -1,
                true,
            );
        }
        return (): void => cancelAnimation(scale);
    }, [reduceMotion, scale]);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <>
            <ThemedText style={slideStyles.kicker}>
                Votre Avent {year}
            </ThemedText>
            <ThemedText style={slideStyles.title}>
                Revivez votre mois de décembre en quelques chiffres
            </ThemedText>
            <Animated.View style={pulseStyle}>
                <ThemedText style={styles.hint}>
                    Touchez l'écran{"\n"}pour continuer
                </ThemedText>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    hint: {
        fontSize: 12,
        color: "rgba(1,15,35,0.6)",
        textAlign: "center",
        marginTop: 40,
        fontFamily: "PoppinsItalic",
    },
});
