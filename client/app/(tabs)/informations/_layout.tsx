import { Stack } from "expo-router";

export default function InformationsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="content" />
            <Stack.Screen name="rules" />
            <Stack.Screen name="bingo" />
            <Stack.Screen name="music" />
            <Stack.Screen name="rate" />
            <Stack.Screen name="copyrights" />
        </Stack>
    );
}
