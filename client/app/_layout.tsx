import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        AnonymousPro: require("../assets/fonts/Anonymous/AnonymousPro-Regular.ttf"),
        AnonymousProBold: require("../assets/fonts/Anonymous/AnonymousPro-Bold.ttf"),
        AnonymousProItalic: require("../assets/fonts/Anonymous/AnonymousPro-Italic.ttf"),
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
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </ThemeProvider>
    );
}
