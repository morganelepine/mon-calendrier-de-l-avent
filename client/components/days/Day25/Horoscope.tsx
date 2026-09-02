import { View } from "react-native";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { horoscope } from "@/data/day-25-gifts/horoscope_data";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";

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
            <ThemedText
                type="modalTitleSmall"
                style={{ paddingHorizontal: 8 }}
            >
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
