import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";
import {
    NOTIFICATIONS_NOTICE_SLIDE,
    ONBOARDING_SLIDES,
} from "@/components/onboarding/onboardingSlides";
import { TextButton } from "@/components/utils/buttons/TextButton";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { StorageKeys } from "@/constants/storageKeys";
import { TOP_BOTTOM_EDGES } from "@/constants/safeAreaEdges";
import { useUser } from "@/contexts/UserContext";
import { requestAndRegisterPushToken } from "@/services/notifications.service";

export default function OnboardingScreen() {
    const [index, setIndex] = useState(0);
    const { userUuid } = useUser();
    const isLast = index === ONBOARDING_SLIDES.length - 1;
    const isNotificationsSlide =
        ONBOARDING_SLIDES[index] === NOTIFICATIONS_NOTICE_SLIDE;
    const nextButtonLabel = isNotificationsSlide
        ? "Activer les rappels"
        : isLast
          ? "C'est parti !"
          : "Suivant";

    const finish = async () => {
        const toSet: [string, string][] = [
            [StorageKeys.hasLaunched, "true"],
            [StorageKeys.notificationsNoticeSeen, "true"],
        ];
        if (isOctober) {
            toSet.push([StorageKeys.halloweenNoticeSeen, "true"]);
        }
        await AsyncStorage.multiSet(toSet);
        if (userUuid) {
            // Fire-and-forget: never delay leaving onboarding on this.
            requestAndRegisterPushToken(userUuid);
        }
        router.replace("/");
    };

    const handleNext = () => {
        if (isNotificationsSlide && userUuid) {
            requestAndRegisterPushToken(userUuid);
        }
        if (isLast) {
            finish();
            return;
        }
        setIndex((current) => current + 1);
    };

    const handleBack = () => {
        setIndex((current) => Math.max(0, current - 1));
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: ONBOARDING_SLIDES[index].backgroundColor,
            }}
            edges={TOP_BOTTOM_EDGES}
        >
            <View style={styles.topBar}>
                {index > 0 ? (
                    <TouchableOpacity
                        onPress={handleBack}
                        accessibilityRole="button"
                        accessibilityLabel="Étape précédente"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color={Colors.snow}
                        />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}

                {!isLast && (
                    <TextButton
                        onPress={finish}
                        accessibilityLabel="Passer l'introduction"
                        textColor={Colors.snow}
                    >
                        Passer
                    </TextButton>
                )}
            </View>

            <OnboardingSlide slide={ONBOARDING_SLIDES[index]} />

            <View style={styles.footer}>
                <View style={styles.dots}>
                    {ONBOARDING_SLIDES.map((slide, i) => (
                        <View
                            key={slide.imageId}
                            style={[
                                styles.dot,
                                i === index && styles.dotActive,
                            ]}
                        />
                    ))}
                </View>

                <CustomButton
                    onPress={handleNext}
                    color={Colors.snow}
                    textColor={ONBOARDING_SLIDES[index].backgroundColor}
                >
                    {nextButtonLabel}
                </CustomButton>
                {isNotificationsSlide && (
                    <TextButton
                        onPress={finish}
                        accessibilityLabel="Peut-être plus tard"
                        textColor={Colors.snow}
                    >
                        Peut-être plus tard
                    </TextButton>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    footer: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 28,
        paddingBottom: 20,
        gap: 8,
    },
    dots: {
        flexDirection: "row",
        gap: 8,
        paddingBottom: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: `${Colors.snow}55`,
    },
    dotActive: {
        backgroundColor: Colors.snow,
        width: 20,
    },
});
