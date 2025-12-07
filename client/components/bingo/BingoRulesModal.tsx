import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { BingoRules } from "@/components/bingo/BingoRules";
import { Colors } from "@/constants/Colors";
import { ModalWithCloseButton } from "../utils/custom/ModalWithCloseButton";

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
                Les&nbsp;bingos de&nbsp;Noël
            </ThemedText>
            <CustomScrollView>
                <BingoRules />
            </CustomScrollView>
        </ModalWithCloseButton>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        fontFamily: "PoppinsBold",
        textAlign: "center",
        marginTop: 20,
        fontSize: 22,
        color: Colors.blue,
    },
});
