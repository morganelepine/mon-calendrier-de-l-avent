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
    goToDay: (
        day: Day,
        setModalVisible: (modalVisible: boolean) => void
    ) => void;
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
                            <View>
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
                                <ThemedText
                                    type="italic14"
                                    style={{ marginTop: 10 }}
                                >
                                    {day.quoteAuthor}
                                </ThemedText>
                            ) : null}

                            <Pressable
                                onPress={() => goToDay(day, setModalVisible)}
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        padding: 20,
        backgroundColor: Colors.snow,
        borderRadius: 20,
        elevation: 4,
        alignItems: "center",
    },
    quotationMark: {
        fontSize: 50,
        lineHeight: 50,
        color: Colors.green,
        textAlign: "center",
    },
    quote: {
        fontSize: 20,
        fontStyle: "italic",
        textAlign: "center",
    },
    button: {
        borderRadius: 50,
        backgroundColor: Colors.green,
        marginTop: 30,
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
    },
});
