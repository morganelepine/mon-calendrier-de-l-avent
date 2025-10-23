import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { useUser } from "@/contexts/UserContext";
import { Colors } from "@/constants/Colors";

interface Props {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export default function UsernameModal({
    modalVisible,
    setModalVisible,
}: Readonly<Props>) {
    const { username } = useUser();

    const onClose = async () => {
        setModalVisible(false);
        await AsyncStorage.setItem("hasLaunched", "true");
        await AsyncStorage.setItem("newUsername", "true");
    };

    return (
        <CustomModal visible={modalVisible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={styles.container}>
                                <ThemedText style={styles.title}>
                                    Welcome back!
                                </ThemedText>
                            </View>
                            <ThemedText style={styles.container}>
                                Vous l'aviez mis sur votre liste l'année
                                dernière et la mère Noël est passée ! 🤶🏻
                            </ThemedText>

                            <ThemedText style={styles.container}>
                                Vous avez désormais un pseudo qui vous permettra
                                de comparer votre score avec celui des autres
                                joueur·euses !
                            </ThemedText>
                            <ThemedText style={styles.container}>
                                Le vôtre est :{" "}
                                <ThemedText
                                    style={{
                                        color: Colors.red,
                                        fontFamily: "PoppinsBold",
                                    }}
                                >
                                    {username}
                                </ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.container}>
                                Rendez-vous dans la page "Classement" de
                                l'onglet "Scores".
                            </ThemedText>
                            <ThemedText style={styles.container}>
                                Amusez-vous bien et que le·a plus grand·e fan de
                                Noël gagne...
                            </ThemedText>

                            <CustomButton
                                style={styles.button}
                                onPress={onClose}
                            >
                                C'est parti 🚀
                            </CustomButton>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </CustomModal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        padding: 20,
        backgroundColor: Colors.snow,
        borderRadius: 20,
        elevation: 4,
    },
    container: {
        paddingBottom: 15,
    },
    title: {
        fontSize: 20,
        fontFamily: "PoppinsBold",
        color: Colors.blue,
    },
    button: {
        backgroundColor: Colors.blue,
    },
});
