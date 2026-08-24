import { useEffect } from "react";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "@/contexts/UserContext";
import { ScoreProvider } from "@/contexts/ScoreContext";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { prefetchContents } from "@/services/content.service";
import { configureNotificationHandler } from "@/services/notifications.service";
import { InitializationGate } from "@/components/navigation/InitializationGate";
import { VersionGate } from "@/components/navigation/VersionGate";
import { ErrorBoundary } from "@/components/utils/ErrorBoundary";
import { initSentry, Sentry } from "@/services/sentry.service";

initSentry();

configureNotificationHandler();

function RootLayout() {
    const colorScheme = useColorScheme();

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

        // Warm the contents cache now so opening the first day
        // doesn't block on the network round-trip.
        prefetchContents();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <ErrorBoundary>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <UserProvider>
                    <InitializationGate>
                        <VersionGate>
                            <ScoreProvider>
                                <Stack>
                                    <Stack.Screen
                                        name="(tabs)"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="onboarding"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="halloween-notice"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="notifications-notice"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            </ScoreProvider>
                        </VersionGate>
                    </InitializationGate>
                </UserProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default Sentry.wrap(RootLayout);
