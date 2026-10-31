import { ThemedText } from "@/components/ThemedText";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";

interface Props {
    title: string;
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    children: React.ReactNode;
}

export const BingoRulesModal: React.FC<Props> = ({
    title,
    modalVisible,
    setModalVisible,
    children,
}) => {
    const onClose = () => {
        setModalVisible(false);
    };
    return (
        <ModalWithCloseButton visible={modalVisible} onRequestClose={onClose}>
            <ThemedText type="modalTitle">{title}</ThemedText>
            {children}
        </ModalWithCloseButton>
    );
};
