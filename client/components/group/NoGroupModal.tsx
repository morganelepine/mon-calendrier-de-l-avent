import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { CustomModal } from "@/components/utils/custom/CustomModal";

export const NoGroupModal = ({
    createMyGroup,
    modalVisible,
    setModalVisible,
}: {
    createMyGroup: () => void;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}) => {
    return (
        <CustomModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <ThemedText
                        style={{
                            color: Colors.darkGreen,
                            textAlign: "center",
                        }}
                    >
                        Créez un groupe pour retrouver plus facilement les
                        scores de&nbsp;vos&nbsp;ami·e·s !
                    </ThemedText>

                    <Pressable style={styles.button} onPress={createMyGroup}>
                        <ThemedText style={{ color: Colors.snow }}>
                            Créer mon groupe
                        </ThemedText>
                    </Pressable>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <ThemedText
                            style={{
                                fontStyle: "italic",
                                textDecorationLine: "underline",
                            }}
                        >
                            Annuler
                        </ThemedText>
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalView: {
        marginHorizontal: 40,
        padding: 20,
        alignItems: "center",
        backgroundColor: Colors.snow,
        borderRadius: 20,
        gap: 16,
    },
    button: {
        backgroundColor: Colors.green,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 24,
        alignSelf: "center",
    },
});
