import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { STATUS_COLORS } from "@/components/content/games/wordle/WordleGrid";
import { LetterStatus } from "@/utils/wordle/engine";
import { Theme } from "@/constants/Colors";

export const BACKSPACE = "⌫";
export const ENTER = "✓";

const ROWS = [
    "AZERTYUIOP".split(""),
    "QSDFGHJKLM".split(""),
    [BACKSPACE, ..."WXCVBN".split(""), ENTER],
];

interface MysteryWordKeyboardProps {
    statuses: Record<string, LetterStatus>;
    onKeyPress: (key: string) => void;
}

export const WordleKeyboard: React.FC<MysteryWordKeyboardProps> = ({
    statuses,
    onKeyPress,
}) => {
    return (
        <View style={styles.keyboard}>
            {ROWS.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((key) => {
                        const status = statuses[key];
                        const isAction = key === BACKSPACE || key === ENTER;
                        return (
                            <Pressable
                                key={key}
                                onPress={() => onKeyPress(key)}
                                style={[
                                    styles.key,
                                    isAction && styles.actionKey,
                                    key === ENTER && styles.enterKey,
                                    status && {
                                        backgroundColor: STATUS_COLORS[status],
                                    },
                                ]}
                            >
                                <ThemedText style={[styles.keyText]}>
                                    {key}
                                </ThemedText>
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    keyboard: {
        width: "100%",
        gap: 6,
        paddingBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 4,
    },
    key: {
        flex: 1,
        maxWidth: 40,
        height: 50,
        borderRadius: 8,
        backgroundColor: Theme.autumnGreenDarkToautumnGreen,
        justifyContent: "center",
        alignItems: "center",
    },
    actionKey: {
        flex: 1.5,
        maxWidth: 60,
    },
    enterKey: {
        backgroundColor: Theme.autumnGreenDarkToGreen,
        fontFamily: "PoppinsBold",
    },
    keyText: {
        color: "white",
        fontSize: 20,
        lineHeight: 26,
        fontFamily: "FreightNeoBold",
    },
});
