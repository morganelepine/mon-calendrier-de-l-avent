import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Day } from "@/interfaces/dayInterface";

interface DayModalProps {
    day: Day;
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    goToDay: (
        day: Day,
        setModalVisible: (modalVisible: boolean) => void,
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
        <CenteredModal
            visible={modalVisible}
            onRequestClose={onClose}
            dismissOnBackdropPress
            contentStyle={styles.modalView}
        >
            <View>
                <ThemedText style={styles.quotationMark}>«</ThemedText>
                <ThemedText style={styles.quote}>{day.quote}</ThemedText>
                <ThemedText style={styles.quotationMark}>»</ThemedText>
            </View>

            {day.quoteAuthor ? (
                <ThemedText type="italic14" style={{ marginTop: 10 }}>
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
        </CenteredModal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        padding: 20,
        elevation: 4,
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
