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
        </Stack>
    );
}
