import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";

interface Props {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const NewsModal: React.FC<Props> = ({
    modalVisible,
    setModalVisible,
}) => {
    const handleStart = async () => {
        setModalVisible(false);
        await AsyncStorage.setItem("isNew", "news-groups");
        router.replace({
            pathname: "/scores",
        });
    };

    return (
        <CustomModal visible={modalVisible} onRequestClose={handleStart}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <ThemedText type="pallyBoldBlue" style={styles.title}>
                        C'est nouveau !
                    </ThemedText>

                    <View style={{ gap: 8 }}>
                        <ThemedText type="sectionText">
                            Vous pouvez maintenant créer votre propre classement
                            pour suivre les scores de vos proches !
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Rendez-vous dans l'onglet "Scores" puis cliquez sur
                            "Mon groupe".
                        </ThemedText>
                    </View>

                    <CustomButton onPress={handleStart} style={styles.button}>
                        J'y vais !
                    </CustomButton>
                </View>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        paddingHorizontal: 8,
        backgroundColor: Colors.snow,
        borderRadius: 20,
        elevation: 4,
    },
    title: {
        margin: 20,
        fontSize: 24,
        textAlign: "center",
    },
    button: {
        margin: 20,
        backgroundColor: Colors.blue,
        alignSelf: "center",
    },
});
