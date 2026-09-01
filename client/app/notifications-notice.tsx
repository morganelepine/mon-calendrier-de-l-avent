import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";
import { NOTIFICATIONS_NOTICE_SLIDE } from "@/components/onboarding/onboardingSlides";
import { TextButton } from "@/components/utils/buttons/TextButton";
import { CustomButton } from "@/components/utils/buttons/Button";
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
                paddingBottom: 20,
                gap: 8,
            }}
            edges={TOP_BOTTOM_EDGES}
        >
            <OnboardingSlide slide={NOTIFICATIONS_NOTICE_SLIDE} />

            <CustomButton
                onPress={dismiss}
                color={Colors.snow}
                textColor={Colors.red}
            >
                Activer les rappels
            </CustomButton>
            <TextButton
                onPress={dismiss}
                accessibilityLabel="Peut-être plus tard"
                textColor={Colors.snow}
            >
                Peut-être plus tard
            </TextButton>
        </SafeAreaView>
    );
}
