import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ScoreProvider } from "@/contexts/ScoreContext";
import { InitializationGate } from "@/components/navigation/InitializationGate";
import { VersionGate } from "@/components/navigation/VersionGate";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
        PoppinsItalic: require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
        Pally: require("../assets/fonts/Pally_Complete/Fonts/OTF/Pally-Regular.otf"),
        PallyBold: require("../assets/fonts/Pally_Complete/Fonts/OTF/Pally-Bold.otf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <InitializationGate>
                <VersionGate>
                    <ScoreProvider>
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </ScoreProvider>
                </VersionGate>
            </InitializationGate>
        </ThemeProvider>
    );
}
