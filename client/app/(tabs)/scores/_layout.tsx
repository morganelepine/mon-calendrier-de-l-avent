import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function InformationsLayout() {
    return (
        <Stack>
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
