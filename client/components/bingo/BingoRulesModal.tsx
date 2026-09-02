import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { BingoRules } from "@/components/bingo/BingoRules";
import { isOctober } from "@/constants/Dates";
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
            <ThemedText type="modalTitle">
                {isOctober ? "Le bingo automnal" : "Les bingos de Noël"}
            </ThemedText>
            {isOctober ? (
                <BingoRules />
            ) : (
                <CustomScrollView>
                    <BingoRules />
                </CustomScrollView>
            )}
        </ModalWithCloseButton>
    );
};
