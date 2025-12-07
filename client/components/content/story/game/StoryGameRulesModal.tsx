import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { Colors } from "@/constants/Colors";

interface Props {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const StoryGameRulesModal: React.FC<Props> = ({
    modalVisible,
    setModalVisible,
}) => {
    const onClose = () => {
        setModalVisible(false);
    };

    return (
        <ModalWithCloseButton visible={modalVisible} onRequestClose={onClose}>
            <ThemedText style={styles.modalTitle}>
                Le jeu littéraire de Noël
            </ThemedText>

            <CustomScrollView>
                <View style={{ marginHorizontal: 20, gap: 8 }}>
                    <ThemedText>
                        Cette année, un petit jeu se glisse entre les lignes des
                        nouvelles de Noël. Dans chacune des trois histoires, des
                        indices ont été disséminés qui mènent tous au titre d’un
                        livre (pour les deux premières) ou d'un film (pour la
                        dernière). Saurez-vous les retrouver ?
                    </ThemedText>

                    <ThemedText>
                        Vous pourrez tenter une réponse à tout moment en bas de
                        page de l'histoire du jour en cliquant sur "J'ai trouvé
                        la solution au jeu littéraire !".
                    </ThemedText>

                    <ThemedText>
                        50 points bonus seront attribués pour chaque titre
                        trouvé ! Attention, vous ne pourrez tenter votre chance
                        qu'une fois pour chaque histoire... (les points bonus ne
                        seront pas listés dans le détail des scores mais seront
                        bien comptabilisés dans le total 😉).
                    </ThemedText>
                </View>
            </CustomScrollView>
        </ModalWithCloseButton>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        fontFamily: "PoppinsBold",
        textAlign: "center",
        marginHorizontal: 20,
        marginTop: 20,
        fontSize: 22,
        color: Colors.green,
    },
});
