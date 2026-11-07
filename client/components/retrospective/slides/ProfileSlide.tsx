import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    FadeInDown,
    FadeOutUp,
    useAnimatedStyle,
    useReducedMotion,
    withTiming,
    ZoomIn,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { Comparison } from "@/components/retrospective/slides/Comparison";
import {
    TIME_PROFILES,
    formatPercent,
} from "@/components/retrospective/retrospectiveTexts";
import { Colors } from "@/constants/Colors";
import {
    Retrospective,
    TimeProfile,
} from "@/interfaces/retrospectiveInterface";

const CANDIDATE_DURATION = 700;
const REVEAL_DURATION = 400;
const PROFILES = Object.keys(TIME_PROFILES) as TimeProfile[];

type ProfileSlideProps = Pick<Retrospective, "timeProfile"> & {
    icon: string; // Cloudinary id of the comparison icon
};

export const ProfileSlide: React.FC<ProfileSlideProps> = ({
    timeProfile,
    icon,
}) => {
    const reduceMotion = useReducedMotion();
    const [step, setStep] = useState(0);

    const candidates = PROFILES.filter((key) => key !== timeProfile.value);
    const revealed = reduceMotion || step >= candidates.length;

    useEffect(() => {
        if (revealed) return undefined;
        const timer = setTimeout(
            () => setStep((current) => current + 1),
            CANDIDATE_DURATION,
        );
        return (): void => clearTimeout(timer);
    }, [step, revealed]);

    const shownProfile = revealed ? timeProfile.value : candidates[step];
    const profile = TIME_PROFILES[timeProfile.value];
    const slot = `Vous ouvriez le plus souvent vos\u00A0cases ${profile.slot}.`;
    const comparison = `Comme ${formatPercent(timeProfile.samePercent)} des\u00a0joueur·euse·s`;

    const revealStyle = useAnimatedStyle(() => ({
        opacity: withTiming(revealed ? 1 : 0, { duration: REVEAL_DURATION }),
    }));

    return (
        // The label gives screen readers the result, not the candidates.
        // The description stays mounted so the layout doesn't jump on reveal.
        <View
            accessible
            accessibilityLabel={`${profile.title}. ${profile.description} ${slot} ${comparison}`}
            style={styles.container}
        >
            <Animated.View
                key={shownProfile}
                entering={
                    revealed
                        ? ZoomIn.springify().damping(70)
                        : FadeInDown.duration(250)
                }
                exiting={FadeOutUp.duration(200)}
            >
                <ThemedText
                    style={[styles.title, !revealed && styles.candidate]}
                >
                    {TIME_PROFILES[shownProfile].title}
                </ThemedText>
            </Animated.View>
            <Animated.View style={revealStyle}>
                <ThemedText style={styles.description}>
                    {profile.description}
                </ThemedText>
                <ThemedText style={styles.slot}>{slot}</ThemedText>
                <Comparison text={comparison} image={icon} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    title: {
        fontFamily: "FreightNeoBold",
        fontSize: 34,
        color: Colors.lightRed,
        textAlign: "center",
        marginBottom: 8,
    },
    candidate: {
        opacity: 0.5,
    },
    description: {
        textAlign: "center",
        paddingHorizontal: 8,
    },
    slot: {
        fontFamily: "PoppinsItalic",
        fontSize: 13,
        textAlign: "center",
        marginTop: 12,
        paddingHorizontal: 8,
    },
});
