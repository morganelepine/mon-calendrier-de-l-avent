import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { isDecember } from "@/constants/Dates";

interface TotalScoreProps {
    score: number;
}

export const TotalScore: React.FC<TotalScoreProps> = ({ score }) => {
    const minScoreToWin = 2512;
    const progress = (score / minScoreToWin) * 100;
    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(`${progress}%`, { duration: 1000 }),
    }));

    return (
        <View style={styles.container}>
            {score > 0 && isDecember && (
                <>
                    <ThemedText style={styles.score}>
                        <ThemedText
                            type="pallyBoldSnow"
                            style={{ textAlign: "center" }}
                        >
                            {score}
                        </ThemedText>{" "}
                        {score > 1 ? "points" : "point"}
                    </ThemedText>

                    {score >= minScoreToWin ? (
                        <>
                            <ThemedText
                                style={{
                                    color: Colors.snow,
                                    textAlign: "center",
                                }}
                            >
                                Objectif atteint ✨
                            </ThemedText>
                            <ThemedText
                                type="italic14"
                                style={{
                                    marginBottom: 30,
                                    color: Colors.snow,
                                    textAlign: "center",
                                }}
                            >
                                Rendez-vous le 25 décembre
                                pour&nbsp;la&nbsp;surprise&nbsp;!
                            </ThemedText>
                        </>
                    ) : (
                        <>
                            <View style={styles.barContainer}>
                                <Animated.View
                                    style={[styles.completion, animatedStyle]}
                                />
                            </View>
                            <ThemedText
                                style={{
                                    marginBottom: 20,
                                    color: Colors.snow,
                                    fontSize: 14,
                                }}
                            >
                                {Math.round(progress)}% de l'objectif atteint
                            </ThemedText>
                        </>
                    )}
                </>
            )}

            {!isDecember && (
                <ThemedText
                    style={{
                        marginBottom: 20,
                        marginTop: 10,
                        color: Colors.snow,
                    }}
                >
                    Rendez-vous le 1er décembre pour commencer à gagner des
                    points !
                </ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: "100%",
    },
    score: {
        fontSize: 50,
        color: Colors.snow,
    },
    barContainer: {
        position: "relative",
        alignSelf: "stretch",
        height: 20,
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 50,
    },
    completion: {
        position: "absolute",
        alignSelf: "stretch",
        height: "100%",
        backgroundColor: Colors.pink,
        borderRadius: 50,
    },
});
