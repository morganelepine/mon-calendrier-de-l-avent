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
                    <ThemedText type="modalTitle" style={styles.modalTitle}>
                        Règles pour gagner des&nbsp;points
                    </ThemedText>

                    <CustomScrollView style={{ paddingHorizontal: 20 }}>
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
        paddingBottom: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
        elevation: 5,
    },
    modalTitle: { paddingHorizontal: 15, fontSize: 24, color: Colors.blue },
    closeButton: {
        marginTop: 10,
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
