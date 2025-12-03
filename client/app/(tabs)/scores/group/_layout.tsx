import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function GroupLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.snow,
                },
                headerTintColor: Colors.blue,
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="addMembers" options={{ headerShown: false }} />
        </Stack>
    );
}
