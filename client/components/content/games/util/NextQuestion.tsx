import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Theme } from "@/constants/Colors";
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
                <ThemedText type="italic14" style={styles.finalText}>
                    Ce jeu est terminé !
                </ThemedText>
            ) : (
                <CustomButton
                    onPress={handleNextQuestion}
                    style={styles.button}
                >
                    Question suivante
                </CustomButton>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        marginBottom: 40,
    },
    finalText: {
        marginVertical: 20,
        color: Theme.red,
    },
});
