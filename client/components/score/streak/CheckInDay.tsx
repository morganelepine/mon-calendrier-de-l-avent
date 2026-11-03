import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated as RNAnimated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { currentDay } from "@/constants/Dates";
import { CHECK_IN_LAST_DAY } from "@/constants/checkIn";
import { showToast } from "@/components/utils/Toast";
import Animated, { useReducedMotion } from "react-native-reanimated";
import {
    ConfettiBurst,
    CONFETTI_DURATION,
} from "@/components/utils/ConfettiBurst";
import { GarlandSwag } from "@/components/score/streak/GarlandSwag";
import { useBaubleSwing } from "@/components/score/streak/useBaubleSwing";

export const CHECK_IN_DAY_WIDTH = 40;
export const CHECK_IN_DAY_GAP = 8;
export const CHECK_IN_ROW_PADDING = 12;
// The garland's two ends run from the block's edges to the first and last baubles.
const EDGE_SWAG_WIDTH = CHECK_IN_ROW_PADDING + CHECK_IN_DAY_WIDTH / 2;
const EDGE_SWAG_SAG = 6;
// Uneven hooks and sags so the garland does not look ruler-straight.
const HOOK_LENGTHS = [4, 10, 6, 12];
const SWAG_SAGS = [9, 7];

// By points earned that day (streak bonus excluded).
const BAUBLE_COLORS_BY_POINTS = [
    { maxPoints: 35, background: Colors.blue, text: Colors.snow },
    { maxPoints: 60, background: Colors.lightBlue, text: Colors.blue },
    { maxPoints: 80, background: Colors.green, text: Colors.snow },
    { maxPoints: 120, background: Colors.red, text: Colors.snow },
    { maxPoints: Infinity, background: Colors.gold, text: Colors.blue },
];

const getBaubleColors = (
    points: number,
): (typeof BAUBLE_COLORS_BY_POINTS)[number] =>
    BAUBLE_COLORS_BY_POINTS.find(({ maxPoints }) => points <= maxPoints) ??
    BAUBLE_COLORS_BY_POINTS[0];

interface CheckInDayProps {
    day: number;
    isChecked: boolean;
    usedJoker: boolean;
    isNextChecked: boolean;
    dayPoints: number;
    bonusPoints?: number;
    pending: boolean;
    onCheckIn: () => Promise<boolean>;
    onMissedPress: () => Promise<boolean>;
}

// One bauble of the garland: its hook, the bauble itself, the bonus it would earn
// underneath, and the string to the next bauble.
export const CheckInDay: React.FC<CheckInDayProps> = ({
    day,
    isChecked,
    usedJoker,
    isNextChecked,
    dayPoints,
    bonusPoints,
    pending,
    onCheckIn,
    onMissedPress,
}) => {
    const bonusLabel = bonusPoints ? `, bonus de ${bonusPoints} points` : "";
    const isToday = day === currentDay;
    const isMissed = !isChecked && day < currentDay;
    const isActive = isChecked || isToday;
    const isLast = day === CHECK_IN_LAST_DAY;
    const baubleColors = getBaubleColors(dayPoints);
    const swingStyle = useBaubleSwing(day);
    const reduceMotion = useReducedMotion();
    const confetti = useRef(new RNAnimated.Value(0)).current;
    // Only mounted while bursting: no idle particles on the 23 other baubles.
    const [celebrating, setCelebrating] = useState(false);

    // Bursts confetti once the bauble is really hung.
    const celebrateIf = async (hang: () => Promise<boolean>): Promise<void> => {
        const hung = await hang();
        if (!hung || reduceMotion) return;
        setCelebrating(true);
        confetti.setValue(0);
        RNAnimated.timing(confetti, {
            toValue: 1,
            duration: CONFETTI_DURATION,
            useNativeDriver: true,
        }).start(() => setCelebrating(false));
    };

    return (
        <View style={styles.column}>
            {day === 1 && (
                <View style={[styles.swag, styles.leftEdgeSwag]}>
                    <GarlandSwag
                        width={EDGE_SWAG_WIDTH}
                        sag={EDGE_SWAG_SAG}
                        isLinked={isChecked}
                    />
                </View>
            )}
            <View style={styles.swag}>
                <GarlandSwag
                    width={
                        isLast
                            ? EDGE_SWAG_WIDTH
                            : CHECK_IN_DAY_WIDTH + CHECK_IN_DAY_GAP
                    }
                    sag={
                        isLast
                            ? EDGE_SWAG_SAG
                            : SWAG_SAGS[day % SWAG_SAGS.length]
                    }
                    isLinked={isChecked && (isLast || isNextChecked)}
                />
            </View>
            <Animated.View style={[styles.bauble, swingStyle]}>
                {/* Hook, ring and cap: decorative, the cell is the bauble. */}
                <View
                    style={[
                        styles.hook,
                        isActive && styles.activeHook,
                        {
                            height: HOOK_LENGTHS[
                                (day - 1) % HOOK_LENGTHS.length
                            ],
                        },
                    ]}
                />
                <View style={[styles.ring, isActive && styles.activeRing]} />
                <View style={[styles.cap, isActive && styles.activeCap]} />
                {isToday && !isChecked ? (
                    <Pressable
                        onPress={() => celebrateIf(onCheckIn)}
                        disabled={pending}
                        accessibilityRole="button"
                        accessibilityLabel={`Accrocher la boule du ${day} décembre${bonusLabel}`}
                        accessibilityState={{
                            disabled: pending,
                            busy: pending,
                        }}
                        style={({ pressed }) => [
                            styles.cell,
                            styles.todayCell,
                            pressed && styles.pressed,
                        ]}
                    >
                        {pending ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.autumnGold}
                            />
                        ) : (
                            <Text style={styles.cellDay}>{day}</Text>
                        )}
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={
                            isChecked
                                ? undefined
                                : isMissed
                                  ? () => celebrateIf(onMissedPress)
                                  : () =>
                                        showToast(
                                            "La boule sortira du carton plus tard !",
                                        )
                        }
                        accessible
                        accessibilityLabel={`Boule du ${day} décembre, ${
                            isChecked
                                ? usedJoker
                                    ? "accrochée avec une boule bonus"
                                    : "accrochée"
                                : isMissed
                                  ? "manquée"
                                  : "à venir"
                        }${bonusLabel}`}
                        style={[
                            styles.cell,
                            isChecked && {
                                backgroundColor: baubleColors.background,
                            },

                            isMissed && styles.missedCell,
                            !isChecked && !isMissed && styles.futureCell,
                        ]}
                    >
                        <Text
                            style={[
                                styles.cellDay,
                                isChecked
                                    ? { color: baubleColors.text }
                                    : styles.inactiveText,
                            ]}
                        >
                            {day}
                        </Text>
                    </Pressable>
                )}
                {celebrating && (
                    <View style={styles.confetti}>
                        <ConfettiBurst progress={confetti} />
                    </View>
                )}
            </Animated.View>
            {/* Already part of the cell's accessibility label. */}
            <Text
                style={styles.bonus}
                importantForAccessibility="no"
                accessibilityElementsHidden
            >
                {bonusPoints ? `+${bonusPoints} pts` : ""}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        width: CHECK_IN_DAY_WIDTH,
        alignItems: "center",
    },
    swag: {
        position: "absolute",
        top: 0,
        left: CHECK_IN_DAY_WIDTH / 2,
    },
    leftEdgeSwag: {
        left: -CHECK_IN_ROW_PADDING,
    },
    bauble: {
        alignItems: "center",
        transformOrigin: "top",
    },
    // Zero-height anchor at the cell's center: the burst starts from the bauble.
    confetti: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: CHECK_IN_DAY_WIDTH / 2,
    },
    hook: {
        width: 1.5,
        backgroundColor: Colors.disabled,
    },
    activeHook: {
        backgroundColor: Colors.blue,
    },
    ring: {
        width: 7,
        height: 7,
        marginBottom: -1,
        borderRadius: 3.5,
        borderWidth: 1.5,
        borderColor: Colors.disabled,
    },
    activeRing: {
        borderColor: Colors.autumnGold,
    },
    cap: {
        width: 12,
        height: 6,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        backgroundColor: Colors.disabled,
    },
    activeCap: {
        backgroundColor: Colors.autumnGold,
    },
    cell: {
        width: CHECK_IN_DAY_WIDTH,
        height: CHECK_IN_DAY_WIDTH,
        borderRadius: CHECK_IN_DAY_WIDTH / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    todayCell: {
        borderWidth: 2,
        borderColor: Colors.autumnGold,
    },
    todayText: {
        color: Colors.autumnGold,
    },
    pressed: {
        opacity: 0.7,
    },
    todayBorder: {
        borderWidth: 2,
        borderColor: Colors.autumnGold,
    },
    missedCell: {
        backgroundColor: Colors.disabled,
    },
    futureCell: {
        borderWidth: 1,
        borderColor: Colors.disabled,
    },
    cellDay: {
        fontFamily: "PoppinsBold",
        paddingTop: 3,
        fontSize: 16,
        color: Colors.autumnGold,
    },
    inactiveText: {
        color: Colors.disabledText,
    },
    bonus: {
        marginTop: 2,
        fontFamily: "PoppinsBold",
        fontSize: 10,
        lineHeight: 16,
        color: Colors.red,
    },
});
