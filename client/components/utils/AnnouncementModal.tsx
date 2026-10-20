import { Linking, StyleSheet } from "react-native";
import { Theme } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { ModalWithCloseButton } from "@/components/utils/custom/ModalWithCloseButton";
import { useAnnouncement } from "@/hooks/useAnnouncement";

export const AnnouncementModal = () => {
    const { announcement, dismiss } = useAnnouncement();

    if (!announcement) return null;

    return (
        <ModalWithCloseButton visible onRequestClose={dismiss}>
            <ThemedText style={styles.title}>{announcement.title}</ThemedText>
            <ThemedText type="sectionText" style={styles.message}>
                {announcement.message}
            </ThemedText>
            <CustomButton
                color={Theme.orangeToGreen}
                onPress={() => {
                    Linking.openURL(announcement.url);
                    dismiss();
                }}
            >
                {announcement.buttonLabel}
            </CustomButton>
        </ModalWithCloseButton>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "FreightNeoBold",
        textAlign: "center",
        marginTop: 20,
        fontSize: 22,
        color: Theme.orangeToGreen,
    },
    message: {
        textAlign: "center",
        paddingHorizontal: 20,
    },
});
