import {
    StyleSheet,
    View,
    Pressable,
    TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Day } from "@/interfaces/dayInterface";

interface DayModalProps {
    day: Day;
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    goToDay: (day: Day) => void;
}

export const DayModal: React.FC<DayModalProps> = ({
    day,
    modalVisible,
    setModalVisible,
    goToDay,
}) => {
    const onClose = () => {
        setModalVisible(false);
    };

    return (
        <CustomModal visible={modalVisible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={styles.quoteContainer}>
                                <ThemedText style={styles.quotationMark}>
                                    «
                                </ThemedText>
                                <ThemedText style={styles.quote}>
                                    {day.quote}
                                </ThemedText>
                                <ThemedText style={styles.quotationMark}>
                                    »
                                </ThemedText>
                            </View>

                            {day.quoteAuthor ? (
                                <ThemedText style={styles.author}>
                                    {day.quoteAuthor}
                                </ThemedText>
                            ) : null}

                            <Pressable
                                onPress={() => goToDay(day)}
                                style={styles.button}
                            >
                                <Ionicons
                                    name={"arrow-forward-outline"}
                                    size={25}
                                    color={Colors.snow}
                                />
                            </Pressable>
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
    modalView: {
        margin: 20,
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: Colors.snow,
        borderRadius: 50,
        boxShadow: "0px 3px 4.65px rgba(0,0,0,0.29)",
    },
    date: { fontFamily: "PallyBold", marginBottom: 20 },
    quoteContainer: { marginBottom: 10 },
    quotationMark: {
        fontSize: 50,
        lineHeight: 50,
        color: Colors.green,
    },
    quote: {
        fontSize: 20,
        fontStyle: "italic",
        marginBottom: 20,
    },
    author: {
        fontSize: 14,
        fontFamily: "AnonymousProItalic",
    },
    button: {
        borderRadius: 50,
        backgroundColor: Colors.green,
        marginTop: 30,
        height: 48,
        width: 48,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
    },
});
