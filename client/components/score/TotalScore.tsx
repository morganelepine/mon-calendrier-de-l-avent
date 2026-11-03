import React, { useEffect, useRef } from "react";
import {
    AccessibilityInfo,
    Animated as RNAnimated,
    StyleSheet,
    View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { pluralWord } from "@/utils/pluralize";
import {
    ConfettiBurst,
    CONFETTI_DURATION,
} from "@/components/utils/ConfettiBurst";
import { useObjectiveCelebration } from "@/components/score/useObjectiveCelebration";
import { usePremium } from "@/contexts/PremiumContext";

// Bigger than the default bauble-sized burst, to match the badge.
const CONFETTI_COUNT = 24;
const CONFETTI_SPREAD = 2;

interface TotalScoreProps {
    score: number;
}

export const TotalScore: React.FC<TotalScoreProps> = ({ score }) => {
    const { isPremium, isReady } = usePremium();
    const minScoreToWin = 2512;
    const maxScoreWinnable = 4170;
    const objective = isPremium ? maxScoreWinnable : minScoreToWin;
    const hasReachedObjective = score >= objective;
    const progress = Math.min((score / objective) * 100, 100);
    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(`${progress}%`, { duration: 1000 }),
    }));

    // Waits for the premium status so a premium user isn't celebrated
    // for the non-premium objective.
    const { status, finish } = useObjectiveCelebration(
        objective,
        hasReachedObjective && isReady,
    );
    const celebrating = status === "celebrating";
    const confetti = useRef(new RNAnimated.Value(0)).current;
    const pop = useSharedValue(1);

    useEffect(() => {
        if (!celebrating) return;
        pop.value = withSequence(
            withTiming(1.2, { duration: 180 }),
            withTiming(1, { duration: 250 }),
        );
        confetti.setValue(0);
        RNAnimated.timing(confetti, {
            toValue: 1,
            duration: CONFETTI_DURATION,
            useNativeDriver: true,
        }).start(() => {
            finish();
            AccessibilityInfo.announceForAccessibility("Objectif atteint");
        });
    }, [celebrating, pop, confetti, finish]);

    const popStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pop.value }],
    }));

    return (
        <View style={styles.container}>
            <ThemedText type="freightNeoBoldSnow" style={styles.score}>
                <ThemedText type="freightNeoBoldSnow">{score}</ThemedText>{" "}
                {pluralWord(score, "point")}
            </ThemedText>

            {hasReachedObjective ? (
                <Animated.View style={[styles.badge, popStyle]}>
                    <ThemedText style={styles.reached}>
                        Objectif atteint
                    </ThemedText>
                    {celebrating && (
                        <View style={styles.confetti}>
                            <ConfettiBurst
                                progress={confetti}
                                count={CONFETTI_COUNT}
                                spread={CONFETTI_SPREAD}
                            />
                        </View>
                    )}
                </Animated.View>
            ) : (
                <>
                    <View style={styles.barContainer}>
                        <Animated.View
                            style={[styles.completion, animatedStyle]}
                        />
                    </View>
                    <ThemedText style={styles.goal}>
                        {progress === 0
                            ? "Ouvrez la case du jour pour commencer à gagner des points"
                            : isPremium
                              ? `${Math.round(progress)}% des points de l'Avent récoltés`
                              : `${Math.round(progress)}% de l'objectif atteint`}
                    </ThemedText>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: "100%",
        paddingBottom: 10,
    },
    score: {
        fontSize: 50,
        fontFamily: "FreightNeo",
        paddingBottom: 10,
    },

    barContainer: {
        position: "relative",
        alignSelf: "stretch",
        height: 20,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        marginBottom: 10,
        borderRadius: 50,
    },
    completion: {
        position: "absolute",
        alignSelf: "stretch",
        height: "100%",
        backgroundColor: Colors.autumnGold,
        borderRadius: 50,
    },
    goal: {
        marginBottom: 20,
        color: Colors.snow,
        fontSize: 14,
        textAlign: "center",
    },

    badge: {
        alignSelf: "center",
        marginBottom: 20,
    },
    confetti: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
    },
    reached: {
        backgroundColor: Colors.autumnGold,
        borderRadius: 50,
        color: Colors.snow,
        fontSize: 14,
        paddingHorizontal: 16,
    },
});
