import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ContentType } from "@/enums/enums";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { CloseModalButton } from "@/components/utils/buttons/CloseModalButton";

interface ModalWithTextProps {
    isVisible: boolean;
    onClose: () => void;
    contentType: string;
    backgroundImage: string;
    children?: React.ReactNode;
}

export const ModalWithText: React.FC<ModalWithTextProps> = ({
    isVisible,
    onClose,
    contentType,
    backgroundImage,
    children,
}) => {
    const today = new Date().getDate();

    const getTitle = () => {
        if (contentType === ContentType.Story && today > 24) {
            return "Les souliers rouges";
        }

        switch (contentType) {
            case ContentType.Story:
                return "Histoire du jour";
            case ContentType.Anecdote:
                return "Anecdote du\u00A0jour";
            case ContentType.Idea:
                return "Idée du jour";
            default:
                return "Contenu du jour";
        }
    };

    return (
        <CustomModal visible={isVisible} onRequestClose={onClose}>
            <CloseModalButton
                onPress={onClose}
                style={{ backgroundColor: Colors.snow }}
            >
                <Ionicons
                    name={"close-outline"}
                    size={35}
                    color={Colors.green}
                />
            </CloseModalButton>

            <ParallaxScrollView
                headerBackgroundColor={{
                    light: Colors.snow,
                    dark: Colors.darkBlue,
                }}
                headerImage={
                    <Image
                        source={{ uri: backgroundImage }}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                }
            >
                <View style={styles.modalView}>
                    <ThemedText type="modalTitle">{getTitle()}</ThemedText>

                    {children}
                </View>
            </ParallaxScrollView>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    modalView: {
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
});
