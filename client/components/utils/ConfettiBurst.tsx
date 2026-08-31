import { Animated, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

const CONFETTI_COLOR = Colors.gold;
const CONFETTI_OPACITIES = [1, 0.7, 0.5, 0.3];

// Widens the horizontal spread of the burst without touching how high it goes.
const CONFETTI_WIDTH_SPREAD = 1.4;

const CONFETTI_PIECES = Array.from({ length: 10 }).map((_, i) => {
    // Spread evenly across a wide arc centered on "straight up".
    const angle = -100 + (200 / 9) * i; // Angle for the confetti piece relative to straight up
    const rad = (angle * Math.PI) / 180; // Convert angle to radians
    const distance = 30 + (i % 3) * 8; // Distance the confetti piece will travel
    const burstY = -Math.cos(rad) * distance; // Vertical offset for the burst phase of the confetti piece
    const height = i % 3 === 0 ? 7 : 5; // Height of the confetti piece

    return {
        dx: Math.sin(rad) * distance * CONFETTI_WIDTH_SPREAD, // Horizontal offset
        burstY,
        fallY: burstY + 18, // Vertical offset for the falling phase
        rotate: (i % 2 === 0 ? 1 : -1) * (120 + i * 20), // Rotation angle
        color: CONFETTI_COLOR,
        baseOpacity: CONFETTI_OPACITIES[i % CONFETTI_OPACITIES.length],
        height,
        width: Math.round(height * 1.4),
    };
});

// How long the burst needs to fully play out - callers driving `progress`
// should time their Animated.timing to this.
export const CONFETTI_DURATION = 950;

interface ConfettiBurstProps {
    // Shared 0 -> 1 progress driving every particle - keeps this component
    // a pure function of one value instead of running its own animation.
    progress: Animated.Value;
}

export function ConfettiBurst({ progress }: Readonly<ConfettiBurstProps>) {
    return (
        <View style={styles.layer} pointerEvents="none">
            <View style={styles.origin}>
                {CONFETTI_PIECES.map((piece, i) => (
                    <Animated.View
                        key={i}
                        style={[
                            styles.piece,
                            {
                                width: piece.width,
                                height: piece.height,
                                marginLeft: -piece.width / 2,
                                marginTop: -piece.height / 2,
                                backgroundColor: piece.color,
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.15, 0.75, 1],
                                    outputRange: [
                                        0,
                                        piece.baseOpacity,
                                        piece.baseOpacity,
                                        0,
                                    ],
                                }),
                                transform: [
                                    {
                                        translateX: progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, piece.dx],
                                        }),
                                    },
                                    {
                                        translateY: progress.interpolate({
                                            inputRange: [0, 0.4, 1],
                                            outputRange: [
                                                0,
                                                piece.burstY,
                                                piece.fallY,
                                            ],
                                        }),
                                    },
                                    {
                                        rotate: progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [
                                                "0deg",
                                                `${piece.rotate}deg`,
                                            ],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layer: {
        position: "absolute",
        top: -4,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    origin: {
        width: 0,
        height: 0,
    },
    piece: {
        position: "absolute",
        left: 0,
        top: 0,
        borderRadius: 1,
    },
});
