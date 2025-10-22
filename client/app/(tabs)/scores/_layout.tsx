import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function ScoresLayout() {
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
            <Stack.Screen
                name="leaderboard"
                options={{
                    title: "Classement",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.blue,
                    },
                }}
            />
        </Stack>
    );
}
