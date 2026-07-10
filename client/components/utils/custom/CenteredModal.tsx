import React from "react";
import {
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { Colors } from "@/constants/Colors";

interface CenteredModalProps {
    visible: boolean;
    onRequestClose?: () => void;
    children?: React.ReactNode;
    dismissOnBackdropPress?: boolean;
    overlayOpacity?: number;
    containerStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
}

export const CenteredModal: React.FC<CenteredModalProps> = ({
    visible,
    onRequestClose,
    children,
    dismissOnBackdropPress = false,
    overlayOpacity = 0.5,
    containerStyle,
    contentStyle,
}) => {
    const card = <View style={[styles.modalView, contentStyle]}>{children}</View>;

    return (
        <CustomModal visible={visible} onRequestClose={onRequestClose}>
            <View
                style={[
                    styles.modalContainer,
                    { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` },
                    containerStyle,
                ]}
            >
                {dismissOnBackdropPress ? (
                    <TouchableWithoutFeedback onPress={onRequestClose}>
                        <View style={styles.backdropFill}>
                            <TouchableWithoutFeedback>
                                {card}
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                ) : (
                    card
                )}
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backdropFill: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.snow,
        borderRadius: 20,
        alignItems: "center",
    },
});
