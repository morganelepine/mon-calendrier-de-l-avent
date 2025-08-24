import { Stack } from "expo-router";

export default function ContentsLayout() {
    return (
        <Stack>
            <Stack.Screen name="anecdote" options={{ headerShown: false }} />
            <Stack.Screen name="game" options={{ headerShown: false }} />
            <Stack.Screen name="idea" options={{ headerShown: false }} />
            <Stack.Screen name="story" options={{ headerShown: false }} />
        </Stack>
    );
}
