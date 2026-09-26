import { StyleSheet, View, Pressable, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
import { Colors, Theme } from "@/constants/Colors";
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
                <ThemedText style={styles.quotationMark}>”</ThemedText>
                <ThemedText style={styles.quote}>{day.quote}</ThemedText>
            </View>

            {day.quoteAuthor ? (
                <ThemedText style={styles.quoteAuthor}>
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
        padding: 20,
        width: "80%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 50,
    },
    quotationMark: {
        fontSize: Platform.OS === "web" ? 42 : 54,
        lineHeight: 45,
        fontFamily: "FreightNeoBold",
        color: Theme.autumnGreenDarkToGreen,
        textAlign: "center",
    },
    quote: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "FreightNeo",
    },
    quoteAuthor: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 16,
    },
    button: {
        borderRadius: 50,
        backgroundColor: Theme.autumnGreenDarkToGreen,
        marginTop: 16,
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
    },
});
