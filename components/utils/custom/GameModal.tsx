import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CloseModalButton } from "@/components/utils/buttons/CloseModalButton";
import { Colors } from "@/constants/Colors";
import { ContentType } from "@/enums/enums";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface GameModalProps {
    isVisible: boolean;
    onClose: () => void;
    contentType: string;
    children?: React.ReactNode;
}

export const GameModal: React.FC<GameModalProps> = ({
    isVisible,
    onClose,
    contentType,
    children,
}) => {
    const insets = useSafeAreaInsets();
    const backgroundImage = getCloudinaryImageUrl("ofcjdqqjsl6qecpcn8xh");

    const getTitle = () => {
        switch (contentType) {
            case ContentType.Game:
                return "Jeu du jour";
            case ContentType.Quiz:
                return "Quiz du jour";
            default:
                return "Jeu du jour";
        }
    };

    return (
        <CustomModal visible={isVisible} onRequestClose={onClose}>
            <ImageBackground
                source={{ uri: backgroundImage }}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ThemedText
                            type="modalTitle"
                            style={[
                                styles.modalTitle,
                                { paddingTop: insets.top },
                            ]}
                        >
                            {getTitle()}
                        </ThemedText>

                        {children}

                        <CloseModalButton
                            onPress={onClose}
                            style={{ backgroundColor: Colors.pink }}
                        >
                            <Ionicons
                                name={"close-outline"}
                                size={35}
                                color={Colors.green}
                            />
                        </CloseModalButton>
                    </View>
                </View>
            </ImageBackground>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        width: "100%",
    },
    modalTitle: { paddingHorizontal: 15 },
});
