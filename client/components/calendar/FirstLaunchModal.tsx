import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContext";

interface FirstLaunchModalProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const FirstLaunchModal: React.FC<FirstLaunchModalProps> = ({
    modalVisible,
    setModalVisible,
}) => {
    const { username } = useUser();

    const handleStart = async () => {
        setModalVisible(false);
        await AsyncStorage.setItem("hasLaunched", "true");
        await AsyncStorage.setItem("newUsername", "true");
        router.replace({
            pathname: "/",
        });
    };

    return (
        <CustomModal visible={modalVisible} onRequestClose={handleStart}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <ThemedText type="pallyBoldBlue" style={styles.title}>
                        Bienvenue dans votre calendrier de&nbsp;l'avent
                    </ThemedText>

                    <View style={{ gap: 8 }}>
                        <ThemedText type="sectionText">
                            Chaque jour, ouvrez une case et découvrez des
                            contenus qui vous transporteront dans la magie de
                            Noël !
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Votre nom de joueur·euse est :{" "}
                            <ThemedText
                                style={{
                                    color: Colors.red,
                                    fontFamily: "PoppinsBold",
                                }}
                            >
                                {username}
                            </ThemedText>
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Il vous permettra de comparer votre score avec celui
                            des autres participant·es.
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Plus vous participez, plus vous gagnez de points !
                            Les règles détaillées se trouvent dans l'onglet
                            "Infos".
                        </ThemedText>
                        <ThemedText type="sectionText">
                            J’ai mis tout mon amour de Noël dans ce calendrier
                            et j’espère qu’il vous apportera un peu de magie
                            chaque jour ✨
                        </ThemedText>
                    </View>

                    <CustomButton onPress={handleStart} style={styles.button}>
                        Commencer l'aventure 🚀
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
    },
});
