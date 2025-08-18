import React from "react";
import { Modal } from "react-native";

interface CustomModalProps {
    visible: boolean;
    onRequestClose?: () => void;
    children?: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    onRequestClose,
    children,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
            statusBarTranslucent={true}
        >
            {children}
        </Modal>
    );
};
