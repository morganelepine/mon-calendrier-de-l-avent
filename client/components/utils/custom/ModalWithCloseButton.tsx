import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
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
        <CenteredModal
            visible={visible}
            onRequestClose={onRequestClose}
            overlayOpacity={0.7}
            contentStyle={styles.modalView}
        >
            {children}
            <Pressable onPress={onRequestClose} style={styles.closeButton}>
                <Ionicons
                    name={"close-outline"}
                    size={35}
                    color={Colors.blue}
                />
            </Pressable>
        </CenteredModal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        maxHeight: "75%",
        minWidth: "90%",
        margin: 30,
        gap: 16,
    },
    closeButton: {
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
