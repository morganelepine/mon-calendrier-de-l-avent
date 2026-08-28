import { StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";
import { NOTIFICATIONS_NOTICE_SLIDE } from "@/components/onboarding/onboardingSlides";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StorageKeys } from "@/constants/storageKeys";
import { TOP_BOTTOM_EDGES } from "@/constants/safeAreaEdges";
import { useUser } from "@/contexts/UserContext";
import { requestAndRegisterPushToken } from "@/services/notifications.service";

export default function NotificationsNoticeScreen() {
    const { userUuid } = useUser();

    const dismiss = async () => {
        await AsyncStorage.setItem(StorageKeys.notificationsNoticeSeen, "true");
        if (userUuid) {
            await requestAndRegisterPushToken(userUuid);
        }
        router.replace("/");
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: NOTIFICATIONS_NOTICE_SLIDE.backgroundColor,
            }}
            edges={TOP_BOTTOM_EDGES}
        >
            <OnboardingSlide slide={NOTIFICATIONS_NOTICE_SLIDE} />

            <Pressable onPress={dismiss} style={styles.button}>
                <ThemedText style={styles.buttonText}>
                    Activer les rappels
                </ThemedText>
            </Pressable>
            <TouchableOpacity
                onPress={dismiss}
                accessibilityRole="button"
                accessibilityLabel="Peut-être plus tard"
            >
                <ThemedText type="italic14" style={styles.skip}>
                    Peut-être plus tard
                </ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        backgroundColor: Colors.snow,
        borderRadius: 50,
        paddingHorizontal: 28,
        minHeight: 48,
        justifyContent: "center",
        marginBottom: 12,
    },
    buttonText: {
        textAlign: "center",
        color: Colors.red,
    },
    skip: {
        textAlign: "center",
        color: Colors.snow,
        marginBottom: 20,
        textDecorationLine: "underline",
    },
});
