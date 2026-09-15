import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { countdownTitleStyle } from "@/components/calendar/Countdown/countdownStyles";

interface NightsCountdownProps {
    nights: number;
}

// Default, free variant: "x nuits avant Noël".
export const NightsCountdown = ({ nights }: NightsCountdownProps) => (
    <>
        <ThemedText style={[countdownTitleStyle, styles.countdown]}>
            {nights} {nights > 1 ? "nuits" : "nuit"}
        </ThemedText>
        <ThemedText style={[countdownTitleStyle, styles.beforeChristmas]}>
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
