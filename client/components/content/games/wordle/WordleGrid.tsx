import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { evaluateGuess, LetterStatus } from "@/utils/wordle/engine";
import { Colors, Theme } from "@/constants/Colors";

interface MysteryWordGridProps {
    answer: string;
    guesses: string[];
    currentGuess: string;
    maxTries: number;
}

export const STATUS_COLORS: Record<LetterStatus, string> = {
    correct: Theme.autumnGreenDarkToGreen,
    present: Colors.autumnYellow,
    absent: Colors.disabledText,
};

export const WordleGrid: React.FC<MysteryWordGridProps> = ({
    answer,
    guesses,
    currentGuess,
    maxTries,
}) => {
    const rows = Array.from({ length: maxTries }, (_, rowIndex) => {
        if (rowIndex < guesses.length) {
            const guess = guesses[rowIndex];
            return { letters: guess, statuses: evaluateGuess(guess, answer) };
        }
        if (rowIndex === guesses.length) {
            return { letters: currentGuess, statuses: null };
        }
        return { letters: "", statuses: null };
    });

    return (
        <View style={styles.grid}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {answer.split("").map((_, index) => {
                        const letter = row.letters[index] ?? "";
                        const status = row.statuses?.[index];
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.cell,
                                    status && {
                                        backgroundColor: STATUS_COLORS[status],
                                        borderColor: STATUS_COLORS[status],
                                    },
                                ]}
                            >
                                <ThemedText
                                    style={[
                                        styles.letter,
                                        status && { color: "white" },
                                    ]}
                                >
                                    {letter}
                                </ThemedText>
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        width: "100%",
        gap: 6,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },
    cell: {
        flex: 1,
        maxWidth: 52,
        aspectRatio: 1,
        borderWidth: 1.5,
        borderRadius: 8,
        borderColor: Theme.autumnGreenDarkToGreen,
        justifyContent: "center",
        alignItems: "center",
    },
    letter: {
        fontSize: 28,
        fontFamily: "FreightNeoBold",
        color: Theme.autumnGreenDarkToGreen,
    },
});
