import { Linking, StyleSheet } from "react-native";
import { Theme } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { PLAY_STORE_URL } from "@/constants/Links";

const DEFAULT_MESSAGE =
    "Les lutins ont glissé de nouvelles surprises dans l’application : mettez-la à jour pour en profiter ✨";

export const RecommendedUpdateModal = ({
    visible,
    message,
    onClose,
}: {
    visible: boolean;
    message: string | null;
    onClose: () => void;
}) => {
    return (
        <ModalWithCloseButton visible={visible} onRequestClose={onClose}>
            <ThemedText style={styles.title}>
                Nouvelle version disponible
            </ThemedText>
            <ThemedText type="sectionText" style={{ textAlign: "center" }}>
                {message ?? DEFAULT_MESSAGE}
            </ThemedText>
            <CustomButton
                color={Theme.orangeToGreen}
                onPress={() => {
                    Linking.openURL(PLAY_STORE_URL);
                    onClose();
                }}
            >
                Mettre à jour
            </CustomButton>
        </ModalWithCloseButton>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "FreightNeoBold",
        textAlign: "center",
        marginTop: 20,
        fontSize: 22,
        color: Theme.orangeToGreen,
    },
});
