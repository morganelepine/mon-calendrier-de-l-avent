import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
import { CreateGroupPrompt } from "@/components/group/CreateGroupPrompt";
import { useCreateGroup } from "@/hooks/useCreateGroup";
import { useUser } from "@/contexts/UserContext";

export const NoGroupModal = ({
    modalVisible,
    setModalVisible,
}: {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}) => {
    const { userId, userUuid } = useUser();
    const createMyGroup = useCreateGroup(userId, userUuid);

    const handleCreate = async () => {
        const created = await createMyGroup();
        setModalVisible(false);
        if (created) router.navigate("/scores/group");
    };

    return (
        <CenteredModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            overlayOpacity={0.7}
            contentStyle={styles.modalView}
        >
            <CreateGroupPrompt
                onPress={handleCreate}
                textColor={Colors.darkGreen}
            />
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
});
