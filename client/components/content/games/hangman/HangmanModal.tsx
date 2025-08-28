import {
    StyleSheet,
    View,
    Pressable,
    Text,
    TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { Colors } from "@/constants/Colors";

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
        <CustomModal visible={modalVisible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modal}>
                            <ThemedText>{modalMessage}</ThemedText>
                            <ThemedText>
                                Le mot à trouver était{" "}
                                <Text style={{ fontFamily: "PoppinsBold" }}>
                                    {currentWord}
                                </Text>
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
                                    Ce jeu de Noël est terminé 🎅
                                </ThemedText>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal: {
        marginHorizontal: 20,
        padding: 30,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
        elevation: 4,
        alignSelf: "center",
        gap: 10,
    },
    nextQuestionButton: {
        borderColor: Colors.red,
        borderWidth: 2,
        borderRadius: 50,
        paddingHorizontal: 20,
        minHeight: 48,
        justifyContent: "center",
        marginTop: 10,
    },
    nextQuestionText: {
        fontFamily: "PoppinsBold",
        color: Colors.red,
    },
    modalFinalText: {
        fontFamily: "PoppinsItalic",
        fontSize: 14,
        marginTop: 10,
        color: Colors.red,
    },
});
