import { StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";
import { HALLOWEEN_NOTICE_SLIDE } from "@/components/onboarding/onboardingSlides";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StorageKeys } from "@/constants/storageKeys";

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
            }}
            edges={["top", "bottom"]}
        >
            <OnboardingSlide slide={HALLOWEEN_NOTICE_SLIDE} />

            <Pressable onPress={dismiss} style={styles.button}>
                <ThemedText style={styles.buttonText}>C'est noté !</ThemedText>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        backgroundColor: Colors.black,
        borderRadius: 50,
        paddingHorizontal: 28,
        minHeight: 48,
        justifyContent: "center",
        marginBottom: 20,
    },
    buttonText: {
        textAlign: "center",
        color: Colors.snow,
    },
});
