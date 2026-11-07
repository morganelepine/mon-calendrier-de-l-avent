import { useEffect, useRef, useState } from "react";
import {
    AccessibilityInfo,
    Animated as RNAnimated,
    StyleSheet,
    View,
} from "react-native";
import Animated, {
    FadeOut,
    useReducedMotion,
    ZoomIn,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import {
    ConfettiBurst,
    CONFETTI_DURATION,
} from "@/components/utils/ConfettiBurst";
import { Colors } from "@/constants/Colors";
import { CHALLENGE_POINTS } from "@/data/challenges_data";
import { Challenge } from "@/interfaces/challengeInterface";

const DURATION = 3000;

const CONFETTI_COUNT = 24;
const CONFETTI_SPREAD = 2;

let listener: ((challenge: Challenge) => void) | null = null;

export function showChallengeToast(challenge: Challenge): void {
    listener?.(challenge);
}

export function ChallengeToastHost() {
    const [queue, setQueue] = useState<Challenge[]>([]);
    const current = queue[0];
    const reduceMotion = useReducedMotion();
    const confetti = useRef(new RNAnimated.Value(0)).current;

    useEffect(() => {
        listener = (challenge) => setQueue((items) => [...items, challenge]);
        return () => {
            listener = null;
        };
    }, []);

    useEffect(() => {
        if (!current) return undefined;
        AccessibilityInfo.announceForAccessibility(
            `Défi réussi : ${current.title}, plus ${CHALLENGE_POINTS} points`,
        );
        if (!reduceMotion) {
            confetti.setValue(0);
            RNAnimated.timing(confetti, {
                toValue: 1,
                duration: CONFETTI_DURATION,
                useNativeDriver: true,
            }).start();
        }
        const timer = setTimeout(
            () => setQueue((items) => items.slice(1)),
            DURATION,
        );
        return () => clearTimeout(timer);
    }, [current, reduceMotion, confetti]);

    if (!current) return null;

    return (
        <Animated.View
            key={current.id}
            entering={ZoomIn.duration(300)}
            exiting={FadeOut.duration(200)}
            pointerEvents="none"
            style={styles.overlay}
        >
            <View style={styles.card}>
                {!reduceMotion && (
                    <ConfettiBurst
                        progress={confetti}
                        count={CONFETTI_COUNT}
                        spread={CONFETTI_SPREAD}
                    />
                )}
                <ActivityIcon
                    image={current.image}
                    backgroundColor={Colors.autumnGold}
                    size={50}
                />
                <ThemedText style={styles.title}>{current.title}</ThemedText>
                <View style={styles.points}>
                    <ThemedText style={styles.label}>Défi réussi !</ThemedText>
                    <ThemedText style={styles.pointsText}>
                        +{CHALLENGE_POINTS} pts
                    </ThemedText>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        alignItems: "center",
        flexDirection: "row",
        gap: 12,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.gold,
        backgroundColor: Colors.blue,
    },
    title: {
        flexShrink: 1,
        fontSize: 18,
        fontFamily: "FreightNeoBold",
        color: Colors.snow,
        paddingTop: 0,
        textAlign: "center",
    },
    points: {
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        lineHeight: 12,
        fontFamily: "PoppinsBold",
        color: Colors.gold,
    },
    pointsText: {
        fontSize: 16,
        fontFamily: "FreightNeoBold",
        color: Colors.gold,
        paddingTop: 0,
    },
});
