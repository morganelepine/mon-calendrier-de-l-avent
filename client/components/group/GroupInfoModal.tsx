import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";

export const GroupInfoModal = ({
    modalVisible,
    setModalVisible,
}: {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}) => {
    return (
        <ModalWithCloseButton
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <ThemedText type="modalTitleSmall">Gestion du groupe</ThemedText>

            <View>
                <ThemedText type="sectionSubtitle">
                    Ajouter un membre
                </ThemedText>
                <ThemedText type="sectionText">
                    Pour ajouter un membre à votre groupe, cliquez sur "Ajouter
                    des lutins", recherchez-le à partir de son nom dans la barre
                    de recherche, sélectionnez le nom souhaité, puis cliquez sur
                    le bouton "Ajouter au groupe".
                </ThemedText>
            </View>

            <View>
                <ThemedText type="sectionSubtitle">
                    Supprimer un membre
                </ThemedText>
                <ThemedText type="sectionText">
                    Pour supprimer un membre de votre groupe, cliquez simplement
                    sur le nom du membre en question !
                </ThemedText>
            </View>
        </ModalWithCloseButton>
    );
};
