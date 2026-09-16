import { StyleSheet, View, Switch } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Theme } from "@/constants/Colors";

interface SettingsToggleRowProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
}

export const SettingsToggleRow = ({
    label,
    value,
    onValueChange,
    disabled = false,
}: SettingsToggleRowProps) => {
    return (
        <View style={[styles.row, disabled && styles.disabled]}>
            <ThemedText type="sectionText" style={{ color: Theme.tint }}>
                {label}
            </ThemedText>

            <Switch
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                trackColor={{ false: "#ccc", true: Theme.tint }}
                thumbColor="#fff"
                style={styles.switch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 20,
    },
    disabled: {
        opacity: 0.6,
    },
    switch: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
});
