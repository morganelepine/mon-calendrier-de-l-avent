import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";
import { ONBOARDING_SLIDES } from "@/components/onboarding/onboardingSlides";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StorageKeys } from "@/constants/storageKeys";

export default function OnboardingScreen() {
    const [index, setIndex] = useState(0);
    const isLast = index === ONBOARDING_SLIDES.length - 1;

    const finish = async () => {
        await AsyncStorage.setItem(StorageKeys.hasLaunched, "true");
        router.replace("/");
    };

    const handleNext = () => {
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
            edges={["top", "bottom"]}
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
                    <TouchableOpacity
                        onPress={finish}
                        accessibilityRole="button"
                        accessibilityLabel="Passer l'introduction"
                    >
                        <ThemedText style={styles.skip}>Passer</ThemedText>
                    </TouchableOpacity>
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

                <Pressable onPress={handleNext} style={styles.nextButton}>
                    <ThemedText
                        style={[
                            styles.nextButtonText,
                            { color: ONBOARDING_SLIDES[index].backgroundColor },
                        ]}
                    >
                        {isLast ? "C'est parti !" : "Suivant"}
                    </ThemedText>
                </Pressable>
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
    skip: {
        color: Colors.snow,
        fontSize: 14,
    },
    footer: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 28,
        paddingBottom: 20,
        gap: 20,
    },
    dots: {
        flexDirection: "row",
        gap: 8,
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
    nextButton: {
        alignSelf: "center",
        backgroundColor: Colors.snow,
        borderRadius: 50,
        paddingHorizontal: 28,
        minHeight: 48,
        justifyContent: "center",
    },
    nextButtonText: {
        textAlign: "center",
    },
});
