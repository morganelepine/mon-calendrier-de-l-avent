import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { UserProvider } from "@/contexts/UserContext";
import { ScoreProvider } from "@/contexts/ScoreContext";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { prefetchContents } from "@/services/content.service";
import { getGame2048IconUrl } from "@/constants/game2048Icons";
import { MAX_TIER } from "@/utils/games2048/engine";
import { configureNotificationHandler } from "@/services/notifications.service";
import { AccessGate } from "@/components/navigation/AccessGate";
import { InitializationGate } from "@/components/navigation/InitializationGate";
import { ToastHost } from "@/components/utils/Toast";
import { VersionGate } from "@/components/navigation/VersionGate";
import { ErrorBoundary } from "@/components/utils/ErrorBoundary";
import { initSentry, Sentry } from "@/services/sentry.service";

initSentry();

configureNotificationHandler();

function RootLayout() {
    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
        PoppinsItalic: require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
        Pally: require("../assets/fonts/Pally_Complete/Fonts/OTF/Pally-Regular.otf"),
        PallyBold: require("../assets/fonts/Pally_Complete/Fonts/OTF/Pally-Bold.otf"),
    });

    useEffect(() => {
        [
            "blue_background_darker_d10kn5",
            "s-instruire_xybqas", // s'inspirer
            "se-regaler_mnonwh", // se divertir
            "kiwi1_r7kihz", // s'instruire
            "christmas_a5bsoi", // s'amuser
        ].forEach((id) =>
            Image.prefetch(getCloudinaryImageUrl(id), "memory-disk"),
        );

        // The 11 game-2048 tile icons - warmed up front so no icon has to
        // hit the network mid-game the first time a tier appears.
        for (let tier = 1; tier <= MAX_TIER; tier++) {
            Image.prefetch(getGame2048IconUrl(tier), "memory-disk");
        }

        // Warm the contents cache now so opening the first day
        // doesn't block on the network round-trip.
        prefetchContents();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <ToastHost />
                <ErrorBoundary>
                    <UserProvider>
                        <AccessGate>
                            <InitializationGate>
                                <VersionGate>
                                    <ScoreProvider>
                                        <Stack>
                                            <Stack.Screen
                                                name="(tabs)"
                                                options={{
                                                    headerShown: false,
                                                }}
                                            />
                                            <Stack.Screen
                                                name="onboarding"
                                                options={{
                                                    headerShown: false,
                                                }}
                                            />
                                            <Stack.Screen
                                                name="halloween-notice"
                                                options={{
                                                    headerShown: false,
                                                }}
                                            />
                                            <Stack.Screen
                                                name="notifications-notice"
                                                options={{
                                                    headerShown: false,
                                                }}
                                            />
                                            <Stack.Screen name="+not-found" />
                                        </Stack>
                                    </ScoreProvider>
                                </VersionGate>
                            </InitializationGate>
                        </AccessGate>
                    </UserProvider>
                </ErrorBoundary>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

export default Sentry.wrap(RootLayout);
