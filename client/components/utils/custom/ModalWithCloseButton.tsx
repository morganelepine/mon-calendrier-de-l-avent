import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { Ionicons } from "@expo/vector-icons";

interface CustomModalProps {
    visible: boolean;
    onRequestClose?: () => void;
    children?: React.ReactNode;
}

export const ModalWithCloseButton: React.FC<CustomModalProps> = ({
    visible,
    onRequestClose,
    children,
}) => {
    return (
        <CustomModal visible={visible} onRequestClose={onRequestClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    {children}
                    <Pressable
                        onPress={onRequestClose}
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
        maxHeight: "75%",
        margin: 30,
        alignItems: "center",
        backgroundColor: Colors.snow,
        borderRadius: 20,
        gap: 16,
    },
    closeButton: {
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
