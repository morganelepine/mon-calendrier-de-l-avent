import { StyleSheet, View } from "react-native";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { horoscope } from "@/data/horoscope_data";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { Colors } from "@/constants/Colors";

interface HoroscopeProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const Horoscope: React.FC<HoroscopeProps> = ({
    modalVisible,
    setModalVisible,
}) => {
    return (
        <ModalWithCloseButton
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
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
                        <ThemedText type="sectionText">{sign.text}</ThemedText>
                    </View>
                ))}
            </CustomScrollView>
        </ModalWithCloseButton>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        fontFamily: "PoppinsBold",
        textAlign: "center",
        margin: 20,
        fontSize: 22,
        color: Colors.blue,
    },
});
