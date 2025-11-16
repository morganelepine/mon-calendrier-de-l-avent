import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";

interface NextQuestionProps {
    games: Content[] | string[];
    currentQuestionIndex: number;
    handleNextQuestion: () => void;
}

export const NextQuestion: React.FC<NextQuestionProps> = ({
    games,
    currentQuestionIndex,
    handleNextQuestion,
}) => {
    return (
        <>
            {currentQuestionIndex === games.length - 1 ? (
                <ThemedText style={styles.finalText}>
                    Ce jeu de Noël est terminé 🎅
                </ThemedText>
            ) : (
                <Pressable
                    onPress={handleNextQuestion}
                    style={styles.nextQuestionButton}
                >
                    <ThemedText style={styles.nextQuestionText}>
                        Question suivante
                    </ThemedText>
                </Pressable>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    nextQuestionButton: {
        borderColor: Colors.red,
        borderWidth: 2,
        borderRadius: 50,
        paddingHorizontal: 20,
        minHeight: 48,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
    },
    nextQuestionText: {
        fontFamily: "PoppinsBold",
        color: Colors.red,
    },
    finalText: {
        fontFamily: "PoppinsItalic",
        fontSize: 14,
        marginVertical: 20,
        color: Colors.red,
    },
});
