import { StyleSheet, Pressable, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
import { Colors, Theme } from "@/constants/Colors";

interface ModalProps {
    modalVisible: boolean;
    modalMessage: string;
    onClose: () => void;
    words: string[];
    currentWord: string;
    currentWordIndex: number;
    handleNextQuestion: () => void;
}

export const HangmanModal: React.FC<ModalProps> = ({
    modalVisible,
    modalMessage,
    onClose,
    words,
    currentWord,
    currentWordIndex,
    handleNextQuestion,
}) => {
    return (
        <CenteredModal
            visible={modalVisible}
            onRequestClose={onClose}
            dismissOnBackdropPress
            contentStyle={styles.modal}
        >
            <ThemedText>{modalMessage}</ThemedText>
            <ThemedText style={{ textAlign: "center" }}>
                Le mot à trouver était{" "}
                <Text style={{ fontFamily: "PoppinsBold" }}>{currentWord}</Text>
            </ThemedText>
            {currentWordIndex < words.length - 1 ? (
                <Pressable
                    onPress={handleNextQuestion}
                    style={styles.nextQuestionButton}
                >
                    <ThemedText style={styles.nextQuestionText}>
                        Partie suivante
                    </ThemedText>
                </Pressable>
            ) : (
                <ThemedText style={styles.modalFinalText}>
                    Ce jeu est terminé !
                </ThemedText>
            )}
        </CenteredModal>
    );
};

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 20,
        padding: 30,
        backgroundColor: Colors.snow,
        borderRadius: 30,
        elevation: 4,
        gap: 10,
    },
    nextQuestionButton: {
        borderColor: Theme.red,
        borderWidth: 2,
        borderRadius: 50,
        paddingHorizontal: 20,
        minHeight: 48,
        justifyContent: "center",
        marginTop: 10,
    },
    nextQuestionText: {
        fontFamily: "PoppinsBold",
        color: Theme.red,
    },
    modalFinalText: {
        fontFamily: "PoppinsItalic",
        fontSize: 14,
        color: Theme.red,
    },
});
