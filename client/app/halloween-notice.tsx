import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";
import { HALLOWEEN_NOTICE_SLIDE } from "@/components/onboarding/onboardingSlides";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { StorageKeys } from "@/constants/storageKeys";
import { TOP_BOTTOM_EDGES } from "@/constants/safeAreaEdges";

export default function HalloweenNoticeScreen() {
    const dismiss = async () => {
        await AsyncStorage.setItem(StorageKeys.halloweenNoticeSeen, "true");
        router.replace("/");
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: HALLOWEEN_NOTICE_SLIDE.backgroundColor,
                paddingBottom: 20,
            }}
            edges={TOP_BOTTOM_EDGES}
        >
            <OnboardingSlide slide={HALLOWEEN_NOTICE_SLIDE} />

            <CustomButton
                onPress={dismiss}
                color={Colors.snow}
                textColor={Colors.autumnGold}
            >
                C'est noté !
            </CustomButton>
        </SafeAreaView>
    );
}
