import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { ThemedText } from "@/components/ThemedText";
import { isOctober } from "@/constants/Dates";

interface Props {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const Game2048RulesModal: React.FC<Props> = ({
    modalVisible,
    setModalVisible,
}) => {
    const onClose = () => {
        setModalVisible(false);
    };

    const goal = isOctober ? "le chaudron magique !" : "le Père Noël !";

    return (
        <ModalWithCloseButton visible={modalVisible} onRequestClose={onClose}>
            <ThemedText type="modalTitle">
                {isOctober ? "Le 2048 d'automne" : "Le 2048 de Noël"}
            </ThemedText>
            <ThemedText type="sectionText">
                Faites glisser les cases vers le haut, le bas, la gauche ou la
                droite. Quand deux cases affichant le même symbole se touchent,
                elles fusionnent en la suivante.
            </ThemedText>
            <ThemedText type="sectionText">
                Le but ? Enchaîner les fusions jusqu'à faire apparaître {goal}
            </ThemedText>
            <ThemedText type="sectionText">
                Rejouez autant de fois que vous voulez, quand vous voulez : seul
                votre meilleur score compte pour le classement.
            </ThemedText>
        </ModalWithCloseButton>
    );
};
