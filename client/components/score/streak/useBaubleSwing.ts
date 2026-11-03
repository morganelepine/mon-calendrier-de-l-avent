import { useEffect } from "react";
import {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useReducedMotion,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const SWING_DEGREES = 4;

type SwingStyle = { transform: { rotate: string }[] };

// Gentle swing around the hook. Each bauble gets its own pace and start
// so they don't move in sync. Disabled when the system asks for reduced motion.
export const useBaubleSwing = (day: number): SwingStyle => {
    const reduceMotion = useReducedMotion();
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (!reduceMotion) {
            const duration = 1400 + (day % 5) * 150;
            const easing = Easing.inOut(Easing.sin);
            rotation.value = withDelay(
                (day % 4) * 200,
                withRepeat(
                    withSequence(
                        withTiming(SWING_DEGREES, {
                            duration: duration / 2,
                            easing,
                        }),
                        withTiming(-SWING_DEGREES, { duration, easing }),
                        withTiming(0, { duration: duration / 2, easing }),
                    ),
                    -1,
                ),
            );
        }
        return (): void => cancelAnimation(rotation);
    }, [day, reduceMotion, rotation]);

    return useAnimatedStyle((): SwingStyle => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));
};
