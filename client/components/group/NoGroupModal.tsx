import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";

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
        <CenteredModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            overlayOpacity={0.7}
            contentStyle={styles.modalView}
        >
            <ThemedText
                style={{
                    color: Colors.darkGreen,
                    textAlign: "center",
                }}
            >
                Créez un groupe pour retrouver plus facilement les scores
                de&nbsp;vos&nbsp;ami·e·s !
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
        </CenteredModal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        marginHorizontal: 40,
        padding: 20,
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
