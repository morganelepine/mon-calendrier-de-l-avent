import { StyleSheet, View, Pressable } from "react-native";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { horoscope } from "@/data/horoscope_data";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface HoroscopeProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const Horoscope: React.FC<HoroscopeProps> = ({
    modalVisible,
    setModalVisible,
}) => {
    return (
        <CustomModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <ThemedText style={styles.modalTitle}>
                        Votre horoscope de Noël
                    </ThemedText>

                    <CustomScrollView>
                        {horoscope.map((sign) => (
                            <View key={sign.id}>
                                <ThemedText
                                    type="sectionSubtitle"
                                    style={{ marginTop: 20 }}
                                >
                                    {sign.sign}
                                </ThemedText>
                                <ThemedText type="sectionText">
                                    {sign.text}
                                </ThemedText>
                            </View>
                        ))}
                    </CustomScrollView>

                    <Pressable
                        onPress={() => {
                            setModalVisible(false);
                        }}
                        style={styles.closeButton}
                    >
                        <Ionicons
                            name={"close-outline"}
                            size={35}
                            color={Colors.blue}
                        />
                    </Pressable>
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalView: {
        height: "75%",
        marginHorizontal: 20,
        alignItems: "center",
        backgroundColor: Colors.snow,
        borderRadius: 20,
        elevation: 4,
    },
    modalTitle: {
        fontFamily: "PoppinsBold",
        textAlign: "center",
        margin: 20,
        fontSize: 22,
        color: Colors.blue,
    },
    closeButton: {
        marginTop: 10,
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
