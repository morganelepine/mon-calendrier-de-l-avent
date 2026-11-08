import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";
import type { ReminderSlot } from "@/types/types";

export const REMINDER_SLOT_LABELS: Record<
    ReminderSlot,
    { option: string; sentence: string }
> = {
    morning: { option: "Matin (9h)", sentence: "vers 9h" },
    evening: { option: "Soir (18h)", sentence: "vers 18h" },
};

const SLOTS: ReminderSlot[] = ["morning", "evening"];

interface ReminderSlotSelectorProps {
    value: ReminderSlot;
    onChange: (slot: ReminderSlot) => void;
}

export const ReminderSlotSelector = ({
    value,
    onChange,
}: ReminderSlotSelectorProps) => (
    <View
        accessibilityRole="radiogroup"
        accessibilityLabel="Heure du rappel"
        style={styles.row}
    >
        {SLOTS.map((slot) => {
            const checked = slot === value;
            return (
                <Pressable
                    key={slot}
                    onPress={() => onChange(slot)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked }}
                    hitSlop={8}
                    style={[styles.option, checked && styles.optionChecked]}
                >
                    <ThemedText
                        type="sectionText"
                        style={[styles.label, checked && styles.labelChecked]}
                    >
                        {REMINDER_SLOT_LABELS[slot].option}
                    </ThemedText>
                </Pressable>
            );
        })}
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    option: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Theme.orangeToBlue,
    },
    optionChecked: {
        backgroundColor: Theme.orangeToBlue,
    },
    label: {
        color: Theme.orangeToBlue,
        paddingTop: 4,
    },
    labelChecked: {
        color: Colors.snow,
    },
});
