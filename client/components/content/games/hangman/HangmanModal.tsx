import { StyleSheet, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
import { CustomButton } from "@/components/utils/buttons/Button";
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
            <ThemedText style={{ textAlign: "center" }}>
                {modalMessage}
            </ThemedText>
            <ThemedText style={{ textAlign: "center" }}>
                Le mot à trouver était{" "}
                <Text style={{ fontFamily: "PoppinsBold" }}>{currentWord}</Text>
            </ThemedText>
            {currentWordIndex < words.length - 1 ? (
                <CustomButton
                    onPress={handleNextQuestion}
                    style={styles.button}
                >
                    Partie suivante
                </CustomButton>
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
    button: {
        marginTop: 10,
    },
    modalFinalText: {
        fontFamily: "PoppinsItalic",
        fontSize: 14,
        color: Theme.red,
    },
});
