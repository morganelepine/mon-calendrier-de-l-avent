import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import {
    countdownTitleStyle,
    scaleTextStyle,
} from "@/components/calendar/Countdown/countdownStyles";

interface NightsCountdownProps {
    nights: number;
    scale?: number;
}

// Default, free variant: "x nuits avant Noël".
export const NightsCountdown = ({
    nights,
    scale = 1,
}: NightsCountdownProps) => (
    <>
        <ThemedText
            style={[
                countdownTitleStyle,
                scaleTextStyle(styles.countdown, scale),
            ]}
        >
            {nights} {nights > 1 ? "nuits" : "nuit"}
        </ThemedText>
        <ThemedText
            style={[
                countdownTitleStyle,
                scaleTextStyle(styles.beforeChristmas, scale),
            ]}
        >
            avant Noël
        </ThemedText>
    </>
);

const styles = StyleSheet.create({
    countdown: {
        fontSize: 55,
        letterSpacing: 6,
        marginBottom: -8,
    },
    beforeChristmas: {
        fontSize: 28,
        fontFamily: "FreightNeo",
    },
});
