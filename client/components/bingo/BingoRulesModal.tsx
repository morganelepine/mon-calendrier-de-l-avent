import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { BingoRules } from "@/components/bingo/BingoRules";
import { Theme } from "@/constants/Colors";
import { isHalloween } from "@/constants/Dates";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";

interface Props {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const BingoRulesModal: React.FC<Props> = ({
    modalVisible,
    setModalVisible,
}) => {
    const onClose = () => {
        setModalVisible(false);
    };
    return (
        <ModalWithCloseButton visible={modalVisible} onRequestClose={onClose}>
            <ThemedText style={styles.modalTitle}>
                {isHalloween ? "Le bingo automnal" : "Les bingos de Noël"}
            </ThemedText>
            {isHalloween ? (
                <BingoRules />
            ) : (
                <CustomScrollView>
                    <BingoRules />
                </CustomScrollView>
            )}
        </ModalWithCloseButton>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        fontFamily: "PoppinsBold",
        textAlign: "center",
        marginTop: 20,
        fontSize: 22,
        color: Theme.tint,
    },
});
