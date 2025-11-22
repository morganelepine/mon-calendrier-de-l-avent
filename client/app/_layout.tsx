import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "@/contexts/UserContext";
import { ScoreProvider } from "@/contexts/ScoreContext";
import { useVersionCheck } from "@/hooks/useVersionCheck";
import ForceUpdateScreen from "@/components/utils/ForceUpdateScreen";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const requiresUpdate = useVersionCheck();

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

    if (requiresUpdate) {
        return <ForceUpdateScreen />;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <UserProvider>
                <ScoreProvider>
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </ScoreProvider>
            </UserProvider>
        </ThemeProvider>
    );
}
