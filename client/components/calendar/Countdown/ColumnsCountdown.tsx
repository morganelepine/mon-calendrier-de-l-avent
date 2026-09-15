import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { countdownTitleStyle } from "@/components/calendar/Countdown/countdownStyles";
import {
    formatUnitLabel,
    getCountdownUnits,
} from "@/components/calendar/Countdown/countdownUnits";
import { CountdownValues } from "@/hooks/useCountdown";

interface ColumnsCountdownProps extends CountdownValues {
    showSeconds: boolean;
}

// Premium variant: (days/)hours/minutes/(seconds) side by side.
export const ColumnsCountdown = ({
    showSeconds,
    ...values
}: ColumnsCountdownProps) => {
    const units = getCountdownUnits(showSeconds, values.days);
    const compact = units.length > 3;

    return (
        <View style={styles.row}>
            {units.map(({ key, singular, plural }) => {
                const value = values[key];

                return (
                    <View key={key} style={styles.column}>
                        <ThemedText
                            style={[
                                countdownTitleStyle,
                                styles.value,
                                compact && styles.valueCompact,
                            ]}
                        >
                            {String(value).padStart(2, "0")}
                        </ThemedText>
                        <ThemedText
                            style={[
                                countdownTitleStyle,
                                styles.label,
                                compact && styles.labelCompact,
                            ]}
                        >
                            {formatUnitLabel(value, singular, plural)}
                        </ThemedText>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        width: "100%",
    },
    column: {
        flex: 1,
        alignItems: "center",
    },
    value: {
        fontSize: 68,
        letterSpacing: 2,
        fontVariant: ["tabular-nums"],
    },
    valueCompact: {
        fontSize: 52,
    },
    label: {
        fontSize: 20,
        fontFamily: "FreightNeo",
        marginTop: -8,
    },
    labelCompact: {
        fontSize: 15,
    },
});
