import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { clues } from "@/data/story_game_clues";

interface GameAnsweredProps {
    answer: string;
    index: number;
    win: boolean;
}

export const GameAnswered: React.FC<GameAnsweredProps> = ({
    answer,
    index,
    win,
}) => {
    return (
        <>
            {win ? (
                <>
                    <ThemedText style={{ textAlign: "center" }}>
                        Bravo 🥳 la réponse était&nbsp;bien
                    </ThemedText>
                    <ThemedText style={styles.resultText}>{answer}</ThemedText>
                </>
            ) : (
                <>
                    <ThemedText style={{ textAlign: "center" }}>
                        Bien tenté 😌 malheureusement, la&nbsp;bonne réponse
                        était
                    </ThemedText>
                    <ThemedText style={styles.resultText}>{answer}</ThemedText>
                </>
            )}

            <ThemedText style={styles.clues}>
                Voici les indices disséminés dans l'histoire&nbsp;:
            </ThemedText>

            {(clues as Record<number, string[]>)[index]?.map(
                (clue: string, i: number) => (
                    <ThemedText key={`${index}-${i}`} style={{ fontSize: 14 }}>
                        • {clue}
                    </ThemedText>
                )
            )}
        </>
    );
};

const styles = StyleSheet.create({
    resultText: {
        color: Colors.green,
        fontFamily: "PallyBold",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: 20,
    },
    clues: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 14,
    },
});
