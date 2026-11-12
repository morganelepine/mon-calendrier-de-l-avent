import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { CenteredModal } from "@/components/utils/custom/CenteredModal";
import { openExternalUrl } from "@/utils/openExternalUrl";
import { useAnnouncement } from "@/hooks/useAnnouncement";

export const AnnouncementModal = () => {
    const { announcement, dismiss } = useAnnouncement();

    if (!announcement) return null;

    return (
        <CenteredModal
            visible={true}
            onRequestClose={dismiss}
            overlayOpacity={0.7}
            contentStyle={styles.modalView}
            dismissOnBackdropPress={true}
        >
            <ThemedText style={styles.title}>{announcement.title}</ThemedText>
            <ThemedText type="sectionText" style={styles.message}>
                {announcement.message}
            </ThemedText>
            <CustomButton
                color={Colors.gold}
                textColor={Colors.blue}
                onPress={() => {
                    openExternalUrl(announcement.url);
                    dismiss();
                }}
            >
                {announcement.buttonLabel}
            </CustomButton>
        </CenteredModal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        maxHeight: "75%",
        minWidth: "90%",
        margin: 30,
        padding: 20,
        gap: 16,
        backgroundColor: Colors.blue,
        borderWidth: 1,
        borderColor: Colors.snow,
    },
    title: {
        fontFamily: "FreightNeoBold",
        textAlign: "center",
        fontSize: 22,
        color: Colors.snow,
        paddingTop: 0,
    },
    message: {
        textAlign: "center",
        color: Colors.snow,
    },
});
