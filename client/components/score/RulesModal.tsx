import { StyleSheet, View, Pressable } from "react-native";
import { Rules } from "@/components/score/Rules";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

interface RulesModalProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({
    modalVisible,
    setModalVisible,
}) => {
    const onClose = () => {
        setModalVisible(false);
    };
    return (
        <CustomModal visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <ThemedText style={styles.modalTitle}>
                        Règles pour gagner des&nbsp;points
                    </ThemedText>

                    <CustomScrollView>
                        <Rules />
                    </CustomScrollView>

                    <Pressable
                        onPress={() => {
                            setModalVisible(false);
                        }}
                        style={styles.closeButton}
                    >
                        <Ionicons
                            name={"close-outline"}
                            size={35}
                            color={Colors.blue}
                        />
                    </Pressable>
                </View>
            </View>
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
        height: "75%",
        marginHorizontal: 20,
        alignItems: "center",
        backgroundColor: Colors.snow,
        borderRadius: 20,
        elevation: 4,
    },
    modalTitle: {
        fontFamily: "PoppinsBold",
        textAlign: "center",
        marginVertical: 20,
        fontSize: 22,
        color: Colors.blue,
    },
    closeButton: {
        marginTop: 10,
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
