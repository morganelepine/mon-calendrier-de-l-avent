import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function InformationsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blue,
                },
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="storygame"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Le jeu littéraire"
                                backgroundColor={Colors.green}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
